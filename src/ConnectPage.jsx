// Blacksburg Church — Connect form (shared body) + Connect page wrapper

const CONNECT_MODES = {
  connect: {
    eyebrow: 'Connect',
    h1: 'Let\u2019s get you connected.',
    sub: 'Tell us a little about you so we can point you toward a next step that actually fits and connect you with the right people.',
    duration: '\u2248 90 seconds',
    intro: {
      lead: '',
      body: '',
    },
    steps: [
      { key: 'intro',       title: 'Ready when you are.',           sub: 'Five quick steps. About 90 seconds.' },
      { key: 'situation',   title: 'Where you\u2019re at.',         sub: 'Pick whatever fits. You can change your mind later.' },
      { key: 'preferences', title: 'What can we help with?',        sub: 'Pick anything that applies — this tells us what next steps would actually help.' },
      { key: 'location',    title: 'Where do you live?',            sub: 'Pick the closest one. We\u2019ll go from there.' },
      { key: 'contact',     title: 'How should we reach you?',      sub: 'A real person will follow up soon.' },
      { key: 'done',        title: 'Thanks for reaching out.',      sub: 'Someone from our team will be in touch soon.' },
    ],
    options: [
      { id: 'curious',   label: 'I\u2019m curious about Jesus.',         sub: 'New to all this.' },
      { id: 'figuring',  label: 'I\u2019m still figuring out what I believe.', sub: 'Bringing my questions.' },
      { id: 'used-to',   label: 'I used to believe.',                    sub: 'Open to revisiting it.' },
      { id: 'following', label: 'I follow Jesus.',                      sub: 'Looking for community.' },
      { id: 'new-town',  label: 'I\u2019m new to the area.',             sub: 'Need a new church home.' },
      { id: 'other',     label: 'Something else.',                       sub: 'I\u2019ll explain.' },
    ],
    confirm: (name) => `Thanks, ${name || 'friend'}. Someone from Blacksburg Church will reach out within a few days. Check your email.`,
  },
  visit: {
    eyebrow: 'Plan your visit',
    h1: 'Be our guest.',
    sub: 'Planning to join us on a Sunday morning? Tell us you\u2019re coming so we can host you well.',
    duration: '\u2248 60 seconds',
    intro: {
      lead: '',
      body: '',
    },
    steps: [
      { key: 'intro',       title: 'We\u2019d love to host you.', sub: 'Tell us you\u2019re coming and we\u2019ll be ready when you arrive — someone to say hello, a seat saved, and a few less unknowns on your first Sunday.' },
      { key: 'situation',   title: 'Which Sunday?',               sub: 'We gather Sundays at 10am at the Blacksburg Public Library.' },
      { key: 'location',    title: 'Who\u2019s coming?',          sub: 'Helps our hospitality team know how to welcome you well.' },
      { key: 'preferences', title: 'Where do you live?',          sub: 'Pick the closest one. We\u2019ll go from there.' },
      { key: 'contact',     title: 'How should we reach you?',    sub: 'We\u2019ll send a short note before Sunday.' },
      { key: 'done',        title: 'See you Sunday.',             sub: 'We\u2019ll be looking for you.' },
    ],
    options: [
      { id: 'this-sunday', label: 'This Sunday.',         sub: 'See you in a few days.' },
      { id: 'next-sunday', label: 'Next Sunday.',         sub: 'Plenty of time to plan.' },
      { id: 'few-weeks',   label: 'Within the next few weeks.', sub: 'We\u2019ll keep an eye out.' },
      { id: 'flexible',    label: 'Not sure yet.',        sub: 'No problem — come whenever works.' },
    ],
    confirm: (name) => `Thanks, ${name || 'friend'}. We\u2019ll be looking for you on Sunday. Watch your email for a short note before then.`,
  },
  host: {
    eyebrow: 'Host a house church',
    h1: 'Open your home.',
    sub: 'Do you have the gift of hospitality? Here\u2019s how we define hospitality: you love having people in your home, and people love being in your home. This has nothing to do with the size or quality of your home — it\u2019s a God-given gift to make any space feel welcoming.',
    duration: '\u2248 90 seconds',
    intro: { lead: '', body: '' },
    steps: [
      { key: 'intro',       title: 'We\u2019d love to have you on the team.', sub: 'Hosts are the backbone of how house churches happen — let\u2019s walk through this together.' },
      { key: 'situation',   title: 'Where are you with this?',              sub: 'Pick whatever fits best. We\u2019ll go from there.' },
      { key: 'preferences', title: 'Why would you like to host?', sub: 'Tell us what\u2019s drawing you to this — and anything else you\u2019d like us to know.' },
      { key: 'location',    title: 'Where do you live?',                    sub: 'House churches are proximity-based, so location matters.' },
      { key: 'contact',     title: 'How should we reach you?',              sub: 'A pastor will follow up to talk it through.' },
      { key: 'done',        title: 'Thanks for stepping up.',               sub: 'We\u2019ll be in touch soon.' },
    ],
    options: [
      { id: 'ready',       label: 'I\u2019m ready to host.',                sub: 'Let\u2019s figure out the next step.' },
      { id: 'interested',  label: 'I\u2019m interested in hosting.',        sub: 'Want to understand what it actually involves.' },
      { id: 'future',      label: 'Put me on the list for the future.',    sub: 'Not now, but keep me in mind.' },
    ],
    confirm: (name) => `Thanks, ${name || 'friend'}. A pastor from Blacksburg Church will reach out within a few days to talk hosting through with you.`,
  },
};

const HOST_PREFS = [
  { id: 'living-room',   label: 'A living room that fits 8–12.' },
  { id: 'big-space',     label: 'Room for a bigger group.' },
  { id: 'kid-friendly',  label: 'Kid-friendly home.' },
  { id: 'pets',          label: 'We have pets.' },
  { id: 'apartment',     label: 'I\u2019m in an apartment.' },
  { id: 'parking',       label: 'Easy parking nearby.' },
  { id: 'cook',          label: 'I love feeding people.' },
  { id: 'flexible',      label: 'Flexible — we\u2019ll figure it out.' },
];

const PARTY_OPTIONS = ['Just me', 'Me + a partner', 'My family with kids', 'A group of friends', 'Not sure yet'];
const PREFS_CONNECT = [
  { id: 'house-church',  label: 'I want to try house church.' },
  { id: 'discipled',     label: 'I want to be discipled.' },
  { id: 'baptism',       label: 'I\u2019m thinking about baptism.' },
  { id: 'community',     label: 'I want to meet people.' },
  { id: 'questions',     label: 'I have questions about faith.' },
  { id: 'serve',         label: 'I\u2019m ready to serve.' },
  { id: 'prayer',        label: 'I could use prayer.' },
  { id: 'ministry',      label: 'We\u2019re a ministry seeking partnership.' },
  { id: 'just-info',     label: 'Just looking for now.' },
  { id: 'other',         label: 'Something else.' },
];
const NEIGHBORHOODS = ['Blacksburg', 'Christiansburg', 'Prices Fork', 'Shawsville', 'Newport', 'Dublin', 'Radford', 'Salem', 'Riner', 'Outside the area', 'Not sure yet'];

// Shared form body — used both standalone and inside the floating panel.
function ConnectForm({ mode = 'connect', onDone, compact = false }) {
  const cfg = CONNECT_MODES[mode] || CONNECT_MODES.connect;
  const isVisit = mode === 'visit';
  const isHost = mode === 'host';
  const STEPS = cfg.steps;

  const [step, setStep] = React.useState(0);
  const [data, setData] = React.useState({ situation: '', neighborhood: '', homebase: '', prefs: [], name: '', email: '', phone: '', note: '' });
  const [submitting, setSubmitting] = React.useState(false);

  const next = () => setStep(s => Math.min(STEPS.length - 1, s + 1));
  const back = () => setStep(s => Math.max(0, s - 1));

  const submitForm = async () => {
    setSubmitting(true);
    const situationLabel = cfg.options.find(o => o.id === data.situation)?.label || data.situation;
    const ctx = isVisit
      ? { visiting: situationLabel, party: data.neighborhood, neighborhood: data.homebase, note: data.note }
      : isHost
      ? { readiness: situationLabel, reason: data.hostReason, address: data.neighborhood, note: data.note }
      : { situation: situationLabel, preferences: data.prefs, neighborhood: data.neighborhood, note: data.note };
    try {
      await fetch('/.netlify/functions/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: data.name, email: data.email, phone: data.phone, formType: mode, context: ctx }),
      });
    } catch (_) {}
    setSubmitting(false);
    setStep(5);
  };
  const togglePref = (id) => setData(d => ({ ...d, prefs: d.prefs.includes(id) ? d.prefs.filter(p => p !== id) : [...d.prefs, id] }));

  const currentStep = STEPS[step];
  const totalQuestionSteps = STEPS.length - 1;
  const progress = (step / totalQuestionSteps) * 100;

  const canAdvance = isVisit ? {
    0: true, 1: !!data.situation, 2: !!data.neighborhood,
    3: !!data.homebase, 4: data.name && data.email, 5: false,
  }[step] : isHost ? {
    0: true, 1: !!data.situation, 2: true,
    3: !!data.neighborhood, 4: data.name && data.email, 5: false,
  }[step] : {
    0: true, 1: !!data.situation, 2: true,
    3: !!data.neighborhood, 4: data.name && data.email, 5: false,
  }[step];

  const titleSize = compact ? 28 : 'clamp(34px, 3.8vw, 52px)';
  const subSize = compact ? 15 : 17;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
      {step < STEPS.length - 1 && (
        <div style={{ marginBottom: compact ? 16 : 24, flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 10 }}>
            <div style={{ fontFamily: fontDisplay, fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: BC.orange }}>
              Step {step + 1} <span style={{ color: BC.navyMuted, fontWeight: 500 }}>of {totalQuestionSteps}</span>
            </div>
            <div style={{ flex: 1, height: 1, background: BC.creamDark, position: 'relative' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, height: 1, width: `${progress}%`, background: BC.orange, transition: 'width 400ms' }} />
            </div>
          </div>
        </div>
      )}

      <div style={{ flex: 1, overflowY: compact ? 'auto' : 'visible', minHeight: 0 }}>
        <h2 style={{ fontFamily: fontDisplay, fontSize: titleSize, fontWeight: 800, color: BC.navy, letterSpacing: '-0.025em', lineHeight: 1.05, marginBottom: 8 }}>
          {currentStep.title}
        </h2>
        <p style={{ fontFamily: fontBody, fontSize: subSize, color: BC.navyMuted, lineHeight: 1.5, marginBottom: compact ? 16 : 28, fontWeight: 300 }}>
          {currentStep.sub}
        </p>

        {step === 0 && (
          <div>
            {cfg.intro.lead && (
              <p style={{ fontFamily: fontDisplay, fontSize: compact ? 17 : 22, fontWeight: 400, fontStyle: 'italic', color: BC.navy, lineHeight: 1.3, letterSpacing: '-0.01em', marginBottom: 12 }}>
                {cfg.intro.lead}
              </p>
            )}
            <p style={{ fontFamily: fontBody, fontSize: compact ? 14 : 16, color: BC.navyMuted, lineHeight: 1.6, fontWeight: 300 }}>
              {cfg.intro.body}
            </p>
          </div>
        )}

        {step === 1 && (
          <div style={{ display: 'grid', gap: 8 }}>
            {cfg.options.map(s => (
              <button
                key={s.id}
                onClick={() => setData(d => ({ ...d, situation: s.id }))}
                style={{
                  textAlign: 'left', padding: compact ? '14px 18px' : '20px 24px', cursor: 'pointer',
                  background: data.situation === s.id ? BC.navy : BC.white,
                  color: data.situation === s.id ? BC.cream : BC.navy,
                  border: `1.5px solid ${data.situation === s.id ? BC.navy : BC.border}`,
                  borderRadius: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12,
                  transition: 'all 150ms',
                }}
              >
                <div>
                  <div style={{ fontFamily: fontDisplay, fontSize: compact ? 14 : 17, fontWeight: 700, letterSpacing: '-0.01em', marginBottom: 3 }}>{s.label}</div>
                  <div style={{ fontFamily: fontBody, fontSize: compact ? 12 : 13, color: data.situation === s.id ? 'rgba(249,237,214,0.7)' : BC.navyMuted, fontWeight: 300 }}>{s.sub}</div>
                </div>
                <ArrowRight size={compact ? 12 : 14} color={data.situation === s.id ? BC.orange : BC.navyMuted} />
              </button>
            ))}
          </div>
        )}

        {step === 2 && isVisit && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
            {PARTY_OPTIONS.map(n => (
              <button
                key={n}
                onClick={() => setData(d => ({ ...d, neighborhood: n }))}
                style={{
                  textAlign: 'left', padding: compact ? '12px 14px' : '16px 18px', cursor: 'pointer',
                  background: data.neighborhood === n ? BC.navy : BC.white,
                  color: data.neighborhood === n ? BC.cream : BC.navy,
                  border: `1.5px solid ${data.neighborhood === n ? BC.navy : BC.border}`,
                  borderRadius: 4, fontFamily: fontDisplay, fontSize: compact ? 13 : 14, fontWeight: 600,
                }}
              >{n}</button>
            ))}
          </div>
        )}

        {step === 2 && !isVisit && !isHost && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
            {PREFS_CONNECT.map(p => (
              <button
                key={p.id}
                onClick={() => togglePref(p.id)}
                style={{
                  textAlign: 'left', padding: compact ? '12px 14px' : '16px 18px', cursor: 'pointer',
                  background: data.prefs.includes(p.id) ? BC.navy : BC.white,
                  color: data.prefs.includes(p.id) ? BC.cream : BC.navy,
                  border: `1.5px solid ${data.prefs.includes(p.id) ? BC.navy : BC.border}`,
                  borderRadius: 4, fontFamily: fontDisplay, fontSize: compact ? 13 : 14, fontWeight: 600,
                  display: 'flex', alignItems: 'center', gap: 10,
                }}
              >
                <span style={{
                  width: 16, height: 16, flexShrink: 0,
                  border: `1.5px solid ${data.prefs.includes(p.id) ? BC.orange : BC.border}`,
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

        {step === 2 && isHost && (
          <div>
            <textarea
              value={data.hostReason || ''}
              onChange={e => setData(d => ({ ...d, hostReason: e.target.value }))}
              placeholder="What's drawing you to host? Anything else you'd like us to know..."
              style={{ fontFamily: fontBody, fontSize: 15, color: BC.navy, background: BC.white, border: `1.5px solid ${BC.border}`, borderRadius: 4, padding: '14px 16px', width: '100%', outline: 'none', minHeight: 140, resize: 'vertical', lineHeight: 1.5 }}
              onFocus={e => e.target.style.borderColor = BC.navy}
              onBlur={e => e.target.style.borderColor = BC.border}
            />
          </div>
        )}

        {step === 3 && !isVisit && !isHost && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
            {NEIGHBORHOODS.map(n => (
              <button
                key={n}
                onClick={() => setData(d => ({ ...d, neighborhood: n }))}
                style={{
                  textAlign: 'left', padding: compact ? '12px 14px' : '16px 18px', cursor: 'pointer',
                  background: data.neighborhood === n ? BC.navy : BC.white,
                  color: data.neighborhood === n ? BC.cream : BC.navy,
                  border: `1.5px solid ${data.neighborhood === n ? BC.navy : BC.border}`,
                  borderRadius: 4, fontFamily: fontDisplay, fontSize: compact ? 13 : 14, fontWeight: 600,
                }}
              >{n}</button>
            ))}
          </div>
        )}

        {step === 3 && isVisit && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
            {NEIGHBORHOODS.map(n => (
              <button
                key={n}
                onClick={() => setData(d => ({ ...d, homebase: n }))}
                style={{
                  textAlign: 'left', padding: compact ? '12px 14px' : '16px 18px', cursor: 'pointer',
                  background: data.homebase === n ? BC.navy : BC.white,
                  color: data.homebase === n ? BC.cream : BC.navy,
                  border: `1.5px solid ${data.homebase === n ? BC.navy : BC.border}`,
                  borderRadius: 4, fontFamily: fontDisplay, fontSize: compact ? 13 : 14, fontWeight: 600,
                }}
              >{n}</button>
            ))}
          </div>
        )}

        {step === 3 && isHost && (
          <div>
            <label style={{ fontFamily: fontDisplay, fontSize: 11, fontWeight: 600, color: BC.navy, letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Address</label>
            <input
              value={data.neighborhood}
              onChange={e => setData(d => ({ ...d, neighborhood: e.target.value }))}
              placeholder="123 Main St, Blacksburg, VA 24060"
              style={{ fontFamily: fontBody, fontSize: 15, color: BC.navy, background: BC.white, border: `1.5px solid ${BC.border}`, borderRadius: 4, padding: '12px 14px', width: '100%', outline: 'none' }}
              onFocus={e => e.target.style.borderColor = BC.navy}
              onBlur={e => e.target.style.borderColor = BC.border}
            />
            <p style={{ fontFamily: fontBody, fontSize: 13, color: BC.navyMuted, marginTop: 8, fontWeight: 300 }}>
              Your address will never be shared publicly on our website. Only those who sign up to be part of a house church will receive an address from the house church pastor you’re partnering with.
            </p>
          </div>
        )}

        {step === 4 && (
          <div style={{ display: 'grid', gap: 14 }}>
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
            {(
              <div>
                <label style={{ fontFamily: fontDisplay, fontSize: 11, fontWeight: 600, color: BC.navy, letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Anything else?</label>
                <textarea
                  value={data.note}
                  onChange={e => setData(d => ({ ...d, note: e.target.value }))}
                  placeholder={isVisit ? "Accessibility needs, kids' ages, anything else that helps us welcome you well..." : "Questions, concerns, things we should know..."}
                  style={{ fontFamily: fontBody, fontSize: 15, color: BC.navy, background: BC.white, border: `1.5px solid ${BC.border}`, borderRadius: 4, padding: '12px 14px', width: '100%', outline: 'none', minHeight: 80, resize: 'vertical' }}
                />
              </div>
            )}
          </div>
        )}

        {step === 5 && (
          <div style={{ padding: compact ? '8px 0' : '24px 0' }}>
            <Button variant="navy" onClick={() => onDone && onDone()}>{compact ? 'Close' : 'Back to home'}</Button>
          </div>
        )}
      </div>

      {step < STEPS.length - 1 && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: compact ? 16 : 24, paddingTop: compact ? 14 : 20, borderTop: `1px solid ${BC.border}`, flexShrink: 0 }}>
          {step > 0 ? (
            <button onClick={back} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: fontDisplay, fontSize: 13, fontWeight: 600, color: BC.navyMuted, letterSpacing: '0.05em', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              ← Back
            </button>
          ) : <span />}
          <Button
            variant="primary" size="md"
            onClick={step === 4 ? submitForm : next}
            style={{ opacity: (canAdvance && !submitting) ? 1 : 0.4, pointerEvents: (canAdvance && !submitting) ? 'auto' : 'none' }}
          >
            {step === 0 ? 'Get started' : (step === 4 ? (submitting ? 'Sending…' : 'Submit') : 'Continue')} <ArrowRight color="#fff" />
          </Button>
        </div>
      )}
    </div>
  );
}

// Floating CTA + expanding panel.
function ConnectFAB() {
  const [open, setOpen] = React.useState(null); // null | 'connect' | 'visit'

  React.useEffect(() => {
    const handler = (e) => setOpen((e.detail && e.detail.mode) || 'connect');
    window.addEventListener('bc-open-connect', handler);
    const onKey = (e) => { if (e.key === 'Escape') setOpen(null); };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('bc-open-connect', handler);
      window.removeEventListener('keydown', onKey);
    };
  }, []);

  React.useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const cfg = open ? CONNECT_MODES[open] : null;

  return (
    <>
      <style>{`
        @keyframes bcFabIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes bcPanelIn { from { opacity: 0; transform: translateY(16px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes bcBackdropIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>

      {/* Floating buttons */}
      {!open && (
        <div style={{
          position: 'fixed', right: 24, bottom: 24, zIndex: 90,
          animation: 'bcFabIn 280ms ease-out',
        }}>
          <button
            onClick={() => setOpen('connect')}
            style={{
              background: BC.orange, color: BC.white,
              border: 'none', borderRadius: 999,
              padding: '14px 24px', cursor: 'pointer',
              fontFamily: fontDisplay, fontWeight: 700, fontSize: 14, letterSpacing: '0.02em',
              display: 'inline-flex', alignItems: 'center', gap: 8,
              boxShadow: '0 8px 24px rgba(245,130,32,0.45)',
            }}
          >
            Get connected <ArrowRight size={13} color="#fff" />
          </button>
        </div>
      )}

      {/* Backdrop + panel */}
      {open && (
        <>
          <div
            onClick={() => setOpen(null)}
            style={{
              position: 'fixed', inset: 0, zIndex: 95,
              background: 'rgba(15,34,51,0.55)', backdropFilter: 'blur(2px)',
              animation: 'bcBackdropIn 200ms ease-out',
            }}
          />
          <div style={{
            position: 'fixed', right: 24, bottom: 24, zIndex: 96,
            width: 'min(440px, calc(100vw - 32px))',
            maxHeight: 'calc(100vh - 48px)',
            background: BC.white, border: `1px solid ${BC.border}`, borderRadius: 6,
            boxShadow: '0 24px 60px rgba(15,34,51,0.35)',
            display: 'flex', flexDirection: 'column',
            overflow: 'hidden',
            animation: 'bcPanelIn 260ms cubic-bezier(0.2, 0.8, 0.2, 1)',
          }}>
            {/* Header */}
            <div style={{
              background: BC.navy, color: BC.cream, padding: '18px 22px',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              position: 'relative', overflow: 'hidden', flexShrink: 0,
            }}>
              <img src={TOPO.navyOrange} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.25 }} />
              <div style={{ position: 'relative', zIndex: 2 }}>
                <div style={{ fontFamily: fontDisplay, fontSize: 10, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: BC.orange, marginBottom: 4 }}>
                  {cfg.eyebrow}
                </div>
                <div style={{ fontFamily: fontDisplay, fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', color: BC.cream }}>
                  {cfg.h1}
                </div>
              </div>
              <button
                onClick={() => setOpen(null)}
                aria-label="Close"
                style={{
                  position: 'relative', zIndex: 2,
                  background: 'rgba(249,237,214,0.1)', border: 'none', cursor: 'pointer',
                  width: 32, height: 32, borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: BC.cream,
                }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
              </button>
            </div>

            {/* Form body */}
            <div style={{ padding: 24, overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
              <ConnectForm mode={open} compact={true} onDone={() => setOpen(null)} />
            </div>
          </div>
        </>
      )}
    </>
  );
}

// Standalone page (kept as fallback for direct links / footer)
function ConnectPage({ onNav, mode = 'connect' }) {
  const cfg = CONNECT_MODES[mode] || CONNECT_MODES.connect;
  return (
    <section style={{ background: BC.creamSubtle, padding: '32px 48px 48px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: 20 }}>
          <Eyebrow>{cfg.eyebrow}</Eyebrow>
          <h1 style={{ fontFamily: fontDisplay, fontSize: 'clamp(32px, 4.4vw, 52px)', fontWeight: 800, color: BC.navy, letterSpacing: '-0.03em', lineHeight: 1.0, margin: '10px 0 10px' }}>
            {cfg.h1}
          </h1>
          <p style={{ fontFamily: fontBody, fontSize: 16, color: BC.navyMuted, lineHeight: 1.55, fontWeight: 300, maxWidth: mode === 'host' ? 760 : 560 }}>
            {cfg.sub}
          </p>
        </div>
        {mode === 'host' && (
          <div style={{
            background: BC.white,
            border: `1px solid ${BC.border}`,
            borderLeft: `3px solid ${BC.orange}`,
            borderRadius: 4,
            padding: '20px 24px',
            marginBottom: 20,
            maxWidth: 760,
          }}>
            <div style={{ fontFamily: fontDisplay, fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: BC.orange, marginBottom: 8 }}>
              One thing to know
            </div>
            <p style={{ fontFamily: fontBody, fontSize: 15, color: BC.navy, lineHeight: 1.6, fontWeight: 400, margin: 0 }}>
              Hosting and pastoring are different roles. Our hope is to pair every house church pastor with a host so each can focus on their gift — pastors on pastoring, hosts on hosting.
            </p>
          </div>
        )}
        <div style={{ background: BC.white, border: `1px solid ${BC.border}`, borderRadius: 4, padding: '28px 32px', display: 'flex', flexDirection: 'column' }}>
          <ConnectForm mode={mode} onDone={() => onNav && onNav('home')} compact={true} />
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { ConnectPage, ConnectFAB });
