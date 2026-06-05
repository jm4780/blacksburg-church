// Blacksburg Church — Messages Page
// Sermons pulled live from YouTube. Title format: "Series | Sermon Title | Scripture"
// Add/update descriptions below when a new series begins.

const YT_KEY      = 'AIzaSyCT_Mj3GFI1XeJUkvHpMBGaeJdwGMnO1Uk';
const YT_PLAYLIST = 'PL6y7I4ZAQRS50NzxHXBtaQzqMM_4PeUp_';
const YT_CHANNEL  = 'https://www.youtube.com/@blacksburgchurch';
const CACHE_KEY   = 'bc-sermons-v3';
const CACHE_TTL   = 60 * 60 * 1000; // 1 hour

const SERIES_DESCS = {
  'God In Us':       'A study of the Holy Spirit — who he is, what he does, and why it matters.',
  'Good News':       'A walk through Galatians — on grace, freedom, and the gospel Paul refused to water down.',
  'Table':           'On eating, welcome, and the Jesus who showed up to dinner.',
  'Following Jesus': 'A walk through Mark — who Jesus is, and what it means to say yes.',
  'One Church':      'Why we do this together — on the shape of Christian community.',
  'The Long Wait':   'Four weeks of Advent — on longing, darkness, and light that keeps coming.',
};

function parseDuration(iso) {
  if (!iso) return '';
  const m = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!m) return '';
  const h = parseInt(m[1] || 0), min = parseInt(m[2] || 0), sec = parseInt(m[3] || 0);
  if (h > 0) return `${h}:${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  return `${min}:${String(sec).padStart(2, '0')}`;
}

function parseSermonTitle(ytTitle) {
  const parts = ytTitle.split(' | ');
  if (parts.length < 2) return null;
  const passage = parts[2] ? parts[2].trim() : '';
  const book    = passage ? passage.split(/\s+/)[0] : parts[0].trim(); // fall back to series as book grouping
  return { series: parts[0].trim(), title: parts[1].trim(), passage, book };
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

function buildSeriesData(messages) {
  const map = {};
  messages.forEach(m => {
    if (!map[m.series]) {
      map[m.series] = {
        slug:  m.series.toLowerCase().replace(/\s+/g, '-'),
        name:  m.series,
        desc:  SERIES_DESCS[m.series] || `Teaching from the ${m.series} series.`,
        count: 0,
        start: m.date,
      };
    }
    map[m.series].count++;
  });
  return Object.values(map).map((s, i) => ({ ...s, current: i === 0 }));
}

async function fetchSermons() {
  try {
    const cached = JSON.parse(sessionStorage.getItem(CACHE_KEY) || 'null');
    if (cached && Date.now() - cached.ts < CACHE_TTL) return cached.data;
  } catch (_) {}

  const listRes = await fetch(
    `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${YT_PLAYLIST}&maxResults=50&key=${YT_KEY}`
  );
  if (!listRes.ok) throw new Error('Could not load messages.');
  const listData = await listRes.json();

  // Any video in the playlist is a sermon — require at least Series | Title
  const items = (listData.items || []).filter(item => item.snippet.title.includes(' | '));
  if (items.length === 0) return [];

  const ids = items.map(i => i.snippet.resourceId.videoId).join(',');
  const durRes = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${ids}&key=${YT_KEY}`
  );
  const durData = durRes.ok ? await durRes.json() : { items: [] };
  const durMap = {};
  (durData.items || []).forEach(v => { durMap[v.id] = parseDuration(v.contentDetails.duration); });

  const messages = items.map((item, i) => {
    const s = item.snippet;
    const videoId = s.resourceId.videoId;
    const parsed = parseSermonTitle(s.title);
    return {
      id:      i + 1,
      videoId,
      thumb:   s.thumbnails?.maxres?.url || s.thumbnails?.high?.url || s.thumbnails?.medium?.url || '',
      title:   parsed.title,
      series:  parsed.series,
      passage: parsed.passage,
      book:    parsed.book,
      date:    formatDate(s.publishedAt),
      length:  durMap[videoId] || '',
    };
  });

  try { sessionStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), data: messages })); } catch (_) {}
  return messages;
}

function useSermons() {
  const [messages, setMessages] = React.useState([]);
  const [loading, setLoading]   = React.useState(true);
  const [error, setError]       = React.useState(null);
  React.useEffect(() => {
    fetchSermons()
      .then(msgs => { setMessages(msgs); setLoading(false); })
      .catch(err  => { setError(err.message); setLoading(false); });
  }, []);
  return { messages, loading, error };
}

// ── icons ─────────────────────────────────────────────────
function PlayIcon({ size = 14, color = '#fff' }) { return <svg width={size} height={size * 1.15} viewBox="0 0 14 16" fill={color}><path d="M1 1l12 7-12 7V1z"/></svg>; }
function HeadphonesIcon({ size = 14, color = 'currentColor' }) {
  return <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 11V9a6 6 0 0112 0v2"/><path d="M2 11v2a1 1 0 001 1h1a1 1 0 001-1v-2a1 1 0 00-1-1H2zM14 11v2a1 1 0 01-1 1h-1a1 1 0 01-1-1v-2a1 1 0 011-1h2z"/></svg>;
}
function VideoIcon({ size = 14, color = 'currentColor' }) {
  return <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="10" height="10" rx="1"/><path d="M11 6l4-2v8l-4-2z"/></svg>;
}
function ChevronRight({ size = 14, color = 'currentColor' }) {
  return <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3l5 5-5 5"/></svg>;
}

// ── Player (video OR audio mode) ─────────────────────────
function SermonPlayer({ sermon, mode, setMode }) {
  const ytEmbed = `https://www.youtube.com/embed/${sermon.videoId}?rel=0&modestbranding=1&autoplay=1`;
  const [playing, setPlaying] = React.useState(false);

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ display: 'flex', gap: 0, marginBottom: 16, border: `1px solid ${BC.border}`, borderRadius: 4, overflow: 'hidden', width: 'fit-content', background: BC.white }}>
        {[['video', 'Watch', <VideoIcon size={13} />], ['audio', 'Listen', <HeadphonesIcon size={13} />]].map(([m, label, icon]) => (
          <button key={m} onClick={() => { setMode(m); setPlaying(false); }} style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '10px 18px', border: 'none', cursor: 'pointer',
            background: mode === m ? BC.navy : 'transparent',
            color: mode === m ? BC.cream : BC.navy,
            fontFamily: fontDisplay, fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase',
            transition: 'background 150ms, color 150ms',
          }}>{icon}{label}</button>
        ))}
      </div>

      {mode === 'video' && (
        <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', background: BC.navyDark, borderRadius: 4, overflow: 'hidden' }}>
          {!playing ? (
            <>
              {sermon.thumb
                ? <img src={sermon.thumb} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                : <img src={TOPO.navyOrange} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.35 }} />
              }
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(15,34,51,0.1) 0%, rgba(15,34,51,0.5) 100%)' }} />
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div onClick={() => setPlaying(true)} style={{
                  width: 78, height: 78, borderRadius: '50%', background: BC.orange,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 8px 32px rgba(245,130,32,0.45)', cursor: 'pointer',
                  transition: 'transform 200ms',
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.07)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                >
                  <PlayIcon size={26} />
                </div>
              </div>
              {sermon.length && (
                <div style={{ position: 'absolute', bottom: 16, right: 16, padding: '4px 10px', background: 'rgba(15,34,51,0.8)', borderRadius: 3, fontFamily: fontDisplay, fontSize: 11, fontWeight: 600, color: BC.cream, letterSpacing: '0.08em' }}>
                  {sermon.length}
                </div>
              )}
            </>
          ) : (
            <iframe
              src={ytEmbed}
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          )}
        </div>
      )}

      {mode === 'audio' && (
        <div style={{ padding: '32px 28px', background: BC.navyDark, borderRadius: 4, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <p style={{ fontFamily: fontBody, fontSize: 15, color: 'rgba(249,237,214,0.75)', fontWeight: 300, lineHeight: 1.6 }}>
            Audio coming soon — listen on YouTube or subscribe to the podcast below.
          </p>
          <a href={`https://www.youtube.com/watch?v=${sermon.videoId}`} target="_blank" rel="noreferrer">
            <Button variant="primary" size="md">Open on YouTube <ArrowRight color="#fff" /></Button>
          </a>
        </div>
      )}
    </div>
  );
}

// ── Sermon detail view ────────────────────────────────────
function SermonDetail({ sermon, onBack, messages, seriesData }) {
  const [mode, setMode] = React.useState('video');
  const seriesInfo = seriesData.find(s => s.name === sermon.series);
  const related    = messages.filter(m => m.series === sermon.series && m.id !== sermon.id).slice(0, 3);

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
            <span>{sermon.date}</span>
            {sermon.passage && <span style={{ color: BC.orange, fontStyle: 'italic' }}>{sermon.passage}</span>}
            {sermon.length && <span>{sermon.length}</span>}
          </div>
        </div>
      </section>

      <section style={{ background: BC.creamSubtle, padding: '48px 48px 64px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <SermonPlayer sermon={sermon} mode={mode} setMode={setMode} />

          {seriesInfo && (
            <div style={{ marginTop: 48, padding: 28, background: BC.white, border: `1px solid ${BC.border}`, borderRadius: 4 }}>
              <div style={{ fontFamily: fontDisplay, fontSize: 10, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: BC.orange, marginBottom: 8 }}>
                Part of · {seriesInfo.name}
              </div>
              <p style={{ fontFamily: fontBody, fontSize: 16, color: BC.navyMuted, fontWeight: 300, lineHeight: 1.6, marginBottom: related.length > 0 ? 20 : 0 }}>
                {seriesInfo.desc}
              </p>
              {related.length > 0 && (
                <div style={{ display: 'grid', gap: 1, background: BC.border, border: `1px solid ${BC.border}`, borderRadius: 4, overflow: 'hidden' }}>
                  {related.map(r => (
                    <div key={r.id} onClick={onBack} style={{
                      display: 'grid', gridTemplateColumns: '1fr auto', gap: 16, padding: '16px 20px',
                      background: BC.white, cursor: 'pointer', alignItems: 'center',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = BC.creamSubtle}
                    onMouseLeave={e => e.currentTarget.style.background = BC.white}
                    >
                      <div>
                        <div style={{ fontFamily: fontDisplay, fontSize: 15, fontWeight: 600, color: BC.navy, marginBottom: 2 }}>{r.title}</div>
                        <div style={{ fontFamily: fontBody, fontSize: 12, color: BC.navyMuted, fontWeight: 300 }}>{r.passage} · {r.date}</div>
                      </div>
                      {r.length && <div style={{ fontFamily: fontDisplay, fontSize: 11, color: BC.navyMuted, letterSpacing: '0.08em' }}>{r.length}</div>}
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
  const { messages, loading, error } = useSermons();
  const [openSermon, setOpenSermon]   = React.useState(null);
  const [bookFilter, setBookFilter]   = React.useState('All');
  const [seriesFilter, setSeriesFilter] = React.useState('All');

  const seriesData = React.useMemo(() => buildSeriesData(messages), [messages]);
  const allBooks   = React.useMemo(() => Array.from(new Set(messages.map(m => m.book))).filter(Boolean).sort(), [messages]);

  React.useEffect(() => { if (openSermon) window.scrollTo({ top: 0 }); }, [openSermon]);

  if (openSermon) {
    return <SermonDetail sermon={openSermon} onBack={() => setOpenSermon(null)} messages={messages} seriesData={seriesData} />;
  }

  const filtered = messages.filter(m =>
    (bookFilter   === 'All' || m.book   === bookFilter) &&
    (seriesFilter === 'All' || m.series === seriesFilter)
  );

  const latest       = messages[0];
  const currentSeries = seriesData.find(s => s.current);
  const pastSeries    = seriesData.filter(s => !s.current);
  const anyFilter     = bookFilter !== 'All' || seriesFilter !== 'All';

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

      {/* LOADING / ERROR */}
      {loading && (
        <section style={{ background: BC.creamSubtle, padding: '80px 48px', textAlign: 'center' }}>
          <div style={{ fontFamily: fontBody, fontSize: 16, color: BC.navyMuted, fontWeight: 300 }}>Loading messages…</div>
        </section>
      )}
      {error && (
        <section style={{ background: BC.creamSubtle, padding: '80px 48px', textAlign: 'center' }}>
          <div style={{ fontFamily: fontBody, fontSize: 16, color: BC.navyMuted, fontWeight: 300, marginBottom: 16 }}>{error}</div>
          <a href={YT_CHANNEL} target="_blank" rel="noreferrer">
            <Button variant="primary">Watch on YouTube <ArrowRight color="#fff" /></Button>
          </a>
        </section>
      )}

      {!loading && !error && latest && (
        <>
          {/* LATEST */}
          <section style={{ background: BC.creamSubtle, padding: '64px 48px' }}>
            <div style={{ maxWidth: 1200, margin: '0 auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 24 }}>
                <Eyebrow>Latest Message</Eyebrow>
                <div style={{ fontFamily: fontDisplay, fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: BC.navyMuted }}>
                  {latest.date}
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 40, alignItems: 'stretch' }}>
                <div data-bc-latest-thumb onClick={() => setOpenSermon(latest)} style={{
                  position: 'relative', aspectRatio: '16/9', borderRadius: 4, overflow: 'hidden',
                  background: BC.navyDark, cursor: 'pointer',
                }}
                onMouseEnter={e => { const p = e.currentTarget.querySelector('[data-play]'); if (p) p.style.transform = 'scale(1.06)'; }}
                onMouseLeave={e => { const p = e.currentTarget.querySelector('[data-play]'); if (p) p.style.transform = 'scale(1)'; }}
                >
                  {latest.thumb
                    ? <img src={latest.thumb} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                    : <img src={TOPO.navyOrange} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.35 }} />
                  }
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
                  {latest.length && (
                    <div style={{ position: 'absolute', bottom: 16, right: 16, padding: '4px 10px', background: 'rgba(15,34,51,0.8)', borderRadius: 3, fontFamily: fontDisplay, fontSize: 11, fontWeight: 600, color: BC.cream, letterSpacing: '0.08em' }}>
                      {latest.length}
                    </div>
                  )}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div style={{ fontFamily: fontDisplay, fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: BC.orange, marginBottom: 12 }}>
                    Series · {latest.series}
                  </div>
                  <h2 style={{ fontFamily: fontDisplay, fontSize: 'clamp(32px, 3.5vw, 44px)', fontWeight: 800, color: BC.navy, letterSpacing: '-0.025em', lineHeight: 1.05, marginBottom: 16 }}>
                    {latest.title}
                  </h2>
                  {latest.passage && (
                    <div style={{ fontFamily: fontDisplay, fontSize: 15, color: BC.orange, fontStyle: 'italic', marginBottom: 28 }}>
                      {latest.passage}
                    </div>
                  )}
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
          {seriesData.length > 0 && (
            <Section bg={BC.white} py={96}>
              <Eyebrow>Series</Eyebrow>
              <h2 style={{ fontFamily: fontDisplay, fontSize: 48, fontWeight: 800, color: BC.navy, letterSpacing: '-0.025em', lineHeight: 1.05, marginBottom: 40 }}>
                What we're working through.
              </h2>

              {currentSeries && (
                <div data-bc-series-current onClick={() => { setSeriesFilter(currentSeries.name); document.getElementById('library').scrollIntoView({ behavior: 'smooth', block: 'start' }); }}
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
                      <div style={{ fontFamily: fontDisplay, fontSize: 48, fontWeight: 800, color: BC.orange, lineHeight: 1 }}>{currentSeries.count}</div>
                      <div style={{ fontFamily: fontDisplay, fontSize: 10, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(249,237,214,0.6)', marginTop: 4 }}>Parts so far</div>
                    </div>
                  </div>
                  <div style={{ position: 'relative', zIndex: 2, display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: fontDisplay, fontSize: 12, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: BC.orange, marginTop: 32 }}>
                    See all messages in this series <ChevronRight size={13} color={BC.orange} />
                  </div>
                </div>
              )}

              {pastSeries.length > 0 && (
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
                        <div style={{ fontFamily: fontDisplay, fontSize: 10, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: BC.navyMuted }}>{s.start}</div>
                        <div style={{ fontFamily: fontDisplay, fontSize: 10, fontWeight: 600, letterSpacing: '0.18em', color: BC.orange }}>{s.count} PARTS</div>
                      </div>
                      <h4 style={{ fontFamily: fontDisplay, fontSize: 24, fontWeight: 800, color: BC.navy, letterSpacing: '-0.02em', lineHeight: 1.1, marginTop: 'auto' }}>{s.name}</h4>
                      <p style={{ fontFamily: fontBody, fontSize: 14, color: BC.navyMuted, fontWeight: 300, lineHeight: 1.55 }}>{s.desc}</p>
                    </div>
                  ))}
                </div>
              )}
            </Section>
          )}

          {/* LIBRARY */}
          <Section bg={BC.creamSubtle} py={96}>
            <div id="library" />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40, flexWrap: 'wrap', gap: 20 }}>
              <div>
                <Eyebrow>Library</Eyebrow>
                <h2 style={{ fontFamily: fontDisplay, fontSize: 48, fontWeight: 800, color: BC.navy, letterSpacing: '-0.025em', lineHeight: 1.05 }}>All messages.</h2>
              </div>
              <div style={{ fontFamily: fontBody, fontSize: 14, color: BC.navyMuted, fontWeight: 300 }}>
                {filtered.length} of {messages.length}
                {anyFilter && (
                  <button onClick={() => { setBookFilter('All'); setSeriesFilter('All'); }} style={{
                    background: 'transparent', border: 'none', cursor: 'pointer', color: BC.orange,
                    fontFamily: fontDisplay, fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', marginLeft: 12,
                  }}>Clear filters</button>
                )}
              </div>
            </div>

            <FilterRow label="Book"   values={['All', ...allBooks]}                    active={bookFilter}   onChange={setBookFilter} />
            <FilterRow label="Series" values={['All', ...seriesData.map(s => s.name)]} active={seriesFilter} onChange={setSeriesFilter} />

            <div style={{ marginTop: 32, background: BC.white, border: `1px solid ${BC.border}`, borderRadius: 4, overflow: 'hidden' }}>
              {filtered.length === 0 ? (
                <div style={{ padding: 60, textAlign: 'center', fontFamily: fontBody, fontSize: 15, color: BC.navyMuted, fontWeight: 300 }}>
                  No messages match those filters.{' '}
                  <button onClick={() => { setBookFilter('All'); setSeriesFilter('All'); }} style={{ background: 'transparent', border: 'none', color: BC.orange, cursor: 'pointer', fontFamily: 'inherit', fontSize: 'inherit', textDecoration: 'underline' }}>Clear them</button>.
                </div>
              ) : filtered.map((m, i) => (
                <div key={m.id} onClick={() => setOpenSermon(m)} style={{
                  display: 'grid', gridTemplateColumns: '52px 1fr 180px 80px',
                  gap: 20, padding: '18px 24px',
                  borderTop: i === 0 ? 'none' : `1px solid ${BC.border}`,
                  alignItems: 'center', cursor: 'pointer',
                  background: BC.white, transition: 'background 150ms',
                }}
                onMouseEnter={e => e.currentTarget.style.background = BC.creamSubtle}
                onMouseLeave={e => e.currentTarget.style.background = BC.white}
                >
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: BC.creamSubtle, border: `1.5px solid ${BC.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <PlayIcon size={11} color={BC.navy} />
                  </div>
                  <div>
                    <div style={{ fontFamily: fontDisplay, fontSize: 16, fontWeight: 700, color: BC.navy, letterSpacing: '-0.01em', marginBottom: 4 }}>{m.title}</div>
                    <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap', fontFamily: fontBody, fontSize: 12, color: BC.navyMuted, fontWeight: 300 }}>
                      {m.passage && <span style={{ fontStyle: 'italic', color: BC.orange }}>{m.passage}</span>}
                      {m.passage && <span style={{ color: BC.border }}>·</span>}
                      <span>{m.date}</span>
                    </div>
                  </div>
                  <div style={{ fontFamily: fontDisplay, fontSize: 10, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: BC.orange }}>{m.series}</div>
                  <div style={{ fontFamily: fontDisplay, fontSize: 12, color: BC.navy, letterSpacing: '0.05em', textAlign: 'right', fontWeight: 500 }}>{m.length}</div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 48, padding: '36px 40px', background: BC.navy, borderRadius: 4, position: 'relative', overflow: 'hidden', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
              <img src={TOPO.navyOrange} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.22 }} />
              <div style={{ position: 'relative', zIndex: 2 }}>
                <div style={{ fontFamily: fontDisplay, fontSize: 11, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: BC.orange, marginBottom: 8 }}>Never miss a message</div>
                <h3 style={{ fontFamily: fontDisplay, fontSize: 26, fontWeight: 800, color: BC.cream, letterSpacing: '-0.015em' }}>Subscribe wherever you listen.</h3>
              </div>
              <div style={{ position: 'relative', zIndex: 2, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <a href={YT_CHANNEL} target="_blank" rel="noreferrer">
                  <Button variant="primary" size="lg">YouTube</Button>
                </a>
                <Button variant="outlineDark" size="lg">Apple Podcasts</Button>
                <Button variant="outlineDark" size="lg">Spotify</Button>
              </div>
            </div>
          </Section>
        </>
      )}
    </>
  );
}

function FilterRow({ label, values, active, onChange }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr', gap: 20, alignItems: 'center', padding: '12px 0', borderTop: `1px solid ${BC.border}` }}>
      <div style={{ fontFamily: fontDisplay, fontSize: 10, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: BC.navyMuted }}>{label}</div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {values.map(v => (
          <button key={v} onClick={() => onChange(v)} style={{
            padding: '7px 14px', borderRadius: 4, cursor: 'pointer',
            background: active === v ? BC.navy : 'transparent',
            color: active === v ? BC.cream : BC.navy,
            border: `1px solid ${active === v ? BC.navy : BC.border}`,
            fontFamily: fontDisplay, fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase',
            transition: 'background 150ms, color 150ms, border-color 150ms', whiteSpace: 'nowrap',
          }}>{v}</button>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { MessagesPage, useSermons });
