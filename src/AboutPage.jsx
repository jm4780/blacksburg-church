// Blacksburg Church — About Page

const timeline = [
{ when: '2023', title: 'Prayed for, dreamed about.', body: 'A vision to see fully equipped followers of Jesus in every interstate neighborhood from Bristol to Salem starts taking shape at Chilhowie Christian Church.' },
{ when: 'Late 2024', title: 'Blacksburg becomes the plan.', body: 'What began as a general burden for the region becomes a specific calling — plant a church in Blacksburg.' },
{ when: 'Fall 2025', title: 'Launch team begins to form.', body: 'A small group begins meeting on Wednesday nights in Blacksburg — praying, studying, and laying the groundwork for what\'s coming.' },
{ when: 'January 2026', title: 'First house churches and Sundays.', body: 'Two house churches launch — one in Blacksburg, one in Christiansburg. Sunday gatherings begin meeting weekly.' },
{ when: 'Today', title: 'Two house churches. One gathering.', body: 'Early days. A real church taking root. More being prayed into being.' }];

const ABOUT_THREE_DS = [
  {
    index: '01',
    word: 'Distributed',
    qualifier: 'pastoral leadership.',
    body:
      'Every member pastored by someone they actually know — a called and qualified leader from within their own community. Not a remote figure. A present one. Someone who knows you, cares for you, and is there when life gets hard.',
    scripture: 'Titus 1:5–9 · Acts 14:23',
  },
  {
    index: '02',
    word: 'Diverse',
    qualifier: 'discipleship communities.',
    body:
      'Communities that look like the kingdom — diverse generationally, socioeconomically, culturally, ethnically, and in spiritual maturity. Not sorted by age or stage, but woven together. People pouring into each other, learning from each other, growing because of each other.',
    scripture: 'Titus 2:3–5 · Hebrews 10:24–25 · Acts 4:32–35',
  },
  {
    index: '03',
    word: 'Decentralized',
    qualifier: 'from primary place and pastor.',
    body:
      'A church whose life is never concentrated in one location or dependent on one leader. Whose vitality is distributed across every home, every neighborhood, and every person who calls Blacksburg Church home.',
    scripture: '1 Corinthians 6:19 · 1 Peter 2:9 · Titus 1:5',
  },
];


function AboutPage({ onNav }) {
  return (
    <>
      {/* HERO */}
      <div data-bc-pytall style={{ background: BC.navy, padding: '100px 48px 88px', position: 'relative', overflow: 'hidden' }}>
        <img src={TOPO.navyOrange} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.35, pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 1200, margin: '0 auto' }}>
          <Eyebrow>Who We Are</Eyebrow>
          <h1 data-bc-h1-xl style={{ fontFamily: fontDisplay, fontSize: 'clamp(52px, 8vw, 108px)', fontWeight: 800, color: BC.cream, letterSpacing: '-0.03em', lineHeight: 0.98, marginBottom: 24, maxWidth: 1000 }}>
            A church of<br /><span style={{ fontStyle: 'italic', fontWeight: 300, color: BC.orange }}>house churches.</span>
          </h1>
          <p style={{ fontFamily: fontBody, fontSize: 20, color: 'rgba(249,237,214,0.8)', lineHeight: 1.6, maxWidth: 680, fontWeight: 300 }}>
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
          <Eyebrow>We keep it simple</Eyebrow>
          <h2 data-bc-h2 style={{ fontFamily: fontDisplay, fontSize: 56, fontWeight: 800, color: BC.cream, letterSpacing: '-0.025em', lineHeight: 1.05, marginBottom: 72, maxWidth: 620 }}>
            Three things.<br />That's it.
          </h2>
          <div data-bc-grid style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
            {[
            { num: '01', title: 'Sunday gatherings.', body: 'We gather to worship Jesus as one church, in one place, under one roof, every Sunday. These gatherings include sermons from the Bible, singing, sharing stories, silence, and scripture readings.' },
            { num: '02', title: 'House churches.', body: 'The rest of the week, we meet in homes across the New River Valley to eat, pray, discuss, and discover what it means to follow Jesus together. House Church creates space for everyone to know and be known, love and be loved, serve and be served.' },
            { num: '03', title: 'Ministry partnerships.', body: 'We\'re a small church, but we\'re not in this alone. We partner with others, locally and globally, who are meeting real needs in Jesus name to send, resource, and advance the gospel beyond our walls.' }].
            map((b, i) =>
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
            )}
          </div>
        </div>
      </section>

      {/* E-DNA — Our Ecclesiological DNA */}
      <section style={{ background: BC.creamSubtle, padding: '120px 48px', position: 'relative', overflow: 'hidden' }}>
        <img src={TOPO.cream} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.32, pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 1200, margin: '0 auto' }}>

          {/* Header block */}
          <div style={{ maxWidth: 960, marginBottom: 72 }}>
            <Eyebrow>What makes us different</Eyebrow>
            <h2 style={{ fontFamily: fontDisplay, fontSize: 'clamp(44px, 6.5vw, 88px)', fontWeight: 800, color: BC.navy, letterSpacing: '-0.035em', lineHeight: 0.98, marginBottom: 36 }}>
              Designed to<br /><span style={{ fontStyle: 'italic', fontWeight: 300, color: BC.orange }}>multiply.</span>
            </h2>
            <p style={{ fontFamily: fontBody, fontSize: 22, color: BC.navy, lineHeight: 1.55, fontWeight: 400, marginBottom: 18 }}>
              We're in pursuit of becoming what Jesus originally intended his church to be, and we believe the clearest place to discover that is in the early churches of Scripture. Across them, three elements consistently emerge—and we're convinced these three are key to a multiplying movement.
            </p>
          </div>

          {/* 3 Ds — three columns */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 40 }}>
            {ABOUT_THREE_DS.map((d, i) => (
              <Reveal key={d.word} delay={i * 80}>
                <div style={{
                  paddingTop: 32,
                  borderTop: `2px solid ${BC.orange}`,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}>
                  <div style={{
                    fontFamily: fontDisplay,
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: '0.22em',
                    color: BC.orange,
                    marginBottom: 28,
                  }}>
                    N° {d.index}
                  </div>

                  <h3 style={{
                    fontFamily: fontDisplay,
                    fontSize: 'clamp(28px, 3.2vw, 40px)',
                    fontWeight: 800,
                    color: BC.navy,
                    letterSpacing: '-0.025em',
                    lineHeight: 1.0,
                    marginBottom: 8,
                  }}>
                    {d.word}.
                  </h3>
                  <div style={{
                    fontFamily: fontDisplay,
                    fontSize: 17,
                    fontWeight: 400,
                    fontStyle: 'italic',
                    color: BC.orange,
                    letterSpacing: '-0.005em',
                    lineHeight: 1.3,
                    marginBottom: 22,
                  }}>
                    {d.qualifier}
                  </div>

                  <p style={{
                    fontFamily: fontBody,
                    fontSize: 16,
                    color: BC.navyMuted,
                    lineHeight: 1.75,
                    fontWeight: 300,
                    marginBottom: 24,
                    flex: 1,
                  }}>
                    {d.body}
                  </p>

                  <div style={{
                    fontFamily: fontDisplay,
                    fontSize: 10,
                    fontWeight: 600,
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    color: BC.orange,
                    paddingTop: 16,
                    borderTop: `1px solid ${BC.border}`,
                  }}>
                    {d.scripture}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* It's Jesus' church */}
      <Section bg={BC.white} py={120}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div style={{ textAlign: 'center' }}>
            <Eyebrow style={{ justifyContent: 'center' }}>Leadership</Eyebrow>
            <h2 style={{ fontFamily: fontDisplay, fontSize: 'clamp(44px, 6vw, 76px)', fontWeight: 800, color: BC.navy, letterSpacing: '-0.03em', lineHeight: 1.0, marginBottom: 36 }}>
              Many hands.<br /><span style={{ fontStyle: 'italic', fontWeight: 300, color: BC.orange }}>One mission.</span>
            </h2>
            <p style={{ fontFamily: fontBody, fontSize: 19, color: BC.navyMuted, lineHeight: 1.75, fontWeight: 300 }}>Blacksburg Church operates through decentralized leadership — distributed to many via house church pastors and ministry leaders, with a small overseeing and supporting team.

            </p>
          </div>

          <div style={{
            marginTop: 48,
            display: 'flex', justifyContent: 'center'
          }}>
            <Button variant="primary" size="lg" onClick={() => onNav && onNav('connect')}>
              Get connected <ArrowRight color="#fff" />
            </Button>
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
              A short<br /><span style={{ fontStyle: 'italic', fontWeight: 300, color: BC.orange }}>history.</span>
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
              background: `linear-gradient(180deg, ${BC.orange} 0%, ${BC.creamDark} 100%)`
            }} />

            {timeline.map((t, i) =>
            <Reveal key={t.when} delay={i * 80}>
                <div style={{
                position: 'relative', paddingBottom: i === timeline.length - 1 ? 0 : 48
              }}>
                  {/* dot */}
                  <div style={{
                  position: 'absolute', left: -39, top: 6,
                  width: 18, height: 18, borderRadius: '50%',
                  background: i === timeline.length - 1 ? BC.orange : BC.cream,
                  border: `2px solid ${BC.orange}`
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
            )}
          </div>

          {/* Quiet link to the Vision page — picks up where the timeline leaves off */}
          <Reveal delay={120}>
            <div style={{
              marginTop: 72,
              paddingTop: 40,
              borderTop: `1px solid ${BC.creamDark}`,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 24,
            }}>
              <div style={{ maxWidth: 560 }}>
                <div style={{ fontFamily: fontDisplay, fontSize: 11, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: BC.orange, marginBottom: 10 }}>
                  What's next
                </div>
                <h3 style={{ fontFamily: fontDisplay, fontSize: 28, fontWeight: 700, color: BC.navy, letterSpacing: '-0.015em', lineHeight: 1.2 }}>
                  Where this is going.
                </h3>
              </div>
              <button
                onClick={() => onNav && onNav('vision')}
                style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: fontDisplay,
                  fontSize: 15,
                  fontWeight: 600,
                  color: BC.navy,
                  letterSpacing: '0.04em',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: 0,
                  textDecoration: 'underline',
                  textUnderlineOffset: 6,
                  textDecorationColor: BC.orange,
                  textDecorationThickness: '2px',
                }}
              >
                Read our vision <ArrowRight color={BC.orange} />
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <HomeCTA onNav={onNav} />
    </>);

}

Object.assign(window, { AboutPage });