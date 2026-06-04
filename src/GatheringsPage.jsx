// Blacksburg Church — Sunday Gatherings Page

function GatheringsPage({ onNav }) {
  return (
    <>
      {/* HERO */}
      <div style={{ background: BC.navy, padding: '100px 48px 200px', position: 'relative', overflow: 'hidden' }}>
        <img src={TOPO.navyOrange} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.35 }} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 1200, margin: '0 auto' }}>
          <Eyebrow>Sunday Gatherings</Eyebrow>
          <h1 style={{ fontFamily: fontDisplay, fontSize: 'clamp(52px, 8vw, 108px)', fontWeight: 800, color: BC.cream, letterSpacing: '-0.03em', lineHeight: 0.98, maxWidth: 900, marginBottom: 24 }}>
            One church,<br /><span style={{ fontStyle: 'italic', fontWeight: 300, color: BC.orange }}>one gathering.</span>
          </h1>
          <p style={{ fontFamily: fontBody, fontSize: 20, color: 'rgba(249,237,214,0.8)', lineHeight: 1.6, maxWidth: 620, fontWeight: 300, marginBottom: 36 }}>
            Every Sunday we gather together to worship Jesus as one church, in one place, under one roof.
          </p>
          <Button variant="primary" size="lg" onClick={() => onNav && onNav('connect', { mode: 'visit' })}>
            Be our guest <ArrowRight color="#fff" />
          </Button>
        </div>
      </div>

      {/* DETAILS card */}
      <section style={{ background: BC.white, padding: '0 48px 40px' }}>
        <div style={{ maxWidth: 1200, margin: '-140px auto 0', position: 'relative', zIndex: 10 }}>
          <div style={{ background: BC.white, border: `1px solid ${BC.border}`, borderRadius: 4, padding: 48, boxShadow: '0 8px 32px rgba(15,34,51,0.1)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '0.85fr 1.5fr 1fr 1fr', gap: 0 }}>
              {[
              { label: 'When', value: 'Sundays', sub: '10:00am – 11:15am' },
              { label: 'Where', value: 'Blacksburg Public Library', sub: '200 Miller St, Blacksburg, VA 24060' },
              { label: 'Parking', value: 'Free lot', sub: 'Library parking lot + on-street' },
              { label: 'Kids', value: 'All welcome', sub: 'In the gathering with you' }].
              map((it, i) =>
              <div key={it.label} style={{ padding: '0 28px', borderLeft: i === 0 ? 'none' : `1px solid ${BC.border}` }}>
                  <div style={{ fontFamily: fontDisplay, fontSize: 10, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: BC.orange, marginBottom: 10 }}>{it.label}</div>
                  <div style={{ fontFamily: fontDisplay, fontSize: 22, fontWeight: 700, color: BC.navy, letterSpacing: '-0.015em', lineHeight: 1.15, marginBottom: 8, whiteSpace: 'nowrap' }}>{it.value}</div>
                  <div style={{ fontFamily: fontBody, fontSize: 13, color: BC.navyMuted, fontWeight: 300 }}>{it.sub}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* WHAT TO EXPECT */}
      <Section bg={BC.white} py={120}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 72, alignItems: 'start' }}>
          <div style={{ position: 'sticky', top: 100 }}>
            <Eyebrow>What to expect</Eyebrow>
            <h2 style={{ fontFamily: fontDisplay, fontSize: 56, fontWeight: 800, color: BC.navy, letterSpacing: '-0.025em', lineHeight: 1.05, marginBottom: 24 }}>
              About 75<br />honest minutes.
            </h2>
            <p style={{ fontFamily: fontBody, fontSize: 17, color: BC.navyMuted, lineHeight: 1.75, fontWeight: 300, marginBottom: 28 }}>Wear whatever's comfortable. Bring your coffee — there's more here when you run out.

            </p>
          </div>
          <div>
            {/* Arrive early lead-in */}
            <Reveal>
              <div style={{ background: BC.creamSubtle, border: `1px solid ${BC.creamDark}`, padding: '28px 32px', marginBottom: 48, display: 'flex', gap: 20, alignItems: 'center' }}>
                <div style={{ fontFamily: fontDisplay, fontSize: 11, fontWeight: 600, letterSpacing: '0.22em', color: BC.orange, writingMode: 'vertical-rl', transform: 'rotate(180deg)', flexShrink: 0 }}>
                  Before
                </div>
                <div style={{ width: 1, alignSelf: 'stretch', background: BC.creamDark }} />
                <div>
                  <h3 style={{ fontFamily: fontDisplay, fontSize: 22, fontWeight: 700, color: BC.navy, letterSpacing: '-0.015em', marginBottom: 8 }}>
                    Arrive early. Get coffee.
                  </h3>
                  <p style={{ fontFamily: fontBody, fontSize: 15, color: BC.navyMuted, lineHeight: 1.7, fontWeight: 300, margin: 0 }}>
                    People start filtering in about 15 minutes before the gathering. There's always a few people at the door to welcome you and show you where to go.
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Four things every week */}
            {[
            { num: '01', title: 'Songs.', body: 'We sing together — songs that worship Jesus. You don\'t have to sing. You don\'t have to know them. Listening counts.' },
            { num: '02', title: 'Scripture.', body: 'We read from the Bible out loud. Sometimes we sit with it in silence before anyone speaks as reflection is part of how we listen. The passage is always on the screen so you can follow along. Bring a Bible if you have one; if you don\'t, just ask — we\'ll get you one and help you find your way around it.' },
            { num: '03', title: 'Stories.', body: 'Each week, we share stories of the ways God is showing up in the lives of people in our church and through our ministry partners. Sometimes these stories are told in person, sometimes on video. The point is the same: to notice what God is doing, and to celebrate it together.' },
            { num: '04', title: 'Sermon.', body: 'One of our pastors (or a guest) preaches through a passage of Scripture for about 35 minutes. Sermons are meant to be understandable and practical, connecting what the Scriptures actually say to everyday life. The aim of every sermon is to preach the truth of the passage and point to Jesus.' },
            { num: '05', title: 'Silence.', body: 'We build space into every gathering just to be still — brief moments during worship, and a longer pause at the end after the sermon to pray, reflect, and respond before we close. No pressure to do anything with it but breathe.' }].
            map((s, i) =>
            <Reveal key={s.num} delay={i * 70}>
                <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr', gap: 28, paddingBottom: 36, paddingTop: i === 0 ? 0 : 36, borderTop: i === 0 ? 'none' : `1px solid ${BC.border}` }}>
                  <div style={{ fontFamily: fontDisplay, fontSize: 12, fontWeight: 700, color: BC.orange, letterSpacing: '0.18em', paddingTop: 10 }}>N° {s.num}</div>
                  <div>
                    <h3 style={{ fontFamily: fontDisplay, fontSize: 26, fontWeight: 700, color: BC.navy, letterSpacing: '-0.015em', marginBottom: 12 }}>{s.title}</h3>
                    <p style={{ fontFamily: fontBody, fontSize: 16, color: BC.navyMuted, lineHeight: 1.75, fontWeight: 300 }}>{s.body}</p>
                  </div>
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <section style={{ background: BC.creamSubtle, padding: '120px 48px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <Eyebrow>Common questions</Eyebrow>
          <h2 style={{ fontFamily: fontDisplay, fontSize: 48, fontWeight: 800, color: BC.navy, letterSpacing: '-0.025em', lineHeight: 1.05, marginBottom: 56 }}>
            A few things<br />people ask.
          </h2>
          <FAQList items={[
          { q: 'Do I need to believe in anything to come?', a: 'Nope. You\'re welcome whether you\'re a lifelong Christian, totally skeptical, or somewhere in between. Bring your questions.' },
          { q: 'What should I wear?', a: 'Whatever you\'re comfortable in. Some people wear jeans, some wear shorts, some wear flannels, some wear T-shirts. We don\'t care.' },
          { q: 'What about my kids?', a: 'Kids are genuinely welcome — all ages, right in the gathering with you. We don\'t have a separate kids\' program or nursery at our current location, but we\'ll have a few small things on hand to help keep little ones engaged.' },
          { q: 'Will I be singled out?', a: 'No. We won\'t ask visitors to stand up or introduce yourself. You can hang back as much as you want.' },
          { q: 'Is there anywhere to park?', a: 'Yes — the library\'s free lot, plus on-street parking nearby.' },
          { q: 'Can I just try a house church instead?', a: 'Absolutely — many people start there. Check the house church finder or ask us on the connect page.' }]
          } />
        </div>
      </section>

      <HomeCTA onNav={onNav} />
    </>);

}

function FAQList({ items }) {
  const [open, setOpen] = React.useState(0);
  return (
    <div style={{ borderTop: `1px solid ${BC.creamDark}` }}>
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={i} style={{ borderBottom: `1px solid ${BC.creamDark}` }}>
            <button
              onClick={() => setOpen(isOpen ? -1 : i)}
              style={{
                width: '100%', background: 'none', border: 'none', cursor: 'pointer',
                padding: '24px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                textAlign: 'left', gap: 24
              }}>
              
              <span style={{ fontFamily: fontDisplay, fontSize: 20, fontWeight: 600, color: BC.navy, letterSpacing: '-0.01em' }}>{it.q}</span>
              <span style={{
                width: 28, height: 28, borderRadius: '50%', background: isOpen ? BC.orange : 'transparent',
                border: `1.5px solid ${isOpen ? BC.orange : BC.navy}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 200ms', flexShrink: 0
              }}>
                <svg width="12" height="12" viewBox="0 0 12 12" style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0)', transition: 'transform 200ms' }}>
                  <path d="M6 1v10M1 6h10" stroke={isOpen ? BC.white : BC.navy} strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </span>
            </button>
            <div style={{
              maxHeight: isOpen ? 200 : 0, overflow: 'hidden',
              transition: 'max-height 300ms ease', paddingBottom: isOpen ? 24 : 0
            }}>
              <p style={{ fontFamily: fontBody, fontSize: 16, color: BC.navyMuted, lineHeight: 1.75, fontWeight: 300, maxWidth: 680 }}>{it.a}</p>
            </div>
          </div>);

      })}
    </div>);

}

Object.assign(window, { GatheringsPage, FAQList });