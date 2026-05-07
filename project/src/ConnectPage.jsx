// Blacksburg Church — Connect Page (multi-step I'm new form)

const STEPS = [
  { key: 'intro',        title: 'Hi. Let\'s start simple.',       sub: 'Just a few questions so we know how to help.' },
  { key: 'situation',    title: 'What brings you here?',          sub: 'Pick whatever fits. You can change your mind later.' },
  { key: 'location',     title: 'Where do you live?',             sub: 'We\'ll match you with a house church nearby.' },
  { key: 'preferences',  title: 'Any preferences?',               sub: 'Totally optional. Skip if you\'d rather.' },
  { key: 'contact',      title: 'How should we reach you?',       sub: 'A human will follow up within a few days. No mass emails.' },
  { key: 'done',         title: 'You\'re in.',                    sub: 'We\'ll be in touch soon.' },
];

const SITUATIONS = [
  { id: 'curious',   label: 'I\'m curious about Jesus.',          sub: 'No church background required.' },
  { id: 'exploring', label: 'I\'m exploring whether I believe.',  sub: 'Questions and skepticism welcome.' },
  { id: 'following', label: 'I\'m already a Christian.',          sub: 'Looking for community.' },
  { id: 'new-town',  label: 'I just moved to the area.',          sub: 'Need a new church home.' },
  { id: 'other',     label: 'Something else.',                    sub: 'Tell us on the last step.' },
];

const PREFS = [
  { id: 'sundays',    label: 'Sundays work best' },
  { id: 'weeknights', label: 'Weeknights work best' },
  { id: 'walking',    label: 'Walking distance matters' },
  { id: 'kids',       label: 'Bringing kids' },
  { id: 'newcomer',   label: 'First time at a church like this' },
  { id: 'skeptical',  label: 'Coming with questions / doubts' },
];

function ConnectPage({ onNav }) {
  const [step, setStep] = React.useState(0);
  const [data, setData] = React.useState({ situation: '', neighborhood: '', prefs: [], name: '', email: '', phone: '', note: '' });

  const next = () => setStep(s => Math.min(STEPS.length - 1, s + 1));
  const back = () => setStep(s => Math.max(0, s - 1));
  const togglePref = (id) => setData(d => ({ ...d, prefs: d.prefs.includes(id) ? d.prefs.filter(p => p !== id) : [...d.prefs, id] }));

  const currentStep = STEPS[step];
  const progress = (step / (STEPS.length - 1)) * 100;

  const canAdvance = {
    0: true,
    1: !!data.situation,
    2: !!data.neighborhood,
    3: true,
    4: data.name && data.email,
    5: false,
  }[step];

  return (
    <>
      <div style={{ background: BC.cream, padding: '80px 48px 60px', position: 'relative', overflow: 'hidden' }}>
        <img src={TOPO.creamOrange} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.35 }} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 1200, margin: '0 auto' }}>
          <Eyebrow>I'm new</Eyebrow>
          <h1 style={{ fontFamily: fontDisplay, fontSize: 'clamp(48px, 7vw, 96px)', fontWeight: 800, color: BC.navy, letterSpacing: '-0.03em', lineHeight: 0.98, maxWidth: 900, marginBottom: 20 }}>
            Come as you are.
          </h1>
          <p style={{ fontFamily: fontBody, fontSize: 19, color: BC.navyMuted, lineHeight: 1.6, maxWidth: 600, fontWeight: 300 }}>
            No pressure. No expectations. We'll meet you wherever you are.
          </p>
        </div>
      </div>

      <section style={{ background: BC.creamSubtle, padding: '48px 48px 100px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          {/* Progress */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <div style={{ fontFamily: fontDisplay, fontSize: 11, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: BC.orange }}>
                Step {Math.min(step + 1, STEPS.length - 1)} of {STEPS.length - 1}
              </div>
              <div style={{ fontFamily: fontDisplay, fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: BC.navyMuted }}>
                Takes about 90 seconds
              </div>
            </div>
            <div style={{ height: 3, background: BC.creamDark, borderRadius: 2 }}>
              <div style={{ height: '100%', width: `${progress}%`, background: BC.orange, borderRadius: 2, transition: 'width 400ms' }} />
            </div>
          </div>

          <div style={{ background: BC.white, border: `1px solid ${BC.border}`, borderRadius: 4, padding: 48, minHeight: 480 }}>
            <h2 style={{ fontFamily: fontDisplay, fontSize: 40, fontWeight: 800, color: BC.navy, letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: 14 }}>
              {currentStep.title}
            </h2>
            <p style={{ fontFamily: fontBody, fontSize: 17, color: BC.navyMuted, lineHeight: 1.65, marginBottom: 36, fontWeight: 300 }}>
              {currentStep.sub}
            </p>

            {step === 0 && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 8 }}>
                {[
                  { num: '01', label: 'Situation' },
                  { num: '02', label: 'Location' },
                  { num: '03', label: 'Contact' },
                ].map(p => (
                  <div key={p.num} style={{ padding: 20, border: `1px solid ${BC.border}`, borderRadius: 4, background: BC.creamSubtle }}>
                    <div style={{ fontFamily: fontDisplay, fontSize: 10, fontWeight: 600, letterSpacing: '0.2em', color: BC.orange, marginBottom: 10 }}>N° {p.num}</div>
                    <div style={{ fontFamily: fontDisplay, fontSize: 16, fontWeight: 700, color: BC.navy }}>{p.label}</div>
                  </div>
                ))}
              </div>
            )}

            {step === 1 && (
              <div style={{ display: 'grid', gap: 10 }}>
                {SITUATIONS.map(s => (
                  <button
                    key={s.id}
                    onClick={() => { setData(d => ({ ...d, situation: s.id })); setTimeout(next, 200); }}
                    style={{
                      textAlign: 'left', padding: '20px 24px', cursor: 'pointer',
                      background: data.situation === s.id ? BC.navy : BC.white,
                      color: data.situation === s.id ? BC.cream : BC.navy,
                      border: `1.5px solid ${data.situation === s.id ? BC.navy : BC.border}`,
                      borderRadius: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16,
                      transition: 'all 150ms',
                    }}
                  >
                    <div>
                      <div style={{ fontFamily: fontDisplay, fontSize: 17, fontWeight: 700, letterSpacing: '-0.01em', marginBottom: 4 }}>{s.label}</div>
                      <div style={{ fontFamily: fontBody, fontSize: 13, color: data.situation === s.id ? 'rgba(249,237,214,0.7)' : BC.navyMuted, fontWeight: 300 }}>{s.sub}</div>
                    </div>
                    <ArrowRight color={data.situation === s.id ? BC.orange : BC.navyMuted} />
                  </button>
                ))}
              </div>
            )}

            {step === 2 && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
                {['Downtown Blacksburg', 'Prices Fork', 'Virginia Tech', 'Hethwood', 'Christiansburg', 'Radford', 'Elsewhere in NRV', 'Not sure yet'].map(n => (
                  <button
                    key={n}
                    onClick={() => { setData(d => ({ ...d, neighborhood: n })); }}
                    style={{
                      textAlign: 'left', padding: '16px 18px', cursor: 'pointer',
                      background: data.neighborhood === n ? BC.navy : BC.white,
                      color: data.neighborhood === n ? BC.cream : BC.navy,
                      border: `1.5px solid ${data.neighborhood === n ? BC.navy : BC.border}`,
                      borderRadius: 4, fontFamily: fontDisplay, fontSize: 14, fontWeight: 600,
                    }}
                  >{n}</button>
                ))}
              </div>
            )}

            {step === 3 && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
                {PREFS.map(p => (
                  <button
                    key={p.id}
                    onClick={() => togglePref(p.id)}
                    style={{
                      textAlign: 'left', padding: '16px 18px', cursor: 'pointer',
                      background: data.prefs.includes(p.id) ? BC.navy : BC.white,
                      color: data.prefs.includes(p.id) ? BC.cream : BC.navy,
                      border: `1.5px solid ${data.prefs.includes(p.id) ? BC.navy : BC.border}`,
                      borderRadius: 4, fontFamily: fontDisplay, fontSize: 14, fontWeight: 600,
                      display: 'flex', alignItems: 'center', gap: 10,
                    }}
                  >
                    <span style={{
                      width: 16, height: 16, border: `1.5px solid ${data.prefs.includes(p.id) ? BC.orange : BC.border}`,
                      background: data.prefs.includes(p.id) ? BC.orange : 'transparent',
                      borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      {data.prefs.includes(p.id) && <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1 5l3 3 5-6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                    </span>
                    {p.label}
                  </button>
                ))}
              </div>
            )}

            {step === 4 && (
              <div style={{ display: 'grid', gap: 16 }}>
                {[
                  { label: 'Your name', key: 'name', placeholder: 'Jordan Smith' },
                  { label: 'Email', key: 'email', placeholder: 'jordan@example.com' },
                  { label: 'Phone (optional)', key: 'phone', placeholder: '(540) 555-1234' },
                ].map(f => (
                  <div key={f.key}>
                    <label style={{ fontFamily: fontDisplay, fontSize: 11, fontWeight: 600, color: BC.navy, letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>{f.label}</label>
                    <input
                      value={data[f.key]}
                      onChange={e => setData(d => ({ ...d, [f.key]: e.target.value }))}
                      placeholder={f.placeholder}
                      style={{ fontFamily: fontBody, fontSize: 15, color: BC.navy, background: BC.white, border: `1.5px solid ${BC.border}`, borderRadius: 4, padding: '12px 14px', width: '100%', outline: 'none' }}
                      onFocus={e => e.target.style.borderColor = BC.navy}
                      onBlur={e => e.target.style.borderColor = BC.border}
                    />
                  </div>
                ))}
                <div>
                  <label style={{ fontFamily: fontDisplay, fontSize: 11, fontWeight: 600, color: BC.navy, letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Anything else?</label>
                  <textarea
                    value={data.note}
                    onChange={e => setData(d => ({ ...d, note: e.target.value }))}
                    placeholder="Questions, concerns, things we should know..."
                    style={{ fontFamily: fontBody, fontSize: 15, color: BC.navy, background: BC.white, border: `1.5px solid ${BC.border}`, borderRadius: 4, padding: '12px 14px', width: '100%', outline: 'none', minHeight: 90, resize: 'vertical' }}
                  />
                </div>
              </div>
            )}

            {step === 5 && (
              <div style={{ textAlign: 'center', padding: '24px 0' }}>
                <img src="assets/emblem-navy-orange.png" alt="" style={{ width: 64, marginBottom: 28 }} />
                <p style={{ fontFamily: fontBody, fontSize: 17, color: BC.navyMuted, lineHeight: 1.7, fontWeight: 300, maxWidth: 480, margin: '0 auto 24px' }}>
                  Thanks, <strong style={{ color: BC.navy }}>{data.name.split(' ')[0] || 'friend'}</strong>. Someone from Blacksburg Church will reach out within a few days. Check your email.
                </p>
                <Button variant="navy" onClick={() => onNav && onNav('home')}>Back to home</Button>
              </div>
            )}

            {step > 0 && step < 5 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 40, paddingTop: 28, borderTop: `1px solid ${BC.border}` }}>
                <button onClick={back} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: fontDisplay, fontSize: 13, fontWeight: 600, color: BC.navyMuted, letterSpacing: '0.05em', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  ← Back
                </button>
                <Button
                  variant="primary" size="md"
                  onClick={step === 4 ? () => { setStep(5); } : next}
                  style={{ opacity: canAdvance ? 1 : 0.4, pointerEvents: canAdvance ? 'auto' : 'none' }}
                >
                  {step === 4 ? 'Submit' : 'Continue'} <ArrowRight color="#fff" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

Object.assign(window, { ConnectPage });
