// Blacksburg Church — Give Page

function GivePage({ onNav }) {
  const [amount, setAmount] = React.useState(100);
  const [custom, setCustom] = React.useState('');
  const [frequency, setFrequency] = React.useState('once');
  const [fund, setFund] = React.useState('General');
  const [submitted, setSubmitted] = React.useState(false);

  const presetAmounts = [25, 50, 100, 250, 500];
  const funds = ['General', 'Local outreach', 'House church hosts', 'Building fund'];

  if (submitted) {
    return (
      <>
        <Section bg={BC.cream} py={140}>
          <div style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center' }}>
            <img src="assets/emblem-navy-orange.png" alt="" style={{ width: 72, marginBottom: 32 }} />
            <h1 style={{ fontFamily: fontDisplay, fontSize: 56, fontWeight: 800, color: BC.navy, letterSpacing: '-0.025em', lineHeight: 1, marginBottom: 20 }}>
              Thank you.
            </h1>
            <p style={{ fontFamily: fontBody, fontSize: 18, color: BC.navyMuted, lineHeight: 1.7, marginBottom: 32, fontWeight: 300 }}>
              Your gift of <strong style={{ color: BC.navy }}>${custom || amount}</strong> to the {fund.toLowerCase()} fund was received. A receipt is on its way to your email.
            </p>
            <Button variant="outline" onClick={() => { setSubmitted(false); setCustom(''); }}>Give again</Button>
          </div>
        </Section>
      </>
    );
  }

  return (
    <>
      <div style={{ background: BC.navy, padding: '100px 48px 88px', position: 'relative', overflow: 'hidden' }}>
        <img src={TOPO.navyOrange} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.35 }} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 1200, margin: '0 auto' }}>
          <Eyebrow>Generosity</Eyebrow>
          <h1 style={{ fontFamily: fontDisplay, fontSize: 'clamp(52px, 8vw, 108px)', fontWeight: 800, color: BC.cream, letterSpacing: '-0.03em', lineHeight: 0.98, maxWidth: 900, marginBottom: 24 }}>
            Give <span style={{ fontStyle: 'italic', fontWeight: 300, color: BC.orange }}>generously.</span>
          </h1>
          <p style={{ fontFamily: fontBody, fontSize: 20, color: 'rgba(249,237,214,0.8)', lineHeight: 1.6, maxWidth: 620, fontWeight: 300 }}>
            Your giving supports house churches, local outreach, and the people who make this possible.
          </p>
        </div>
      </div>

      <Section bg={BC.white} py={100}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: 72, alignItems: 'start' }}>
          <div>
            <Eyebrow>Where it goes</Eyebrow>
            <h2 style={{ fontFamily: fontDisplay, fontSize: 40, fontWeight: 800, color: BC.navy, letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: 28 }}>
              Simple math,<br/>honest work.
            </h2>
            <div style={{ marginBottom: 28 }}>
              {[
                { pct: 40, label: 'Staff + teaching' },
                { pct: 25, label: 'House church support' },
                { pct: 20, label: 'Local outreach' },
                { pct: 10, label: 'Space + overhead' },
                { pct: 5,  label: 'Savings + contingency' },
              ].map(b => (
                <div key={b.label} style={{ marginBottom: 14 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <div style={{ fontFamily: fontDisplay, fontSize: 13, fontWeight: 600, color: BC.navy }}>{b.label}</div>
                    <div style={{ fontFamily: fontDisplay, fontSize: 13, fontWeight: 700, color: BC.orange }}>{b.pct}%</div>
                  </div>
                  <div style={{ height: 6, background: BC.creamSubtle, borderRadius: 3 }}>
                    <div style={{ height: '100%', width: `${b.pct * 2}%`, background: BC.orange, borderRadius: 3 }} />
                  </div>
                </div>
              ))}
            </div>
            <p style={{ fontFamily: fontBody, fontSize: 14, color: BC.navyMuted, lineHeight: 1.7, fontWeight: 300 }}>
              We publish a full budget annually. Ask for it — we'll send it.
            </p>
          </div>

          <div style={{ background: BC.creamSubtle, border: `1px solid ${BC.border}`, borderRadius: 4, padding: 40 }}>
            <div style={{ fontFamily: fontDisplay, fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: BC.orange, marginBottom: 18 }}>
              Give online
            </div>

            <div style={{ display: 'flex', gap: 4, background: BC.white, padding: 4, borderRadius: 4, marginBottom: 24, border: `1px solid ${BC.border}` }}>
              {[['once','One-time'],['monthly','Monthly'],['weekly','Weekly']].map(([k,l]) => (
                <button key={k} onClick={() => setFrequency(k)} style={{
                  flex: 1, padding: '10px 12px', border: 'none', cursor: 'pointer',
                  background: frequency === k ? BC.navy : 'transparent',
                  color: frequency === k ? BC.cream : BC.navy,
                  fontFamily: fontDisplay, fontSize: 12, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', borderRadius: 3,
                }}>{l}</button>
              ))}
            </div>

            <div style={{ fontFamily: fontDisplay, fontSize: 10, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: BC.muted, marginBottom: 10 }}>Amount</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8, marginBottom: 12 }}>
              {presetAmounts.map(a => (
                <button key={a} onClick={() => { setAmount(a); setCustom(''); }} style={{
                  padding: '14px 8px', borderRadius: 4, cursor: 'pointer',
                  background: amount === a && !custom ? BC.navy : BC.white,
                  color: amount === a && !custom ? BC.cream : BC.navy,
                  border: `1.5px solid ${amount === a && !custom ? BC.navy : BC.border}`,
                  fontFamily: fontDisplay, fontSize: 15, fontWeight: 700,
                }}>${a}</button>
              ))}
            </div>
            <div style={{ position: 'relative', marginBottom: 24 }}>
              <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', fontFamily: fontDisplay, fontSize: 16, color: BC.muted, fontWeight: 600 }}>$</span>
              <input
                value={custom} onChange={e => setCustom(e.target.value.replace(/[^0-9]/g, ''))}
                placeholder="Custom amount"
                style={{ width: '100%', padding: '14px 14px 14px 28px', fontFamily: fontDisplay, fontSize: 15, fontWeight: 600, color: BC.navy, border: `1.5px solid ${custom ? BC.navy : BC.border}`, borderRadius: 4, outline: 'none', background: BC.white }}
              />
            </div>

            <div style={{ fontFamily: fontDisplay, fontSize: 10, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: BC.muted, marginBottom: 10 }}>Fund</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8, marginBottom: 28 }}>
              {funds.map(f => (
                <button key={f} onClick={() => setFund(f)} style={{
                  padding: '12px 14px', borderRadius: 4, cursor: 'pointer',
                  background: fund === f ? BC.navy : BC.white,
                  color: fund === f ? BC.cream : BC.navy,
                  border: `1.5px solid ${fund === f ? BC.navy : BC.border}`,
                  fontFamily: fontDisplay, fontSize: 12, fontWeight: 600, textAlign: 'left',
                }}>{f}</button>
              ))}
            </div>

            <Button variant="primary" size="lg" style={{ width: '100%', justifyContent: 'center' }} onClick={() => setSubmitted(true)}>
              Give ${custom || amount} {frequency !== 'once' ? frequency : ''} <ArrowRight color="#fff" />
            </Button>
            <p style={{ fontFamily: fontBody, fontSize: 12, color: BC.muted, marginTop: 14, textAlign: 'center', lineHeight: 1.6 }}>
              Secure. Tax-deductible. You can also give by check or set up a recurring bank transfer.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}

Object.assign(window, { GivePage });
