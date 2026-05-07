// Blacksburg Church — Messages Page
// ─────────────────────────────────────────────────────────────────────────────
// PRODUCTION WIRING (when this goes live):
//   • Each sermon lives as a YouTube video on the church's channel.
//   • Title format on YouTube: "Series Name | Sermon Title | Scripture Ref"
//     (e.g. "Table | The Weight of Welcome | Luke 14:12–24")
//   • The website reads the channel's uploads RSS feed once per hour and
//     parses each title into { series, title, scripture }.
//   • Topic tags live in /data/sermons.json — keyed by videoId — and are the
//     only thing staff edit by hand. One line per sermon. ~30 seconds.
//   • Transcripts come from YouTube's captions API (auto-generated, editable
//     on YouTube Studio if the team wants cleanup).
//   • Publishing = uploading to YouTube. That's it.
// ─────────────────────────────────────────────────────────────────────────────

const SERIES_DATA = [
  { slug: 'good-news',       name: 'Good News',       desc: 'A walk through Galatians — on grace, freedom, and the gospel Paul refused to water down.',  count: 2, current: true,  start: 'April 2026' },
  { slug: 'table',           name: 'Table',           desc: 'On eating, welcome, and the Jesus who showed up to dinner.',                                 count: 4, current: false, start: 'March 2026' },
  { slug: 'following-jesus', name: 'Following Jesus', desc: 'A walk through Mark 1–4 — who Jesus is, and what it means to say yes.',                      count: 8, current: false, start: 'Jan 2026' },
  { slug: 'one-church',      name: 'One Church',      desc: 'Why we do this together — on the shape of Christian community.',                             count: 3, current: false, start: 'Dec 2025' },
  { slug: 'advent',          name: 'The Long Wait',   desc: 'Four weeks of Advent — on longing, darkness, and light that keeps coming.',                  count: 4, current: false, start: 'Nov 2025' },
];

const MESSAGES = [
  { id: 1, videoId: 'DRxUIpj6Kh4', thumb: 'assets/latest-sermon-thumb.jpg', title: 'Are You Missing the Point?', speaker: 'Daniel Kim',  date: 'April 19, 2026', series: 'Good News',       book: 'Galatians', passage: 'Galatians 2:1–21', length: '38:42', topics: ['grace', 'gospel', 'freedom'] },
  { id: 2, videoId: 'DRxUIpj6Kh4', title: 'No Other Gospel',             speaker: 'Daniel Kim',  date: 'April 12, 2026', series: 'Good News',       book: 'Galatians', passage: 'Galatians 1:1–24', length: '35:18', topics: ['grace', 'gospel'] },
  { id: 3, videoId: 'dQw4w9WgXcQ', title: 'The Weight of Welcome',       speaker: 'Daniel Kim',  date: 'April 5, 2026',  series: 'Table',           book: 'Luke',      passage: 'Luke 14:12–24',    length: '32:14', topics: ['welcome', 'hospitality', 'outsider'] },
  { id: 4, videoId: 'dQw4w9WgXcQ', title: 'Why We Eat Together',         speaker: 'Daniel Kim',  date: 'March 29, 2026', series: 'Table',           book: 'Acts',      passage: 'Acts 2:42–47',     length: '28:02', topics: ['community', 'hospitality'] },
  { id: 5, videoId: 'dQw4w9WgXcQ', title: 'Bread, Broken, For Us',       speaker: 'Daniel Kim',  date: 'March 22, 2026', series: 'Table',           book: 'Luke',      passage: 'Luke 22:14–23',    length: '34:48', topics: ['communion', 'sacrifice'] },
  { id: 6, videoId: 'dQw4w9WgXcQ', title: 'Table for Everyone',          speaker: 'Marcus Webb', date: 'March 15, 2026', series: 'Table',           book: 'Matthew',   passage: 'Matthew 9:9–13',   length: '30:21', topics: ['welcome', 'grace', 'outsider'] },
  { id: 7, videoId: 'dQw4w9WgXcQ', title: 'Small Is Not a Problem',      speaker: 'Marcus Webb', date: 'March 8, 2026',  series: 'One Church',      book: 'Acts',      passage: 'Acts 2:46–47',     length: '36:09', topics: ['community', 'house-churches'] },
  { id: 8, videoId: 'dQw4w9WgXcQ', title: 'What Following Looks Like',   speaker: 'Daniel Kim',  date: 'March 1, 2026',  series: 'Following Jesus', book: 'Mark',      passage: 'Mark 1:16–20',     length: '29:55', topics: ['discipleship', 'calling'] },
  { id: 9, videoId: 'dQw4w9WgXcQ', title: 'The Call by the Water',       speaker: 'Daniel Kim',  date: 'Feb 22, 2026',   series: 'Following Jesus', book: 'Mark',      passage: 'Mark 1:9–15',      length: '31:42', topics: ['calling', 'baptism'] },
  { id: 10, videoId: 'dQw4w9WgXcQ', title: 'Who Do You Say I Am?',       speaker: 'Daniel Kim',  date: 'Feb 15, 2026',   series: 'Following Jesus', book: 'Mark',      passage: 'Mark 8:27–38',     length: '33:17', topics: ['identity', 'discipleship'] },
  { id: 11, videoId: 'dQw4w9WgXcQ', title: 'The Storm and the Sleeper',  speaker: 'Daniel Kim',  date: 'Feb 8, 2026',    series: 'Following Jesus', book: 'Mark',      passage: 'Mark 4:35–41',     length: '27:48', topics: ['fear', 'faith', 'doubt'] },
  { id: 12, videoId: 'dQw4w9WgXcQ', title: 'Room at the Table',          speaker: 'Sarah Ellis', date: 'Feb 1, 2026',    series: 'One Church',      book: 'Romans',    passage: 'Romans 12:9–18',   length: '31:05', topics: ['community', 'house-churches'] },
  { id: 13, videoId: 'dQw4w9WgXcQ', title: 'Light That Keeps Coming',    speaker: 'Daniel Kim',  date: 'Dec 21, 2025',   series: 'The Long Wait',   book: 'John',      passage: 'John 1:1–14',      length: '33:44', topics: ['advent', 'hope'] },
];

const ALL_BOOKS  = Array.from(new Set(MESSAGES.map(m => m.book))).sort();
const ALL_TOPICS = Array.from(new Set(MESSAGES.flatMap(m => m.topics))).sort();

// ── icons ─────────────────────────────────────────────────
function PlayIcon({ size = 14, color = '#fff' }) { return <svg width={size} height={size * 1.15} viewBox="0 0 14 16" fill={color}><path d="M1 1l12 7-12 7V1z"/></svg>; }
function HeadphonesIcon({ size = 14, color = 'currentColor' }) {
  return <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 11V9a6 6 0 0112 0v2"/><path d="M2 11v2a1 1 0 001 1h1a1 1 0 001-1v-2a1 1 0 00-1-1H2zM14 11v2a1 1 0 01-1 1h-1a1 1 0 01-1-1v-2a1 1 0 011-1h2z"/></svg>;
}
function VideoIcon({ size = 14, color = 'currentColor' }) {
  return <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="10" height="10" rx="1"/><path d="M11 6l4-2v8l-4-2z"/></svg>;
}
function FileTextIcon({ size = 14, color = 'currentColor' }) {
  return <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 1H3a1 1 0 00-1 1v12a1 1 0 001 1h10a1 1 0 001-1V6z"/><path d="M9 1v5h5M5 9h6M5 12h4"/></svg>;
}
function ChevronRight({ size = 14, color = 'currentColor' }) {
  return <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3l5 5-5 5"/></svg>;
}
function XIcon({ size = 14, color = 'currentColor' }) {
  return <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round"><path d="M3 3l10 10M13 3L3 13"/></svg>;
}

// ── Player (video OR audio mode) ─────────────────────────
function SermonPlayer({ sermon, mode, setMode }) {
  // In production, videoId would come from YouTube. We use a placeholder here.
  const ytUrl = `https://www.youtube.com/embed/${sermon.videoId}?rel=0&modestbranding=1`;

  return (
    <div style={{ position: 'relative' }}>
      {/* Mode toggle */}
      <div style={{ display: 'flex', gap: 0, marginBottom: 16, border: `1px solid ${BC.border}`, borderRadius: 4, overflow: 'hidden', width: 'fit-content', background: BC.white }}>
        {[
          ['video', 'Watch', <VideoIcon size={13} />],
          ['audio', 'Listen', <HeadphonesIcon size={13} />],
        ].map(([m, label, icon]) => (
          <button key={m} onClick={() => setMode(m)} style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '10px 18px', border: 'none', cursor: 'pointer',
            background: mode === m ? BC.navy : 'transparent',
            color: mode === m ? BC.cream : BC.navy,
            fontFamily: fontDisplay, fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase',
            transition: 'background 150ms, color 150ms',
          }}>
            {icon}{label}
          </button>
        ))}
      </div>

      {mode === 'video' ? (
        <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', background: BC.navyDark, borderRadius: 4, overflow: 'hidden' }}>
          {sermon.thumb ? (
            <img src={sermon.thumb} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <img src={TOPO.navyOrange} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.35 }} />
          )}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(15,34,51,0.15) 0%, rgba(15,34,51,0.55) 100%)' }} />
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 18, color: BC.cream, zIndex: 2 }}>
            <div style={{
              width: 78, height: 78, borderRadius: '50%', background: BC.orange,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 8px 32px rgba(245,130,32,0.45)', cursor: 'pointer',
            }}>
              <PlayIcon size={26} />
            </div>
            <div style={{ fontFamily: fontDisplay, fontSize: 10, fontWeight: 600, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(249,237,214,0.6)' }}>
              YouTube · {sermon.length}
            </div>
          </div>
          {/* Real embed (commented — uncomment when videoIds are real):
          <iframe src={ytUrl} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }} allow="autoplay; encrypted-media" allowFullScreen /> */}
        </div>
      ) : (
        <AudioBar sermon={sermon} />
      )}
    </div>
  );
}

function AudioBar({ sermon }) {
  const [playing, setPlaying] = React.useState(false);
  const [progress, setProgress] = React.useState(0.12);
  React.useEffect(() => {
    if (!playing) return;
    const iv = setInterval(() => setProgress(p => Math.min(1, p + 0.003)), 200);
    return () => clearInterval(iv);
  }, [playing]);

  const fmtTime = (frac) => {
    const [mm, ss] = sermon.length.split(':').map(Number);
    const total = mm * 60 + ss;
    const at = Math.floor(total * frac);
    return `${String(Math.floor(at / 60)).padStart(2, '0')}:${String(at % 60).padStart(2, '0')}`;
  };

  return (
    <div style={{ background: BC.navyDark, borderRadius: 4, padding: 28, position: 'relative', overflow: 'hidden' }}>
      <img src={TOPO.navyOrange} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.25 }} />
      <div style={{ position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', gap: 24 }}>
        <button onClick={() => setPlaying(p => !p)} style={{
          flexShrink: 0, width: 56, height: 56, borderRadius: '50%', background: BC.orange, border: 'none',
          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          boxShadow: '0 4px 16px rgba(245,130,32,0.4)',
        }}>
          {playing ? (
            <svg width="16" height="16" viewBox="0 0 14 14" fill="#fff"><rect x="2" y="1" width="3" height="12"/><rect x="9" y="1" width="3" height="12"/></svg>
          ) : <PlayIcon size={16} />}
        </button>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: fontDisplay, fontSize: 10, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: BC.orange, marginBottom: 6 }}>
            ● {playing ? 'Now Playing' : 'Ready'} — Audio
          </div>
          <div
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              setProgress((e.clientX - rect.left) / rect.width);
            }}
            style={{ height: 4, background: 'rgba(249,237,214,0.15)', borderRadius: 2, cursor: 'pointer', position: 'relative', marginBottom: 8 }}
          >
            <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: `${progress * 100}%`, background: BC.orange, borderRadius: 2 }} />
            <div style={{ position: 'absolute', left: `${progress * 100}%`, top: '50%', transform: 'translate(-50%, -50%)', width: 12, height: 12, borderRadius: '50%', background: BC.orange }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: fontDisplay, fontSize: 11, color: 'rgba(249,237,214,0.6)', letterSpacing: '0.08em' }}>
            <span>{fmtTime(progress)}</span><span>{sermon.length}</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
          <button title="Apple Podcasts" style={audioIconBtn}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" strokeWidth="1.5"/><circle cx="8" cy="7" r="2"/><path d="M6 11c.5-1 1.2-1.5 2-1.5s1.5.5 2 1.5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/></svg>
          </button>
          <button title="Spotify" style={audioIconBtn}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="8" cy="8" r="7"/><path d="M4 6.5c2.5-1 5.5-1 8 .5M4.5 9c2-.7 4.5-.7 6.5.5M5 11.5c1.5-.5 3.5-.5 5 .3"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
}

const audioIconBtn = {
  width: 40, height: 40, borderRadius: 4,
  background: 'rgba(249,237,214,0.08)', border: '1px solid rgba(249,237,214,0.15)',
  color: BC.cream, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
};

// ── Sermon detail view (opened when a sermon is clicked) ─
function SermonDetail({ sermon, onBack }) {
  const [mode, setMode] = React.useState('video');
  const [showTranscript, setShowTranscript] = React.useState(false);

  const seriesInfo = SERIES_DATA.find(s => s.name === sermon.series);
  const related = MESSAGES.filter(m => m.series === sermon.series && m.id !== sermon.id).slice(0, 3);

  return (
    <>
      <section style={{ background: BC.navy, padding: '56px 48px 48px', position: 'relative', overflow: 'hidden' }}>
        <img src={TOPO.navyOrange} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.3 }} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 1100, margin: '0 auto' }}>
          <button onClick={onBack} style={{
            background: 'transparent', border: 'none', color: 'rgba(249,237,214,0.7)', cursor: 'pointer',
            fontFamily: fontDisplay, fontSize: 11, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase',
            display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 24, padding: 0,
          }}>
            <span style={{ transform: 'rotate(180deg)', display: 'inline-flex' }}><ChevronRight size={11} color="currentColor" /></span>
            All Messages
          </button>
          <div style={{ fontFamily: fontDisplay, fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: BC.orange, marginBottom: 14 }}>
            Series · {sermon.series}
          </div>
          <h1 style={{ fontFamily: fontDisplay, fontSize: 'clamp(36px, 5vw, 60px)', fontWeight: 800, color: BC.cream, letterSpacing: '-0.025em', lineHeight: 1.05, marginBottom: 18, maxWidth: 900 }}>
            {sermon.title}
          </h1>
          <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap', fontFamily: fontBody, fontSize: 14, color: 'rgba(249,237,214,0.75)', fontWeight: 300 }}>
            <span>{sermon.speaker}</span>
            <span>{sermon.date}</span>
            <span style={{ color: BC.orange, fontStyle: 'italic' }}>{sermon.passage}</span>
            <span>{sermon.length}</span>
          </div>
        </div>
      </section>

      <section style={{ background: BC.creamSubtle, padding: '48px 48px 64px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <SermonPlayer sermon={sermon} mode={mode} setMode={setMode} />

          {/* Topic chips */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 28 }}>
            {sermon.topics.map(t => (
              <span key={t} style={{
                fontFamily: fontDisplay, fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase',
                padding: '6px 12px', background: BC.white, border: `1px solid ${BC.border}`, borderRadius: 4, color: BC.navy,
              }}>{t.replace(/-/g, ' ')}</span>
            ))}
          </div>

          {/* Transcript accordion */}
          <div style={{ marginTop: 32, background: BC.white, border: `1px solid ${BC.border}`, borderRadius: 4, overflow: 'hidden' }}>
            <button onClick={() => setShowTranscript(v => !v)} style={{
              width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '20px 24px', background: 'transparent', border: 'none', cursor: 'pointer',
              fontFamily: fontDisplay, fontSize: 13, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: BC.navy,
            }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
                <FileTextIcon size={15} color={BC.orange} /> Transcript
              </span>
              <span style={{ transform: showTranscript ? 'rotate(90deg)' : 'rotate(0)', transition: 'transform 200ms', display: 'inline-flex' }}>
                <ChevronRight size={14} color={BC.navy} />
              </span>
            </button>
            {showTranscript && (
              <div style={{
                padding: '0 24px 24px', fontFamily: fontBody, fontSize: 15, color: BC.navy, lineHeight: 1.75, fontWeight: 300,
                borderTop: `1px solid ${BC.border}`, paddingTop: 20,
              }}>
                <p style={{ marginBottom: 16 }}>
                  <strong style={{ fontWeight: 600, color: BC.orange, fontFamily: fontDisplay, fontSize: 11, letterSpacing: '0.1em' }}>00:14</strong>
                  &nbsp;&nbsp;Good morning. Grab a seat, get comfortable. Today we're going to sit with a passage that has bothered me for a long time, if I'm honest with you. Luke fourteen. Jesus is at a dinner party, and he does what Jesus tends to do — he rearranges the whole guest list.
                </p>
                <p style={{ marginBottom: 16 }}>
                  <strong style={{ fontWeight: 600, color: BC.orange, fontFamily: fontDisplay, fontSize: 11, letterSpacing: '0.1em' }}>01:42</strong>
                  &nbsp;&nbsp;Here's the thing about welcome. We think of it as soft. Hospitable, in the greeting-card sense. But in the ancient world, who you ate with was who you were. The table was a political statement before it was ever a spiritual one.
                </p>
                <p style={{ marginBottom: 16, color: BC.navyMuted, fontStyle: 'italic' }}>
                  [Transcript continues — auto-generated by YouTube, lightly edited. Full version in the download below.]
                </p>
                <div style={{ marginTop: 20, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  <Button size="sm" variant="outline">Download PDF</Button>
                  <Button size="sm" variant="ghost">Copy link to passage</Button>
                </div>
              </div>
            )}
          </div>

          {/* Series context */}
          {seriesInfo && (
            <div style={{ marginTop: 48, padding: 28, background: BC.white, border: `1px solid ${BC.border}`, borderRadius: 4 }}>
              <div style={{ fontFamily: fontDisplay, fontSize: 10, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: BC.orange, marginBottom: 8 }}>
                Part of · {seriesInfo.name}
              </div>
              <p style={{ fontFamily: fontBody, fontSize: 16, color: BC.navyMuted, fontWeight: 300, lineHeight: 1.6, marginBottom: 20 }}>
                {seriesInfo.desc}
              </p>
              {related.length > 0 && (
                <div style={{ display: 'grid', gap: 1, background: BC.border, border: `1px solid ${BC.border}`, borderRadius: 4, overflow: 'hidden' }}>
                  {related.map(r => (
                    <div key={r.id} onClick={onBack /* in real app: navigate to this sermon */} style={{
                      display: 'grid', gridTemplateColumns: '1fr auto', gap: 16, padding: '16px 20px',
                      background: BC.white, cursor: 'pointer', alignItems: 'center',
                    }}>
                      <div>
                        <div style={{ fontFamily: fontDisplay, fontSize: 15, fontWeight: 600, color: BC.navy, marginBottom: 2 }}>{r.title}</div>
                        <div style={{ fontFamily: fontBody, fontSize: 12, color: BC.navyMuted, fontWeight: 300 }}>{r.passage} · {r.date}</div>
                      </div>
                      <div style={{ fontFamily: fontDisplay, fontSize: 11, color: BC.navyMuted, letterSpacing: '0.08em' }}>{r.length}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

// ── List view ─────────────────────────────────────────────
function MessagesPage({ onNav }) {
  const [openSermon, setOpenSermon] = React.useState(null);
  const [bookFilter, setBookFilter] = React.useState('All');
  const [topicFilter, setTopicFilter] = React.useState('All');
  const [seriesFilter, setSeriesFilter] = React.useState('All');

  if (openSermon) {
    return <SermonDetail sermon={openSermon} onBack={() => setOpenSermon(null)} />;
  }

  const filtered = MESSAGES.filter(m =>
    (bookFilter === 'All'   || m.book === bookFilter) &&
    (topicFilter === 'All'  || m.topics.includes(topicFilter)) &&
    (seriesFilter === 'All' || m.series === seriesFilter)
  );

  const latest = MESSAGES[0];
  const currentSeries = SERIES_DATA.find(s => s.current);
  const pastSeries = SERIES_DATA.filter(s => !s.current);
  const anyFilter = bookFilter !== 'All' || topicFilter !== 'All' || seriesFilter !== 'All';

  return (
    <>
      {/* HERO */}
      <div style={{ background: BC.navy, padding: '100px 48px 88px', position: 'relative', overflow: 'hidden' }}>
        <img src={TOPO.navyOrange} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.35 }} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 1200, margin: '0 auto' }}>
          <Eyebrow>Messages</Eyebrow>
          <h1 style={{ fontFamily: fontDisplay, fontSize: 'clamp(52px, 8vw, 108px)', fontWeight: 800, color: BC.cream, letterSpacing: '-0.03em', lineHeight: 0.98, maxWidth: 900, marginBottom: 24 }}>
            Listen in.<br/><span style={{ color: BC.orange, fontStyle: 'italic', fontWeight: 400 }}>Go deeper.</span>
          </h1>
          <p style={{ fontFamily: fontBody, fontSize: 20, color: 'rgba(249,237,214,0.8)', lineHeight: 1.6, maxWidth: 620, fontWeight: 300 }}>
            Teaching from our Sunday gatherings. Watch, listen, or read — whatever fits your week.
          </p>
        </div>
      </div>

      {/* LATEST — hero sermon card */}
      <section style={{ background: BC.creamSubtle, padding: '64px 48px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 24 }}>
            <Eyebrow>Latest Message</Eyebrow>
            <div style={{ fontFamily: fontDisplay, fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: BC.navyMuted }}>
              {latest.date}
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 40, alignItems: 'stretch' }}>
            {/* Video thumbnail */}
            <div onClick={() => setOpenSermon(latest)} style={{
              position: 'relative', aspectRatio: '16/9', borderRadius: 4, overflow: 'hidden',
              background: BC.navyDark, cursor: 'pointer', transition: 'transform 250ms',
            }}
            onMouseEnter={e => { const p = e.currentTarget.querySelector('[data-play]'); if (p) p.style.transform = 'scale(1.06)'; }}
            onMouseLeave={e => { const p = e.currentTarget.querySelector('[data-play]'); if (p) p.style.transform = 'scale(1)'; }}
            >
              {latest.thumb ? (
                <img src={latest.thumb} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <img src={TOPO.navyOrange} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.35 }} />
              )}
              {/* subtle vignette for button contrast */}
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(15,34,51,0) 40%, rgba(15,34,51,0.55) 100%)' }} />
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div data-play style={{
                  width: 84, height: 84, borderRadius: '50%', background: BC.orange,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 8px 32px rgba(245,130,32,0.5)',
                  transition: 'transform 250ms cubic-bezier(0.25,0.1,0.25,1)',
                }}>
                  <PlayIcon size={28} />
                </div>
              </div>
              <div style={{ position: 'absolute', bottom: 16, right: 16, padding: '4px 10px', background: 'rgba(15,34,51,0.8)', borderRadius: 3, fontFamily: fontDisplay, fontSize: 11, fontWeight: 600, color: BC.cream, letterSpacing: '0.08em' }}>
                {latest.length}
              </div>
            </div>
            {/* Meta */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ fontFamily: fontDisplay, fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: BC.orange, marginBottom: 12 }}>
                Series · {latest.series}
              </div>
              <h2 style={{ fontFamily: fontDisplay, fontSize: 'clamp(32px, 3.5vw, 44px)', fontWeight: 800, color: BC.navy, letterSpacing: '-0.025em', lineHeight: 1.05, marginBottom: 16 }}>
                {latest.title}
              </h2>
              <div style={{ fontFamily: fontDisplay, fontSize: 15, color: BC.orange, fontStyle: 'italic', marginBottom: 28 }}>
                {latest.passage}
              </div>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <Button variant="primary" size="lg" onClick={() => setOpenSermon(latest)}>
                  <PlayIcon size={11} color="#fff" /> Watch
                </Button>
                <Button variant="outline" size="lg" onClick={() => setOpenSermon(latest)}>
                  <HeadphonesIcon size={13} color="currentColor" /> Listen
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERIES */}
      <Section bg={BC.white} py={96}>
        <Eyebrow>Series</Eyebrow>
        <h2 style={{ fontFamily: fontDisplay, fontSize: 48, fontWeight: 800, color: BC.navy, letterSpacing: '-0.025em', lineHeight: 1.05, marginBottom: 40 }}>
          What we're working through.
        </h2>

        {/* Current */}
        {currentSeries && (
          <div onClick={() => { setSeriesFilter(currentSeries.name); document.getElementById('library').scrollIntoView({ behavior: 'smooth', block: 'start' }); }}
            style={{
              position: 'relative', overflow: 'hidden', borderRadius: 4, cursor: 'pointer',
              background: BC.navy, padding: 48, marginBottom: 24, color: BC.cream,
              minHeight: 240, display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            }}>
            <img src={TOPO.navyOrange} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.3 }} />
            <div style={{ position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 32, flexWrap: 'wrap' }}>
              <div style={{ maxWidth: 640 }}>
                <div style={{ fontFamily: fontDisplay, fontSize: 11, fontWeight: 600, letterSpacing: '0.25em', textTransform: 'uppercase', color: BC.orange, marginBottom: 12, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: BC.orange }} /> Currently In
                </div>
                <h3 style={{ fontFamily: fontDisplay, fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 800, color: BC.cream, letterSpacing: '-0.025em', lineHeight: 1, marginBottom: 16 }}>
                  {currentSeries.name}
                </h3>
                <p style={{ fontFamily: fontBody, fontSize: 17, color: 'rgba(249,237,214,0.8)', fontWeight: 300, lineHeight: 1.55 }}>
                  {currentSeries.desc}
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontFamily: fontDisplay, fontSize: 48, fontWeight: 800, color: BC.orange, lineHeight: 1 }}>
                  {currentSeries.count}
                </div>
                <div style={{ fontFamily: fontDisplay, fontSize: 10, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(249,237,214,0.6)', marginTop: 4 }}>
                  Parts so far
                </div>
              </div>
            </div>
            <div style={{ position: 'relative', zIndex: 2, display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: fontDisplay, fontSize: 12, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: BC.orange, marginTop: 32 }}>
              See all messages in this series <ChevronRight size={13} color={BC.orange} />
            </div>
          </div>
        )}

        {/* Past series */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {pastSeries.map(s => (
            <div key={s.slug} onClick={() => { setSeriesFilter(s.name); document.getElementById('library').scrollIntoView({ behavior: 'smooth', block: 'start' }); }}
              style={{
                padding: 28, background: BC.creamSubtle, border: `1px solid ${BC.border}`, borderRadius: 4,
                cursor: 'pointer', transition: 'box-shadow 200ms, transform 200ms',
                display: 'flex', flexDirection: 'column', gap: 12, minHeight: 180,
              }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 6px 18px rgba(29,58,79,0.08)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ fontFamily: fontDisplay, fontSize: 10, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: BC.navyMuted }}>
                  {s.start}
                </div>
                <div style={{ fontFamily: fontDisplay, fontSize: 10, fontWeight: 600, letterSpacing: '0.18em', color: BC.orange }}>
                  {s.count} PARTS
                </div>
              </div>
              <h4 style={{ fontFamily: fontDisplay, fontSize: 24, fontWeight: 800, color: BC.navy, letterSpacing: '-0.02em', lineHeight: 1.1, marginTop: 'auto' }}>
                {s.name}
              </h4>
              <p style={{ fontFamily: fontBody, fontSize: 14, color: BC.navyMuted, fontWeight: 300, lineHeight: 1.55 }}>
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* LIBRARY — filters + list */}
      <Section bg={BC.creamSubtle} py={96} style={{ scrollMarginTop: 72 }}>
        <div id="library" />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40, flexWrap: 'wrap', gap: 20 }}>
          <div>
            <Eyebrow>Library</Eyebrow>
            <h2 style={{ fontFamily: fontDisplay, fontSize: 48, fontWeight: 800, color: BC.navy, letterSpacing: '-0.025em', lineHeight: 1.05 }}>
              All messages.
            </h2>
          </div>
          <div style={{ fontFamily: fontBody, fontSize: 14, color: BC.navyMuted, fontWeight: 300 }}>
            {filtered.length} of {MESSAGES.length} {anyFilter && (
              <button onClick={() => { setBookFilter('All'); setTopicFilter('All'); setSeriesFilter('All'); }} style={{
                background: 'transparent', border: 'none', cursor: 'pointer', color: BC.orange,
                fontFamily: fontDisplay, fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', marginLeft: 12,
              }}>Clear filters</button>
            )}
          </div>
        </div>

        {/* Filter rows */}
        <FilterRow label="Scripture" values={['All', ...ALL_BOOKS]} active={bookFilter} onChange={setBookFilter} />
        <FilterRow label="Topic"     values={['All', ...ALL_TOPICS]} active={topicFilter} onChange={setTopicFilter} formatter={v => v === 'All' ? v : v.replace(/-/g, ' ')} />
        <FilterRow label="Series"    values={['All', ...SERIES_DATA.map(s => s.name)]} active={seriesFilter} onChange={setSeriesFilter} />

        {/* List */}
        <div style={{ marginTop: 32, background: BC.white, border: `1px solid ${BC.border}`, borderRadius: 4, overflow: 'hidden' }}>
          {filtered.length === 0 ? (
            <div style={{ padding: 60, textAlign: 'center', fontFamily: fontBody, fontSize: 15, color: BC.navyMuted, fontWeight: 300 }}>
              No messages match those filters. <button onClick={() => { setBookFilter('All'); setTopicFilter('All'); setSeriesFilter('All'); }} style={{ background: 'transparent', border: 'none', color: BC.orange, cursor: 'pointer', fontFamily: 'inherit', fontSize: 'inherit', textDecoration: 'underline' }}>Clear them</button>.
            </div>
          ) : filtered.map((m, i) => (
            <div key={m.id} onClick={() => setOpenSermon(m)} style={{
              display: 'grid', gridTemplateColumns: '52px 1fr 180px 140px 80px',
              gap: 20, padding: '18px 24px',
              borderTop: i === 0 ? 'none' : `1px solid ${BC.border}`,
              alignItems: 'center', cursor: 'pointer',
              background: BC.white, transition: 'background 150ms',
            }}
            onMouseEnter={e => e.currentTarget.style.background = BC.creamSubtle}
            onMouseLeave={e => e.currentTarget.style.background = BC.white}
            >
              <div style={{
                width: 40, height: 40, borderRadius: '50%',
                background: BC.creamSubtle, border: `1.5px solid ${BC.border}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <PlayIcon size={11} color={BC.navy} />
              </div>
              <div>
                <div style={{ fontFamily: fontDisplay, fontSize: 16, fontWeight: 700, color: BC.navy, letterSpacing: '-0.01em', marginBottom: 4 }}>{m.title}</div>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap', fontFamily: fontBody, fontSize: 12, color: BC.navyMuted, fontWeight: 300 }}>
                  <span style={{ fontStyle: 'italic', color: BC.orange }}>{m.passage}</span>
                  <span style={{ color: BC.border }}>·</span>
                  <span>{m.date}</span>
                </div>
              </div>
              <div style={{ fontFamily: fontDisplay, fontSize: 10, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: BC.orange }}>
                {m.series}
              </div>
              <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                {m.topics.slice(0, 2).map(t => (
                  <span key={t} style={{ fontFamily: fontDisplay, fontSize: 9, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '3px 7px', background: BC.creamSubtle, border: `1px solid ${BC.border}`, borderRadius: 3, color: BC.navyMuted, whiteSpace: 'nowrap' }}>
                    {t.replace(/-/g, ' ')}
                  </span>
                ))}
              </div>
              <div style={{ fontFamily: fontDisplay, fontSize: 12, color: BC.navy, letterSpacing: '0.05em', textAlign: 'right', fontWeight: 500 }}>
                {m.length}
              </div>
            </div>
          ))}
        </div>

        {/* Subscribe footer */}
        <div style={{ marginTop: 48, padding: '36px 40px', background: BC.navy, borderRadius: 4, position: 'relative', overflow: 'hidden', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
          <img src={TOPO.navyOrange} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.22 }} />
          <div style={{ position: 'relative', zIndex: 2 }}>
            <div style={{ fontFamily: fontDisplay, fontSize: 11, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: BC.orange, marginBottom: 8 }}>
              Never miss a message
            </div>
            <h3 style={{ fontFamily: fontDisplay, fontSize: 26, fontWeight: 800, color: BC.cream, letterSpacing: '-0.015em' }}>
              Subscribe wherever you listen.
            </h3>
          </div>
          <div style={{ position: 'relative', zIndex: 2, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <Button variant="primary" size="lg">YouTube</Button>
            <Button variant="outlineDark" size="lg">Apple Podcasts</Button>
            <Button variant="outlineDark" size="lg">Spotify</Button>
          </div>
        </div>
      </Section>
    </>
  );
}

function FilterRow({ label, values, active, onChange, formatter = v => v }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr', gap: 20, alignItems: 'center', padding: '12px 0', borderTop: `1px solid ${BC.border}` }}>
      <div style={{ fontFamily: fontDisplay, fontSize: 10, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: BC.navyMuted }}>
        {label}
      </div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {values.map(v => (
          <FilterPill key={v} label={formatter(v)} active={active === v} onClick={() => onChange(v)} />
        ))}
      </div>
    </div>
  );
}

function FilterPill({ label, active, onClick }) {
  return (
    <button onClick={onClick} style={{
      padding: '7px 14px', borderRadius: 4, cursor: 'pointer',
      background: active ? BC.navy : 'transparent',
      color: active ? BC.cream : BC.navy,
      border: `1px solid ${active ? BC.navy : BC.border}`,
      fontFamily: fontDisplay, fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase',
      transition: 'background 150ms, color 150ms, border-color 150ms',
      whiteSpace: 'nowrap',
    }}>{label}</button>
  );
}

Object.assign(window, { MessagesPage });
