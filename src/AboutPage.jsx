// Blacksburg Church — About Page

const timeline = [
  { when: '2023',        title: 'Prayed for, dreamed about.',           body: 'A vision to see fully equipped followers of Jesus in every interstate neighborhood from Bristol to Salem starts taking shape at Chilhowie Christian Church.' },
  { when: 'Late 2024',  title: 'Blacksburg becomes the plan.',         body: 'What began as a general burden for the region becomes a specific calling — plant a church in Blacksburg.' },
  { when: 'Fall 2025',   title: 'Launch team begins to form.',                    body: 'A small group begins meeting on Wednesday nights in Blacksburg — praying, studying, and laying the groundwork for what\'s coming.' },
  { when: 'January 2026', title: 'First house churches and Sundays.',    body: 'Two house churches launch — one in Blacksburg, one in Christiansburg. Sunday gatherings begin meeting weekly.' },
  { when: 'Today',       title: 'Two house churches. One gathering.',    body: 'Early days. A real church taking root. More being prayed into being.' },
];

function AboutPage({ onNav }) {
  return (
    <>
      {/* HERO */}
      <div data-bc-pytall style={{ background: BC.navy, padding: '120px 48px 100px', position: 'relative', overflow: 'hidden' }}>
        <img src={TOPO.navyOrange} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.35, pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 1200, margin: '0 auto' }}>
          <Eyebrow>Who We Are</Eyebrow>
          <h1 data-bc-h1-xl style={{ fontFamily: fontDisplay, fontSize: 'clamp(56px, 9vw, 128px)', fontWeight: 800, color: BC.cream, letterSpacing: '-0.035em', lineHeight: 0.95, marginBottom: 32, maxWidth: 1000 }}>
            A church of<br/><span style={{ fontStyle: 'italic', fontWeight: 300, color: BC.orange }}>house churches.</span>
          </h1>
          <p style={{ fontFamily: fontBody, fontSize: 22, color: 'rgba(249,237,214,0.75)', lineHeight: 1.55, maxWidth: 880, fontWeight: 300 }}>
            One church made up of many fully functioning individual house churches, connected together by common oversight, identity, and mission.
          </p>
        </div>
      </div>

      {/* MISSION STATEMENT */}
      <Section bg={BC.white} py={120}>
        <div style={{ maxWidth: 880, margin: '0 auto', textAlign: 'center' }}>
          <Eyebrow style={{ justifyContent: 'center' }}>Our Mission</Eyebrow>
          <h2 style={{ fontFamily: fontDisplay, fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 700, color: BC.navy, letterSpacing: '-0.025em', lineHeight: 1.15, marginBottom: 32 }}>
            To equip <span style={{ fontStyle: 'italic', fontWeight: 400, color: BC.orange }}>all people</span> to find and follow Jesus.
          </h2>
          <p style={{ fontFamily: fontBody, fontSize: 19, color: BC.navyMuted, lineHeight: 1.75, fontWeight: 300 }}>
            That's it. That's our whole mission. Everything we do — the house churches, the Sunday gatherings, the ministry partnerships, and everything between is for this purpose. We believe Jesus is worth finding, and worth following, and that the best way to do that is with other people doing the same.
          </p>
        </div>
      </Section>

      {/* THREE PILLARS */}
      <section style={{ background: BC.navy, padding: '120px 48px', position: 'relative', overflow: 'hidden' }}>
        <img src={TOPO.navy} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.2 }} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 1200, margin: '0 auto' }}>
          <Eyebrow>How we gather</Eyebrow>
          <h2 data-bc-h2 style={{ fontFamily: fontDisplay, fontSize: 56, fontWeight: 800, color: BC.cream, letterSpacing: '-0.025em', lineHeight: 1.05, marginBottom: 72, maxWidth: 620 }}>
            Three things.<br/>That's it.
          </h2>
          <div data-bc-grid style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
            {[
              { num: '01', title: 'Sunday gatherings.', body: 'We gather to worship Jesus as one church, in one place, under one roof, every Sunday. These gatherings include sermons from the Bible, singing, sharing stories, silence, and scripture readings.' },
              { num: '02', title: 'House churches.', body: 'The rest of the week, we meet in homes across the New River Valley to eat, pray, discuss, and discover what it means to follow Jesus together. House Church creates space for everyone to know and be known, love and be loved, serve and be served.' },
              { num: '03', title: 'Ministry partnerships.', body: 'We\'re a small church, but we\'re not in this alone. We partner with others, locally and globally, who are meeting real needs in Jesus name to send, resource, and advance the gospel beyond our walls.' },
            ].map((b, i) => (
              <Reveal key={b.num} delay={i * 100}>
                <div style={{ paddingTop: 32, borderTop: `2px solid ${BC.orange}`, height: '100%' }}>
                  <div style={{ fontFamily: fontDisplay, fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', color: BC.orange, marginBottom: 24 }}>N° {b.num}</div>
                  <h3 style={{ fontFamily: fontDisplay, fontSize: 26, fontWeight: 700, color: BC.cream, letterSpacing: '-0.015em', lineHeight: 1.2, marginBottom: 16 }}>
                    {b.title}
                  </h3>
                  <p style={{ fontFamily: fontBody, fontSize: 16, color: 'rgba(249,237,214,0.75)', lineHeight: 1.75, fontWeight: 300 }}>
                    {b.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* It's Jesus' church */}
      <Section bg={BC.white} py={120}>
        <div style={{ maxWidth: 860, margin: '0 auto', textAlign: 'center' }}>
          <Eyebrow style={{ justifyContent: 'center' }}>Whose church is this?</Eyebrow>
          <h2 style={{ fontFamily: fontDisplay, fontSize: 'clamp(44px, 6vw, 76px)', fontWeight: 800, color: BC.navy, letterSpacing: '-0.03em', lineHeight: 1.0, marginBottom: 36 }}>
            Not ours.<br/><span style={{ fontStyle: 'italic', fontWeight: 300, color: BC.orange }}>His.</span>
          </h2>
          <p style={{ fontFamily: fontBody, fontSize: 19, color: BC.navyMuted, lineHeight: 1.75, fontWeight: 300 }}>
            You won't find a staff page here. Not because we don't believe in leadership (we do), but because we want to be clear that Blacksburg Church isn't anyone's personal ministry or platform. It's Jesus' church, made up of a lot of different people with a lot of different gifts, all playing a part in what he's doing here.
          </p>
          <div style={{ marginTop: 44, display: 'inline-flex', alignItems: 'center', gap: 12, padding: '12px 22px', background: BC.creamSubtle, border: `1px solid ${BC.border}`, borderRadius: 2 }}>
            <div style={{ fontFamily: fontDisplay, fontSize: 10, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: BC.orange }}>Want to meet someone?</div>
            <button onClick={() => onNav && onNav('connect')} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontFamily: fontDisplay, fontSize: 13, fontWeight: 700, color: BC.navy, letterSpacing: '0.02em' }}>
              Reach out →
            </button>
          </div>
        </div>
      </Section>

      {/* TIMELINE — how we got here */}
      <section style={{ background: BC.creamSubtle, padding: '120px 48px', position: 'relative', overflow: 'hidden' }}>
        <img src={TOPO.cream} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.35, pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 1100, margin: '0 auto' }}>

          {/* Header */}
          <div style={{ marginBottom: 80, maxWidth: 760 }}>
            <Eyebrow>How we got here</Eyebrow>
            <h2 style={{ fontFamily: fontDisplay, fontSize: 'clamp(48px, 7vw, 88px)', fontWeight: 800, color: BC.navy, letterSpacing: '-0.035em', lineHeight: 0.98, marginTop: 16 }}>
              A short<br/><span style={{ fontStyle: 'italic', fontWeight: 300, color: BC.orange }}>history.</span>
            </h2>
            <p style={{ fontFamily: fontBody, fontSize: 18, color: BC.navyMuted, lineHeight: 1.7, fontWeight: 300, marginTop: 28, maxWidth: 560 }}>
              We're new. Here's how this church came to be — the praying, the planning, and the small moments that added up to a launch.
            </p>
          </div>

          {/* Vertical timeline */}
          <div style={{ position: 'relative', paddingLeft: 40 }}>
            {/* spine */}
            <div style={{
              position: 'absolute', left: 8, top: 6, bottom: 6, width: 2,
              background: `linear-gradient(180deg, ${BC.orange} 0%, ${BC.creamDark} 100%)`,
            }} />

            {timeline.map((t, i) => (
              <Reveal key={t.when} delay={i * 80}>
                <div style={{
                  position: 'relative', paddingBottom: i === timeline.length - 1 ? 0 : 48,
                }}>
                  {/* dot */}
                  <div style={{
                    position: 'absolute', left: -39, top: 6,
                    width: 18, height: 18, borderRadius: '50%',
                    background: i === timeline.length - 1 ? BC.orange : BC.cream,
                    border: `2px solid ${BC.orange}`,
                  }} />
                  <div style={{ fontFamily: fontDisplay, fontSize: 11, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: BC.orange, marginBottom: 10 }}>
                    {t.when}
                  </div>
                  <h3 style={{ fontFamily: fontDisplay, fontSize: 28, fontWeight: 700, color: BC.navy, letterSpacing: '-0.015em', lineHeight: 1.2, marginBottom: 10, maxWidth: 640 }}>
                    {t.title}
                  </h3>
                  <p style={{ fontFamily: fontBody, fontSize: 16, color: BC.navyMuted, lineHeight: 1.7, fontWeight: 300, maxWidth: 640 }}>
                    {t.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <HomeCTA onNav={onNav} />
    </>
  );
}

Object.assign(window, { AboutPage });
