// Blacksburg Church — Give Page
// Online giving is processed by Planning Center Online (PCO) via the
// Church Center modal embed (script loaded in index.html <head>).
// Update this URL if PCO ever changes the church's giving subdomain.
const PCO_GIVING_URL = 'https://blacksburg-church-499851.churchcenter.com/giving';
const PCO_MODAL_URL  = `${PCO_GIVING_URL}?open-in-church-center-modal=true`;

function GivePage({ onNav }) {
  return (
    <>
      <div style={{ background: BC.navy, padding: '100px 48px 88px', position: 'relative', overflow: 'hidden' }}>
        <img src={TOPO.navyOrange} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.35 }} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 1200, margin: '0 auto' }}>
          <Eyebrow>Generosity</Eyebrow>
          <h1 style={{ fontFamily: fontDisplay, fontSize: 'clamp(52px, 8vw, 108px)', fontWeight: 800, color: BC.cream, letterSpacing: '-0.03em', lineHeight: 0.98, maxWidth: 900, marginBottom: 24 }}>
            Live <span style={{ fontStyle: 'italic', fontWeight: 300, color: BC.orange }}>radically.</span>
          </h1>
          <p style={{ fontFamily: fontBody, fontSize: 20, color: 'rgba(249,237,214,0.8)', lineHeight: 1.6, maxWidth: 620, fontWeight: 300 }}>
            Your giving helps equip all people to find and follow Jesus in Blacksburg and beyond.
          </p>
        </div>
      </div>

      <Section bg={BC.white} py={100}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: 80, alignItems: 'center' }}>
          <div>
            <Eyebrow>As a church</Eyebrow>
            <h2 style={{ fontFamily: fontDisplay, fontSize: 40, fontWeight: 800, color: BC.navy, letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: 24 }} data-comment-anchor="give-commitments-heading">
              We Practice Radical<br/>Generosity.
            </h2>
            <p style={{ fontFamily: fontBody, fontSize: 16, color: BC.navyMuted, lineHeight: 1.65, fontWeight: 300, marginBottom: 32, maxWidth: 480 }}>
              Radical generosity isn't just for the individuals who make up Blacksburg Church — it's something we do collectively, as a church. Two commitments are already in place:
            </p>
            {[
              {
                pct: '10%',
                title: 'Ministry partners.',
                body: 'The first 10% — before salaries, before space, before anything else — goes to ministries meeting needs in Jesus\u2019 name beyond our walls.',
              },
              {
                pct: '10%',
                title: 'Church planting.',
                body: 'On top of what goes to our ministry partners, an additional 10% is dedicated to planting new churches across the region.',
              },
            ].map((c, i) => (
              <div key={i} style={{
                paddingTop: 24, paddingBottom: 24,
                borderTop: i === 0 ? `1px solid ${BC.border}` : 'none',
                borderBottom: `1px solid ${BC.border}`,
              }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 18, marginBottom: 10, flexWrap: 'wrap' }}>
                  <div style={{ fontFamily: fontDisplay, fontSize: 28, fontWeight: 800, color: BC.orange, letterSpacing: '-0.02em', lineHeight: 1 }}>
                    {c.pct}
                  </div>
                  <div style={{ fontFamily: fontDisplay, fontSize: 22, fontWeight: 700, color: BC.navy, letterSpacing: '-0.01em', lineHeight: 1 }}>
                    {c.title}
                  </div>
                </div>
                <p style={{ fontFamily: fontBody, fontSize: 14, color: BC.navyMuted, lineHeight: 1.65, fontWeight: 300, margin: 0, maxWidth: 520 }}>
                  {c.body}
                </p>
              </div>
            ))}
          </div>

          <div style={{
            background: BC.navy, borderRadius: 8, padding: '56px 48px',
            position: 'relative', overflow: 'hidden',
          }}>
            <img src={TOPO.navyOrange} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.22 }} />
            <div style={{ position: 'relative', zIndex: 2 }}>
              <div style={{ fontFamily: fontDisplay, fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: BC.orange, marginBottom: 18 }}>
                Give online
              </div>
              <h3 style={{ fontFamily: fontDisplay, fontSize: 36, fontWeight: 800, color: BC.cream, letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: 18 }}>
                Generosity<br/>starts here.
              </h3>
              <p style={{ fontFamily: fontBody, fontSize: 16, color: 'rgba(249,237,214,0.78)', lineHeight: 1.65, fontWeight: 300, marginBottom: 32 }}>
                Every gift — whatever the size, however often — helps people find and follow Jesus in Blacksburg and beyond.
              </p>

              <a
                href={PCO_MODAL_URL}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 12,
                  background: BC.orange, color: BC.cream,
                  padding: '18px 32px', borderRadius: 4,
                  fontFamily: fontDisplay, fontSize: 14, fontWeight: 700,
                  letterSpacing: '0.12em', textTransform: 'uppercase',
                  textDecoration: 'none',
                }}
              >
                Give Now <ArrowRight color={BC.cream} />
              </a>

              <div style={{
                marginTop: 36, paddingTop: 24, borderTop: '1px solid rgba(249,237,214,0.15)',
              }}>
                <div style={{
                  fontFamily: fontDisplay, fontSize: 11, fontWeight: 600,
                  letterSpacing: '0.12em', textTransform: 'uppercase',
                  color: BC.orange, marginBottom: 8,
                }}>
                  Give by check
                </div>
                <p style={{
                  fontFamily: fontBody, fontSize: 14, fontWeight: 300,
                  color: 'rgba(249,237,214,0.85)', lineHeight: 1.6,
                }}>
                  Make payable to <span style={{ color: BC.cream, fontWeight: 600 }}>Blacksburg Church</span><br/>
                  125 North Main Street, Ste 500-118<br/>
                  Blacksburg, VA 24060
                </p>
              </div>

              <p style={{ fontFamily: fontBody, fontSize: 12, color: 'rgba(249,237,214,0.5)', marginTop: 28, lineHeight: 1.6 }}>
                Secured by Planning Center. Tax-deductible. Receipt sent by email.
              </p>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

Object.assign(window, { GivePage });
