// Blacksburg Church — Home Page (Hero variants + home sections)

// ── HERO VARIANT A: Topo-forward ─────────────────────────
function HeroTopo({ onNav }) {
  return (
    <div data-bc-hero style={{ position: 'relative', background: BC.navyDark, overflow: 'hidden', minHeight: 'calc(100vh - 72px)', display: 'flex', alignItems: 'center' }}>
      <img src={TOPO.navyOrange} alt="" style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%',
        objectFit: 'cover', opacity: 0.4,
      }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(15,34,51,0.2) 0%, rgba(15,34,51,0.7) 100%)' }} />

      <div data-bc-hero-inner style={{ position: 'relative', zIndex: 2, maxWidth: 1200, margin: '0 auto', padding: '80px 48px', width: '100%' }}>
        <div style={{ maxWidth: 780 }}>
          <Eyebrow style={{ color: BC.orange }}>Blacksburg, Virginia · Est. 2026</Eyebrow>
          <h1 data-bc-h1-xl style={{
            fontFamily: fontDisplay, fontSize: 'clamp(48px, 7vw, 96px)', fontWeight: 800,
            color: BC.cream, lineHeight: 0.98, letterSpacing: '-0.035em',
            marginBottom: 48,
          }}>
            A community to<br/>
            <span style={{ fontStyle: 'italic', fontWeight: 400, color: BC.orange, whiteSpace: 'nowrap' }}>find &amp; follow</span><br/>
            Jesus.
          </h1>
          <div data-bc-btnrow style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <Button variant="onDark" size="xl" onClick={() => onNav && onNav('house-churches')}>
              Find a house church <ArrowRight color="#fff" />
            </Button>
            <Button variant="outlineDark" size="xl" onClick={() => onNav && onNav('gatherings')}>
              Join us Sunday
            </Button>
          </div>
        </div>
      </div>

      {/* Corner coordinates — outdoor brand detail */}
      <div data-bc-hero-coords style={{
        position: 'absolute', bottom: 32, right: 48, zIndex: 3,
        fontFamily: fontDisplay, fontSize: 10, color: 'rgba(249,237,214,0.4)',
        letterSpacing: '0.2em', textTransform: 'uppercase', textAlign: 'right', lineHeight: 1.8,
      }}>
        37.2296° N<br/>80.4139° W<br/>Elev. 2,080 ft
      </div>
    </div>
  );
}

// ── HERO VARIANT B: Photo-forward ────────────────────────
function HeroPhoto({ onNav }) {
  return (
    <div data-bc-hero style={{ position: 'relative', background: BC.navyDark, overflow: 'hidden', minHeight: 'calc(100vh - 72px)', display: 'flex', alignItems: 'center' }}>
      <img
        src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1800&q=80"
        alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
      />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(15,34,51,0.85) 0%, rgba(15,34,51,0.5) 60%, rgba(15,34,51,0.3) 100%)' }} />
      <img src={TOPO.navyOrange} alt="" style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%',
        objectFit: 'cover', opacity: 0.2, mixBlendMode: 'screen', pointerEvents: 'none',
      }} />

      <div data-bc-hero-inner style={{ position: 'relative', zIndex: 2, maxWidth: 1200, margin: '0 auto', padding: '80px 48px', width: '100%' }}>
        <div style={{ maxWidth: 680 }}>
          <Eyebrow>A Church of House Churches</Eyebrow>
          <h1 data-bc-h1-xl style={{
            fontFamily: fontDisplay, fontSize: 'clamp(52px, 7.5vw, 108px)', fontWeight: 800,
            color: BC.cream, lineHeight: 0.98, letterSpacing: '-0.03em',
            marginBottom: 28,
          }}>
            Not what you'd<br/>expect from a<br/>
            <span style={{ color: BC.orange }}>church.</span>
          </h1>
          <p data-bc-lead style={{
            fontFamily: fontBody, fontSize: 19, color: 'rgba(249,237,214,0.82)',
            lineHeight: 1.65, maxWidth: 500, marginBottom: 40, fontWeight: 300,
          }}>
            House churches in real homes. One gathering on Sundays. A simple community built on honest questions and deep friendship.
          </p>
          <div data-bc-btnrow style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <Button variant="onDark" size="xl" onClick={() => onNav && onNav('connect')}>
              Get connected <ArrowRight color="#fff" />
            </Button>
            <Button variant="outlineDark" size="xl" onClick={() => onNav && onNav('gatherings')}>
              Join us Sunday
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── HERO VARIANT C: Typographic / brand-site ─────────────
function HeroType({ onNav }) {
  return (
    <div data-bc-hero data-bc-hero-type-wrap style={{ position: 'relative', background: BC.cream, overflow: 'hidden', minHeight: 'calc(100vh - 72px)' }}>
      <img src={TOPO.creamOrange} alt="" style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%',
        objectFit: 'cover', opacity: 0.5,
      }} />
      <div style={{ position: 'relative', zIndex: 2, maxWidth: 1200, margin: '0 auto', padding: '72px 48px 48px', width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 48 }}>
          <Eyebrow style={{ color: BC.navy, marginBottom: 0 }}>N° 01 — Welcome</Eyebrow>
          <div style={{ fontFamily: fontDisplay, fontSize: 11, color: BC.navyMuted, letterSpacing: '0.15em', textTransform: 'uppercase', textAlign: 'right', lineHeight: 1.8 }}>
            Blacksburg · VA<br/>Est. 2026
          </div>
        </div>

        <h1 data-bc-hero-type style={{
          fontFamily: fontDisplay, fontSize: 'clamp(80px, 16vw, 260px)', fontWeight: 800,
          color: BC.navy, lineHeight: 0.85, letterSpacing: '-0.05em',
          marginBottom: 0, textAlign: 'center',
        }}>
          FIND<br/>
          <span style={{ fontStyle: 'italic', fontWeight: 300, color: BC.orange }}>&amp; follow</span><br/>
          JESUS.
        </h1>

        <div data-bc-hero-type-row style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 48, flexWrap: 'wrap', gap: 24 }}>
          <p style={{
            fontFamily: fontBody, fontSize: 17, color: BC.navyMuted,
            lineHeight: 1.65, maxWidth: 380, fontWeight: 300,
          }}>
            A small church of house churches in the New River Valley — honest, curious, and rooted in place.
          </p>
          <div style={{ display: 'flex', gap: 12 }}>
            <Button variant="primary" size="lg" onClick={() => onNav && onNav('house-churches')}>
              Find a house church <ArrowRight color="#fff" />
            </Button>
            <Button variant="outline" size="lg" onClick={() => onNav && onNav('about')}>
              Our story
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── STATS / Values strip ─────────────────────────────────
function ValuesStrip() {
  const items = [
    { label: 'Who we follow', value: 'Jesus.', sub: 'The center of everything we do.' },
    { label: 'How we gather', value: 'Together.', sub: 'In homes all week. As one on Sunday.' },
    { label: 'Who it\u2019s for', value: 'Everyone.', sub: 'The curious, the skeptical, the disciple \u2014 and everyone in between.' },
    { label: 'Why we exist', value: 'To equip.', sub: 'All people to find and follow Jesus.' },
  ];
  return (
    <section style={{ background: BC.cream, borderTop: `1px solid ${BC.creamDark}`, borderBottom: `1px solid ${BC.creamDark}` }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '56px 48px' }}>
        <div data-bc-values style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0 }}>
          {items.map((it, i) => (
            <Reveal key={it.label} delay={i * 80}>
              <div style={{ padding: '8px 32px 8px 0', borderLeft: i === 0 ? 'none' : `1px solid ${BC.creamDark}`, paddingLeft: i === 0 ? 0 : 32 }}>
                <div style={{ fontFamily: fontDisplay, fontSize: 11, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: BC.orange, marginBottom: 10 }}>
                  {it.label}
                </div>
                <div data-bc-val-value style={{ fontFamily: fontDisplay, fontSize: 38, fontWeight: 800, color: BC.navy, letterSpacing: '-0.025em', lineHeight: 1, marginBottom: 10 }}>
                  {it.value}
                </div>
                <div style={{ fontFamily: fontBody, fontSize: 13, color: BC.navyMuted, fontWeight: 300 }}>
                  {it.sub}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── ABOUT preview ────────────────────────────────────────
function AboutPreview({ onNav }) {
  return (
    <Section bg={BC.white} py={120}>
      <div data-bc-grid-split style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: 80, alignItems: 'center' }}>
        <Reveal>
          <div data-bc-aspect-4-5 style={{ position: 'relative', aspectRatio: '1/1', borderRadius: 4, overflow: 'hidden', background: BC.navy }}>
            <img
              src="assets/SNY07283.JPG"
              alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '28% center' }}
            />
            <div style={{
              position: 'absolute', left: 24, bottom: 24, zIndex: 2,
              fontFamily: fontDisplay, fontSize: 10, color: '#fff',
              letterSpacing: '0.2em', textTransform: 'uppercase',
              textShadow: '0 2px 12px rgba(0,0,0,0.6)',
            }}>
              House Church N° 02 · Nellie’s Cave
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <Eyebrow>Who we are</Eyebrow>
          <h2 data-bc-h2 style={{ fontFamily: fontDisplay, fontSize: 56, fontWeight: 800, color: BC.navy, letterSpacing: '-0.025em', lineHeight: 1.05, marginBottom: 28 }}>
            A different<br/>kind of church.
          </h2>
          <p style={{ fontFamily: fontBody, fontSize: 18, color: BC.navyMuted, lineHeight: 1.7, marginBottom: 20, fontWeight: 300 }}>
            We exist to equip all people to find and follow Jesus. Every Sunday we gather as one church, in one place, under one roof — and the rest of the week we meet in house churches across the New River Valley so that every person can be personally known and connected.
          </p>
          <p style={{ fontFamily: fontBody, fontSize: 18, color: BC.navyMuted, lineHeight: 1.7, marginBottom: 36, fontWeight: 300 }}>
            If you're curious, skeptical, a lifelong disciple, or somewhere in between — you're welcome here. This is a church for all people. No pressure. No performance.
          </p>
          <Button variant="navy" size="lg" onClick={() => onNav && onNav('about')}>
            Our story <ArrowRight color={BC.cream} />
          </Button>
        </Reveal>
      </div>
    </Section>
  );
}

// ── FUTURE NEIGHBORHOODS card ──────────────────
// Sends people to the House Churches page so they can pick a specific
// neighborhood waitlist there (we don't want a generic catch-all here).
function FutureNeighborhoodsCard({ onNav }) {
  return (
    <div
      onClick={() => onNav && onNav('house-churches', { anchor: 'future-locations' })}
      style={{
        background: 'transparent', border: `1px dashed ${BC.navyMuted}`, borderRadius: 4,
        padding: '32px 28px', cursor: 'pointer',
        transition: 'background 200ms, transform 200ms',
        minHeight: 280, height: '100%',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        boxSizing: 'border-box',
      }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; }}
    >
      <div>
        <div style={{ fontFamily: fontDisplay, fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', color: BC.orange, marginBottom: 28 }}>N° 03 — 06</div>
        <div style={{ fontFamily: fontDisplay, fontSize: 24, fontWeight: 700, color: BC.navy, letterSpacing: '-0.015em', lineHeight: 1.1, marginBottom: 12, whiteSpace: 'nowrap' }}>
          Future house churches.
        </div>
        <div style={{ fontFamily: fontBody, fontSize: 14, color: BC.navyMuted, fontWeight: 300, lineHeight: 1.6 }}>
          Newport, Prices Fork, Downtown Blacksburg, Merrimac — we'd love your help.
        </div>
      </div>
      <div style={{ paddingTop: 20, borderTop: `1px dashed ${BC.navyMuted}`, marginTop: 20 }}>
        <div style={{
          fontFamily: fontDisplay, fontSize: 12, fontWeight: 600, color: BC.navy, letterSpacing: '0.05em',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%',
        }}>
          <span>SEE FUTURE LOCATIONS</span>
          <ArrowRight color={BC.orange} />
        </div>
      </div>
    </div>
  );
}

// ── HOUSE CHURCH preview (2 active) ──────────────────────
const HOMEPAGE_HCS = [
  { name: 'Plum Creek',     town: 'Christiansburg', day: 'Sundays',    time: '5:00 – 7:00 PM', num: '01' },
  { name: "Nellie's Cave", town: 'Blacksburg',     day: 'Wednesdays', time: '6:00 – 8:00 PM', num: '02' },
];
function HomeHouseChurches({ onNav }) {
  return (
    <section style={{ background: BC.creamSubtle, padding: '120px 48px', position: 'relative', overflow: 'hidden' }}>
      <img src={TOPO.cream} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.35, pointerEvents: 'none' }} />
      <div style={{ position: 'relative', zIndex: 2, maxWidth: 1200, margin: '0 auto' }}>
        <div data-bc-sectionhead style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 56, flexWrap: 'wrap', gap: 20 }}>
          <div>
            <Eyebrow>House Churches</Eyebrow>
            <h2 data-bc-h2 style={{ fontFamily: fontDisplay, fontSize: 56, fontWeight: 800, color: BC.navy, letterSpacing: '-0.025em', lineHeight: 1.05, maxWidth: 520 }}>
              One church,<br/>multiple homes.
            </h2>
          </div>
          <Button variant="outline" size="lg" onClick={() => onNav && onNav('house-churches')}>
            See the map <ArrowRight />
          </Button>
        </div>

        <div data-bc-grid style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 20 }}>
          {HOMEPAGE_HCS.map((hc, i) => (
            <Reveal key={hc.name} delay={i * 80} style={{ height: '100%' }}>
              <div
                onClick={() => onNav && onNav('house-churches')}
                style={{
                  background: BC.white, border: `1px solid ${BC.border}`, borderRadius: 4,
                  padding: '32px 28px', cursor: 'pointer',
                  transition: 'transform 200ms, box-shadow 200ms',
                  position: 'relative', overflow: 'hidden', minHeight: 280, height: '100%',
                  display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                  boxSizing: 'border-box',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(15,34,51,0.1)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <div>
                  <div style={{ marginBottom: 28 }}>
                    <div style={{ fontFamily: fontDisplay, fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', color: BC.orange }}>N° {hc.num}</div>
                  </div>
                  <div style={{ fontFamily: fontDisplay, fontSize: 28, fontWeight: 700, color: BC.navy, letterSpacing: '-0.015em', lineHeight: 1.1, marginBottom: 12 }}>
                    {hc.name}
                  </div>
                  <div style={{ fontFamily: fontBody, fontSize: 14, color: BC.navyMuted, fontWeight: 300, lineHeight: 1.6 }}>
                    {hc.town}
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 12, paddingTop: 20, borderTop: `1px solid ${BC.border}`, marginTop: 20 }}>
                  <div>
                    <div style={{ fontFamily: fontDisplay, fontSize: 12, fontWeight: 600, color: BC.navy, letterSpacing: '0.05em' }}>
                      {hc.day.toUpperCase()}
                    </div>
                    <div style={{ fontFamily: fontBody, fontSize: 13, color: BC.navyMuted, fontWeight: 400, marginTop: 4, letterSpacing: '0.01em' }}>
                      {hc.time}
                    </div>
                  </div>
                  <ArrowRight color={BC.orange} />
                </div>
              </div>
            </Reveal>
          ))}
          {/* Launching soon placeholder card */}
          <Reveal delay={160} style={{ height: '100%' }}>
            <FutureNeighborhoodsCard onNav={onNav} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ── SUNDAY gatherings preview ────────────────────────────
function HomeGatherings({ onNav }) {
  return (
    <div style={{ background: BC.navy, position: 'relative', overflow: 'hidden' }}>
      <img src={TOPO.navy} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.25 }} />
      <div style={{ position: 'relative', zIndex: 2, maxWidth: 1200, margin: '0 auto', padding: '120px 48px' }}>
        <div data-bc-grid-split style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 80, alignItems: 'center' }}>
          <Reveal>
            <Eyebrow>Sunday Gatherings</Eyebrow>
            <h2 data-bc-h2 style={{ fontFamily: fontDisplay, fontSize: 56, fontWeight: 800, color: BC.cream, letterSpacing: '-0.025em', lineHeight: 1.05, marginBottom: 28 }}>
              One church,<br/>one gathering,<br/>every Sunday.
            </h2>
            <p style={{ fontFamily: fontBody, fontSize: 18, color: 'rgba(249,237,214,0.75)', lineHeight: 1.7, marginBottom: 20, fontWeight: 300 }}>
              On Sundays, our house churches come together for one gathering — songs, Scripture, stories, a sermon, and a little space for silence. Kids are welcome right in the room with you. Come early, grab coffee.
            </p>
            <div style={{ display: 'flex', gap: 40, margin: '36px 0', flexWrap: 'wrap' }}>
              <div>
                <div style={{ fontFamily: fontDisplay, fontSize: 11, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: BC.orange, marginBottom: 8 }}>When</div>
                <div style={{ fontFamily: fontDisplay, fontSize: 22, fontWeight: 700, color: BC.cream }}>Sundays · 10:00am</div>
              </div>
              <div>
                <div style={{ fontFamily: fontDisplay, fontSize: 11, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: BC.orange, marginBottom: 8 }}>Where</div>
                <div style={{ fontFamily: fontDisplay, fontSize: 20, fontWeight: 700, color: BC.cream, whiteSpace: 'nowrap' }}>Blacksburg Public Library</div>
              </div>
            </div>
            <Button variant="onDark" size="lg" onClick={() => onNav && onNav('connect', { mode: 'visit' })}>
              Be our guest <ArrowRight color="#fff" />
            </Button>
          </Reveal>
          <Reveal delay={150}>
            <div style={{ position: 'relative', aspectRatio: '1/1', borderRadius: 4, overflow: 'hidden' }}>
              <img
                src="assets/sunday-gathering.jpg"
                alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}

// ── MESSAGES preview ─────────────────────────────────────
function HomeMessages({ onNav }) {
  const { messages, loading } = useSermons();
  const preview = messages.slice(0, 3);

  return (
    <Section bg={BC.white} py={120}>
      <div data-bc-sectionhead style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 56, flexWrap: 'wrap', gap: 20 }}>
        <div>
          <Eyebrow>Recent Messages</Eyebrow>
          <h2 data-bc-h2 style={{ fontFamily: fontDisplay, fontSize: 56, fontWeight: 800, color: BC.navy, letterSpacing: '-0.025em', lineHeight: 1.05, maxWidth: 520 }}>
            Listen in.
          </h2>
        </div>
        <Button variant="outline" size="lg" onClick={() => onNav && onNav('messages')}>
          All messages <ArrowRight />
        </Button>
      </div>

      {loading && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {[0, 1, 2].map(i => (
            <div key={i} style={{ borderTop: `2px solid ${BC.border}`, paddingTop: 24 }}>
              <div style={{ aspectRatio: '16/10', background: BC.creamSubtle, borderRadius: 2, marginBottom: 20 }} />
              <div style={{ height: 10, background: BC.creamSubtle, borderRadius: 2, width: '50%', marginBottom: 14 }} />
              <div style={{ height: 18, background: BC.creamSubtle, borderRadius: 2, marginBottom: 8 }} />
              <div style={{ height: 10, background: BC.creamSubtle, borderRadius: 2, width: '35%' }} />
            </div>
          ))}
        </div>
      )}

      {!loading && preview.length > 0 && (
        <div data-bc-grid style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {preview.map((m, i) => (
            <Reveal key={m.id} delay={i * 80}>
              <div
                onClick={() => onNav && onNav('messages')}
                style={{ cursor: 'pointer', borderTop: `2px solid ${BC.navy}`, paddingTop: 24 }}
              >
                <div style={{
                  position: 'relative', aspectRatio: '16/10', borderRadius: 2, overflow: 'hidden',
                  background: BC.navyDark, marginBottom: 20,
                }}>
                  {m.thumb
                    ? <img src={m.thumb} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    : <img src={TOPO.navyOrange} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5 }} />
                  }
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(15,34,51,0) 40%, rgba(15,34,51,0.55) 100%)' }} />
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: 56, height: 56, borderRadius: '50%', background: BC.orange, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(0,0,0,0.25)' }}>
                      <svg width="18" height="22" viewBox="0 0 18 22" fill="white"><path d="M2 1l14 10L2 21V1z"/></svg>
                    </div>
                  </div>
                  {m.length && (
                    <div style={{ position: 'absolute', top: 12, left: 12, padding: '3px 8px', background: 'rgba(0,0,0,0.6)', color: BC.cream, fontFamily: fontDisplay, fontSize: 10, fontWeight: 600, letterSpacing: '0.1em' }}>
                      {m.length.toUpperCase()}
                    </div>
                  )}
                </div>
                <div style={{ fontFamily: fontDisplay, fontSize: 10, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: BC.orange, marginBottom: 10 }}>
                  Series · {m.series}
                </div>
                <div style={{ fontFamily: fontDisplay, fontSize: 22, fontWeight: 700, color: BC.navy, letterSpacing: '-0.01em', lineHeight: 1.2, marginBottom: 10 }}>
                  {m.title}
                </div>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap', fontFamily: fontBody, fontSize: 13, color: BC.navyMuted, fontWeight: 300 }}>
                  {m.passage && <span style={{ fontStyle: 'italic', color: BC.orange }}>{m.passage}</span>}
                  {m.passage && <span style={{ color: BC.border }}>·</span>}
                  <span>{m.date}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      )}
    </Section>
  );
}

// ── CTA band ─────────────────────────────────────────────
function HomeCTA({ onNav }) {
  return (
    <section style={{ background: BC.orange, padding: '80px 48px', position: 'relative', overflow: 'hidden' }}>
      <img src={TOPO.orange} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.35 }} />
      <div style={{ position: 'relative', zIndex: 2, maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 32 }}>
        <h2 style={{ fontFamily: fontDisplay, fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 800, color: BC.white, letterSpacing: '-0.02em', lineHeight: 1.05, maxWidth: 720 }}>
          Not sure where to start?<br/>
          <span style={{ color: BC.navy }}>Start with a conversation.</span>
        </h2>
        <Button variant="navy" size="xl" onClick={() => onNav && onNav('connect')}>
          Connect <ArrowRight color={BC.cream} />
        </Button>
      </div>
    </section>
  );
}

// ── HOMEPAGE assembly ────────────────────────────────────
function HomePage({ onNav, heroVariant = 'topo' }) {
  const Hero = heroVariant === 'photo' ? HeroPhoto : heroVariant === 'type' ? HeroType : HeroTopo;
  return (
    <>
      <Hero onNav={onNav} />
      <AboutPreview onNav={onNav} />
      <HomeHouseChurches onNav={onNav} />
      <HomeGatherings onNav={onNav} />
      <HomeMessages onNav={onNav} />
      <HomeCTA onNav={onNav} />
    </>
  );
}

Object.assign(window, { HomePage, HeroTopo, HeroPhoto, HeroType, HomeCTA });
