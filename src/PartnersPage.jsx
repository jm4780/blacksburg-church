// Blacksburg Church — Ministry Partners Page

const PARTNERS = [
  {
    num: '01',
    name: 'Blue Ridge Christian Camp',
    short: 'Camp · Retreat · Ministry to Ministers',
    location: 'Blacksburg, Virginia',
    scope: 'Local',
    description: "A camp and retreat center in our backyard — where kids meet Jesus, families rest, and those in vocational ministry find renewal. We send our people to serve at camp weeks, work days, and as cabin counselors.",
    website: 'blueridgechristiancamp.org',
    color: '#2D6A4F',
    initials: 'BR',
  },
  {
    num: '02',
    name: 'Waypoint Church Partners',
    short: 'Catalyzing Kingdom Growth',
    location: 'Regional · Mid-Atlantic',
    scope: 'Regional',
    description: "Waypoint exists to plant new churches and strengthen established ones. They're the network behind Blacksburg Church — and a partner we're praying alongside as the Gospel goes further across the region.",
    website: 'waypointchurchpartners.org',
    color: '#1D3A4F',
    initials: 'WP',
  },
  {
    num: '03',
    name: 'Christ Church at Virginia Tech',
    short: 'College Ministry · Blacksburg',
    location: 'Virginia Tech',
    scope: 'Local',
    description: "A campus ministry discipling students at Virginia Tech. Hokies pass through Blacksburg for four years — Christ Church helps them leave knowing Jesus and ready to follow him for the next forty.",
    website: 'christchurchvt.org',
    color: '#861F41',
    initials: 'CC',
  },
];

function PartnerLogoPlaceholder({ partner, size = 64 }) {
  // Branded placeholder until real logo files are uploaded.
  return (
    <div style={{
      width: size, height: size, borderRadius: 6, flexShrink: 0,
      background: partner.color, color: BC.cream,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: fontDisplay, fontWeight: 800, fontSize: size * 0.42,
      letterSpacing: '-0.02em',
      boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.08)',
    }}>
      {partner.initials}
    </div>
  );
}

function PartnerCard({ partner }) {
  const [signupOpen, setSignupOpen] = React.useState(false);
  const [data, setData] = React.useState({ name: '', email: '', phone: '' });
  const [sent, setSent] = React.useState(false);
  const [sending, setSending] = React.useState(false);
  const [hover, setHover] = React.useState(false);
  const canSubmit = data.name.trim() && data.email.includes('@') && data.phone.trim();

  const submitSignup = async () => {
    if (!canSubmit) return;
    setSending(true);
    try {
      await fetch('/.netlify/functions/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name, email: data.email, phone: data.phone,
          formType: 'partner',
          context: { partner: partner.name },
        }),
      });
    } catch (_) {}
    setSending(false);
    setSent(true);
  };

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: BC.white,
        border: `1.5px solid ${signupOpen || sent ? BC.orange : (hover ? BC.navy : BC.border)}`,
        borderRadius: 4, padding: '28px 28px',
        transition: 'all 180ms',
        display: 'flex', gap: 20, alignItems: 'stretch',
      }}
    >
      <div style={{ width: 4, background: BC.orange, borderRadius: 2, flexShrink: 0 }} />

      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        {/* header row: N° + scope */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
          <div style={{ fontFamily: fontDisplay, fontSize: 10, fontWeight: 600, letterSpacing: '0.22em', color: BC.orange }}>
            N° {partner.num}
          </div>
          <div style={{ width: 4, height: 4, borderRadius: '50%', background: BC.border }} />
          <div style={{ fontFamily: fontDisplay, fontSize: 10, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: BC.navyMuted }}>
            {partner.scope}
          </div>
        </div>

        {/* logo + name */}
        <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', marginBottom: 14 }}>
          <PartnerLogoPlaceholder partner={partner} size={56} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: fontDisplay, fontSize: 22, fontWeight: 800, color: BC.navy, letterSpacing: '-0.015em', lineHeight: 1.15, marginBottom: 4 }}>
              {partner.name}
            </div>
            <div style={{ fontFamily: fontBody, fontSize: 12, color: BC.navyMuted, fontWeight: 400, lineHeight: 1.4 }}>
              {partner.short} · {partner.location}
            </div>
          </div>
        </div>

        <p style={{ fontFamily: fontBody, fontSize: 14, color: BC.navy, lineHeight: 1.6, fontWeight: 300, marginBottom: 18 }}>
          {partner.description}
        </p>

        <div style={{ marginTop: 'auto', paddingTop: 16, borderTop: `1px solid ${BC.border}`, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 14 }}>
          <a
            href={`https://${partner.website}`}
            target="_blank" rel="noreferrer"
            style={{
              fontFamily: fontDisplay, fontSize: 12, fontWeight: 600,
              letterSpacing: '0.04em', color: BC.navy, textDecoration: 'none',
              display: 'inline-flex', alignItems: 'center', gap: 6,
              borderBottom: `1.5px solid ${BC.navy}`, paddingBottom: 2,
            }}
            onMouseEnter={e => { e.currentTarget.style.color = BC.orange; e.currentTarget.style.borderColor = BC.orange; }}
            onMouseLeave={e => { e.currentTarget.style.color = BC.navy; e.currentTarget.style.borderColor = BC.navy; }}
          >
            {partner.website}
            <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
              <path d="M5 11L11 5M11 5H6M11 5V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>

          {!signupOpen && !sent && (
            <button
              onClick={() => setSignupOpen(true)}
              style={{
                background: 'none', border: 'none', padding: 0, cursor: 'pointer',
                fontFamily: fontDisplay, fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
                color: BC.orange, display: 'inline-flex', alignItems: 'center', gap: 8,
              }}
            >
              Stay connected <ArrowRight color={BC.orange} size={12} />
            </button>
          )}
        </div>

        {signupOpen && !sent && (
          <div style={{ marginTop: 18, paddingTop: 18, borderTop: `1px solid ${BC.border}` }}>
            <div style={{ fontFamily: fontDisplay, fontSize: 14, fontWeight: 700, color: BC.navy, marginBottom: 6, letterSpacing: '-0.01em' }}>
              Add me to the {partner.name} list
            </div>
            <p style={{ fontFamily: fontBody, fontSize: 13, color: BC.navyMuted, lineHeight: 1.55, fontWeight: 300, marginBottom: 14 }}>
              We'll pass along prayer needs, updates, and chances to serve as we hear them.
            </p>
            <div style={{ display: 'grid', gap: 10 }}>
              {[
                { label: 'Your name', key: 'name', placeholder: 'Jordan Smith' },
                { label: 'Email', key: 'email', placeholder: 'jordan@example.com' },
                { label: 'Phone', key: 'phone', placeholder: '(540) 555-1234' },
              ].map(f => (
                <div key={f.key}>
                  <label style={{ fontFamily: fontDisplay, fontSize: 10, fontWeight: 600, color: BC.navy, letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: 5 }}>{f.label}</label>
                  <input
                    value={data[f.key]}
                    onChange={e => setData(d => ({ ...d, [f.key]: e.target.value }))}
                    placeholder={f.placeholder}
                    style={{ fontFamily: fontBody, fontSize: 14, color: BC.navy, background: BC.white, border: `1.5px solid ${BC.border}`, borderRadius: 4, padding: '10px 12px', width: '100%', outline: 'none', boxSizing: 'border-box' }}
                    onFocus={e => e.target.style.borderColor = BC.navy}
                    onBlur={e => e.target.style.borderColor = BC.border}
                  />
                </div>
              ))}
            </div>
            <div style={{ marginTop: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
              <button
                onClick={() => setSignupOpen(false)}
                style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontFamily: fontDisplay, fontSize: 12, fontWeight: 600, color: BC.navyMuted, letterSpacing: '0.05em' }}
              >← Back</button>
              <Button
                variant="primary" size="sm"
                onClick={submitSignup}
                style={{ opacity: canSubmit ? 1 : 0.4, pointerEvents: canSubmit && !sending ? 'auto' : 'none' }}
              >
                {sending ? 'Sending…' : <><span>Submit</span> <ArrowRight color="#fff" /></>}
              </Button>
            </div>
          </div>
        )}

        {sent && (
          <div style={{ marginTop: 18, paddingTop: 18, borderTop: `1px solid ${BC.border}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: BC.orange, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><path d="M3 10l4 4 10-10" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <div style={{ fontFamily: fontDisplay, fontSize: 18, fontWeight: 800, color: BC.navy, letterSpacing: '-0.01em' }}>
                You're connected.
              </div>
            </div>
            <p style={{ fontFamily: fontBody, fontSize: 14, color: BC.navyMuted, lineHeight: 1.55, fontWeight: 300, margin: 0 }}>
              Our {partner.name} liaison will reach out shortly with what to pray for and how to plug in.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function PartnersPage({ onNav }) {
  const [scopeFilter, setScopeFilter] = React.useState('All');
  const visiblePartners = React.useMemo(
    () => scopeFilter === 'All' ? PARTNERS : PARTNERS.filter(p => p.scope === scopeFilter),
    [scopeFilter]
  );
  const [openFaq, setOpenFaq] = React.useState(0);

  const faqs = [
    {
      q: "Why partner instead of starting our own programs?",
      a: "Because so much of the Kingdom work that needs doing is already being done — well — by faithful people who've been at it for years. Rather than duplicate, we'd rather come alongside, support, and serve. It's stewardship of our people and our money.",
    },
    {
      q: "How do you choose ministry partners?",
      a: "We look for established ministries doing real Gospel work, locally and beyond. We have a team that prays, vets, and meets with leaders before we make an official decision to partner.",
    },
    {
      q: "How do I suggest a ministry to partner with?",
      a: (
        <>
          Have them reach out through our{' '}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); onNav && onNav('connect'); }}
            style={{ color: BC.orange, fontWeight: 600, textDecoration: 'none', borderBottom: `1.5px solid ${BC.orange}` }}
          >Get Connected</a>{' '}
          form and select &ldquo;We&rsquo;re a ministry seeking partnership.&rdquo; Our team will follow up to start the conversation.
        </>
      ),
    },
    {
      q: "What does it mean to be 'connected' to a partner?",
      a: "When you sign up, you're saying: this is a ministry I want to pray for and stay close to. A liaison from Blacksburg Church will pass along prayer requests, updates, and chances to serve as we hear them. It's not a commitment to anything — just a way of staying in the loop.",
    },
    {
      q: "Can I be connected to more than one?",
      a: "Yes. Sign up for as many as the Lord puts on your heart. The hope is that everyone at Blacksburg Church has at least one partner they're praying for and walking with.",
    },
    {
      q: "How is my giving used to support these partners?",
      a: "Ten percent of everything that comes in to Blacksburg Church goes back out the door to our ministry partners. It's our first commitment when we sit down to budget — before salaries, rent, or anything else.",
    },
  ];

  return (
    <>
      {/* HERO */}
      <div style={{ background: BC.navy, padding: '100px 48px 88px', position: 'relative', overflow: 'hidden' }}>
        <img src={TOPO.navyOrange} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4 }} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 1200, margin: '0 auto' }}>
          <Eyebrow>Ministry Partners</Eyebrow>
          <h1 style={{ fontFamily: fontDisplay, fontSize: 'clamp(52px, 8vw, 108px)', fontWeight: 800, color: BC.cream, letterSpacing: '-0.03em', lineHeight: 0.98, marginBottom: 24 }}>
            Meeting needs<br/><span style={{ fontStyle: 'italic', fontWeight: 300, color: BC.orange }}>in Jesus' name.</span>
          </h1>
          <p style={{ fontFamily: fontBody, fontSize: 20, color: 'rgba(249,237,214,0.8)', lineHeight: 1.6, maxWidth: 720, fontWeight: 300 }}>
            Our ministry partners are established ministries already meeting needs in Jesus' name — locally and around the world. We come alongside them with prayer, service, and generosity.
          </p>
        </div>
      </div>

      {/* PARTNERS GRID */}
      <section style={{ background: BC.white, padding: '100px 48px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div data-bc-partners-head style={{ marginBottom: 48, display: 'grid', gridTemplateColumns: '1fr auto', gap: 32, alignItems: 'end' }}>
            <div>
              <Eyebrow>Who we're partnered with</Eyebrow>
              <h2 style={{ fontFamily: fontDisplay, fontSize: 'clamp(38px, 5vw, 56px)', fontWeight: 800, color: BC.navy, letterSpacing: '-0.025em', lineHeight: 1.0, marginTop: 10, maxWidth: 760 }}>
                Meet our<br/><span style={{ fontStyle: 'italic', fontWeight: 300, color: BC.orange }}>ministry partners.</span>
              </h2>
            </div>
            <div style={{ fontFamily: fontBody, fontSize: 15, color: BC.navyMuted, fontWeight: 300, lineHeight: 1.6, maxWidth: 320 }}>
              Tap "Stay connected" on any partner to join their comms list — we'll pass along prayer needs and chances to serve.
            </div>
          </div>

          {/* Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32, flexWrap: 'wrap' }}>
            <div style={{ fontFamily: fontDisplay, fontSize: 10, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: BC.navyMuted, marginRight: 8 }}>Filter</div>
            {[{ key: 'All', label: 'All Partners' },{ key: 'Local', label: 'Local' },{ key: 'Regional', label: 'Regional' },{ key: 'Global', label: 'Global' }].map(f => {
              const active = scopeFilter === f.key;
              const count = f.key === 'All' ? PARTNERS.length : PARTNERS.filter(p => p.scope === f.key).length;
              return (
                <button key={f.key} onClick={() => setScopeFilter(f.key)}
                  style={{ fontFamily: fontDisplay, fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '10px 18px', borderRadius: 999, border: `1.5px solid ${active ? BC.navy : BC.border}`, background: active ? BC.navy : 'transparent', color: active ? BC.cream : BC.navy, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8, transition: 'all 180ms' }}>
                  <span>{f.label}</span>
                  <span style={{ fontSize: 10, color: active ? 'rgba(249,237,214,0.6)' : BC.navyMuted, fontWeight: 600 }}>{count}</span>
                </button>
              );
            })}
          </div>

          {visiblePartners.length === 0 ? (
            <div style={{ fontFamily: fontBody, fontSize: 16, color: BC.navyMuted, padding: '48px 24px', textAlign: 'center', border: `1px dashed ${BC.border}`, borderRadius: 6 }}>
              No {scopeFilter.toLowerCase()} partners listed yet.
            </div>
          ) : (
            <div data-bc-partners-grid style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 20, alignItems: 'start' }}>
              {visiblePartners.map(p => (
                <PartnerCard key={p.num} partner={p} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* MISSION FRAMING */}
      <section style={{ background: BC.creamSubtle, padding: '100px 48px', position: 'relative', overflow: 'hidden' }}>
        <img src={TOPO.cream} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.35, pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 80, alignItems: 'center' }}>
            <div>
              <Eyebrow>Why we partner</Eyebrow>
              <h2 style={{ fontFamily: fontDisplay, fontSize: 'clamp(38px, 5vw, 56px)', fontWeight: 800, color: BC.navy, letterSpacing: '-0.025em', lineHeight: 1.0, marginTop: 10, marginBottom: 24 }}>
                Stewardship over<br/><span style={{ fontStyle: 'italic', fontWeight: 300, color: BC.orange }}>duplication.</span>
              </h2>
            </div>
            <div>
              <p style={{ fontFamily: fontBody, fontSize: 19, color: BC.navy, lineHeight: 1.7, fontWeight: 300, marginBottom: 18 }}>
                Faithful people have been doing Kingdom work for a long time — locally, regionally, and around the world. Rather than start parallel programs, we'd rather lock arms with the ones already doing it well — pray for them, send people to serve with them, and put real money behind them.
              </p>
              <p style={{ fontFamily: fontBody, fontSize: 19, color: BC.navy, lineHeight: 1.7, fontWeight: 300 }}>
                Our hope is that every person at Blacksburg Church has a ministry partner they're connected to — praying for them regularly, serving with them when they can, and knowing their giving is helping that work go further.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW WE PARTNER */}
      <section style={{ background: BC.navy, padding: '100px 48px', position: 'relative', overflow: 'hidden' }}>
        <img src={TOPO.navy} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.3 }} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ marginBottom: 56, maxWidth: 760 }}>
            <Eyebrow>How we partner</Eyebrow>
            <h2 style={{ fontFamily: fontDisplay, fontSize: 'clamp(38px, 5vw, 56px)', fontWeight: 800, color: BC.cream, letterSpacing: '-0.025em', lineHeight: 1.0, marginTop: 10 }}>
              Three ways we lock arms.
            </h2>
          </div>

          <div data-bc-lockarms style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0, borderTop: '1px solid rgba(249,237,214,0.18)' }}>
            {[
              {
                tag: '01 · Prayer',
                head: 'Pray for them.',
                body: "When you connect with a partner, you'll get prayer needs as our liaison hears them — specific, current, no fluff.",
              },
              {
                tag: '02 · Service',
                head: 'Serve with them.',
                body: "We'll pass along chances to show up — at a work day, a serve event, a camp week — whenever a partner asks.",
              },
              {
                tag: '03 · Generosity',
                head: 'Practice generosity.',
                body: "Ten percent of everything given to Blacksburg Church goes back out the door to our partners. It's the first line in our budget.",
              },
            ].map((s, i, arr) => (
              <div key={i} style={{
                padding: '40px 32px 8px 32px',
                borderRight: i < arr.length - 1 ? '1px solid rgba(249,237,214,0.18)' : 'none',
                paddingLeft: i === 0 ? 0 : 32,
                paddingRight: i === arr.length - 1 ? 0 : 32,
              }}>
                <div style={{ fontFamily: fontDisplay, fontSize: 11, fontWeight: 700, letterSpacing: '0.22em', color: BC.orange, textTransform: 'uppercase', marginBottom: 24 }}>
                  {s.tag}
                </div>
                <h3 style={{ fontFamily: fontDisplay, fontSize: 34, fontWeight: 800, color: BC.cream, letterSpacing: '-0.02em', lineHeight: 1.05, marginBottom: 18 }}>
                  {s.head}
                </h3>
                <p style={{ fontFamily: fontBody, fontSize: 16, color: 'rgba(249,237,214,0.78)', lineHeight: 1.65, fontWeight: 300 }}>
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: BC.creamSubtle, padding: '100px 48px' }}>
        <div style={{ maxWidth: 920, margin: '0 auto' }}>
          <div style={{ marginBottom: 56 }}>
            <Eyebrow>Common questions</Eyebrow>
            <h2 style={{ fontFamily: fontDisplay, fontSize: 'clamp(38px, 5vw, 56px)', fontWeight: 800, color: BC.navy, letterSpacing: '-0.025em', lineHeight: 1.0, marginTop: 10 }}>
              Things people ask.
            </h2>
          </div>

          <div data-bc-partners-faq style={{ borderTop: `1px solid ${BC.border}` }}>
            {faqs.map((f, i) => {
              const open = openFaq === i;
              return (
                <div key={i} style={{ borderBottom: `1px solid ${BC.border}` }}>
                  <button
                    onClick={() => setOpenFaq(open ? -1 : i)}
                    style={{
                      width: '100%', background: 'transparent', border: 'none', cursor: 'pointer',
                      padding: '28px 0', textAlign: 'left',
                      display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 24,
                    }}
                  >
                    <span style={{ fontFamily: fontDisplay, fontSize: 22, fontWeight: 700, color: BC.navy, letterSpacing: '-0.01em', lineHeight: 1.3, flex: 1 }}>
                      {f.q}
                    </span>
                    <span style={{
                      flexShrink: 0, width: 32, height: 32, borderRadius: '50%',
                      background: open ? BC.orange : 'transparent',
                      border: `1.5px solid ${open ? BC.orange : BC.navy}`,
                      color: open ? BC.white : BC.navy,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'all 200ms',
                    }}>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d={open ? "M3 7h8" : "M3 7h8M7 3v8"} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                      </svg>
                    </span>
                  </button>
                  {open && (
                    <div style={{ paddingBottom: 28, paddingRight: 56 }}>
                      <p style={{ fontFamily: fontBody, fontSize: 17, color: BC.navyMuted, lineHeight: 1.7, fontWeight: 300, margin: 0 }}>
                        {f.a}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

    </>
  );
}

Object.assign(window, { PartnersPage });
