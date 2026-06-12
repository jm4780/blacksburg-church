// Blacksburg Church — House Churches Page (map + list toggle + filters)

// Coordinates are % within the uploaded NRV map image (4:3).
// Blacksburg sits upper-right, Christiansburg middle-right, Radford lower-left.
const ALL_HOUSE_CHURCHES = [
  { num: '01', name: 'Plum Creek',     town: 'Christiansburg', neighborhood: 'Plum Creek',     day: 'Sundays',    time: '5:00 – 7:00pm', x: 44, y: 81, status: 'active' },
  { num: '02', name: "Nellie's Cave", town: 'Blacksburg',     neighborhood: "Nellie's Cave", day: 'Wednesdays', time: '6:00 – 8:00pm', x: 66, y: 50, status: 'active' },
];

const LAUNCHING_SOON = [
  { num: '03', name: 'Newport',     town: 'Newport',        neighborhood: 'Newport',     launch: 'TBD', x: 42, y: 15, status: 'launching' },
  { num: '04', name: 'Prices Fork', town: 'Blacksburg',     neighborhood: 'Prices Fork', launch: 'TBD', x: 50, y: 42, status: 'launching' },
  { num: '05', name: 'Downtown',    town: 'Blacksburg',     neighborhood: 'Downtown',    launch: 'TBD', x: 63, y: 37, status: 'launching' },
  { num: '06', name: 'Merrimac',    town: 'Blacksburg',     neighborhood: 'Merrimac',    launch: 'TBD', x: 56, y: 55, status: 'launching' },
];

const TOWNS = ['All', 'Blacksburg', 'Christiansburg'];
const DAYS = ['Any', 'Sundays', 'Wednesdays'];

function FilterPill({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        fontFamily: fontDisplay, fontSize: 12, fontWeight: 600, letterSpacing: '0.05em',
        padding: '8px 16px', borderRadius: 100,
        background: active ? BC.navy : BC.white,
        color: active ? BC.cream : BC.navy,
        border: `1.5px solid ${active ? BC.navy : BC.border}`,
        cursor: 'pointer', whiteSpace: 'nowrap',
        transition: 'all 150ms',
      }}
    >{label}</button>
  );
}

function HouseChurchCard({ hc, selected, onSelect }) {
  const [signupOpen, setSignupOpen] = React.useState(false);
  const [signupData, setSignupData] = React.useState({ name: '', email: '', phone: '' });
  const [signupSent, setSignupSent] = React.useState(false);
  const [signupSending, setSignupSending] = React.useState(false);
  const canSubmit = signupData.name && signupData.email && signupData.phone;

  const submitSignup = async (e) => {
    e.stopPropagation();
    if (!canSubmit) return;
    setSignupSending(true);
    try {
      await fetch('/.netlify/functions/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: signupData.name, email: signupData.email, phone: signupData.phone,
          formType: 'house-church',
          context: { houseChurch: `N° ${hc.num} · ${hc.neighborhood}` },
        }),
      });
    } catch (_) {}
    setSignupSending(false);
    setSignupSent(true);
  };

  React.useEffect(() => {
    if (!selected) { setSignupOpen(false); setSignupSent(false); }
  }, [selected]);

  return (
    <div
      onClick={() => onSelect && onSelect(hc.num)}
      style={{
        background: BC.white,
        border: `1.5px solid ${selected ? BC.orange : BC.border}`,
        borderRadius: 4, padding: '24px 24px', cursor: 'pointer',
        transition: 'all 180ms',
        display: 'flex', gap: 20, alignItems: 'stretch',
      }}
      onMouseEnter={e => { if (!selected) e.currentTarget.style.borderColor = BC.navy; }}
      onMouseLeave={e => { if (!selected) e.currentTarget.style.borderColor = BC.border; }}
    >
      <div style={{ width: 4, background: BC.orange, borderRadius: 2, flexShrink: 0 }} />
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: fontDisplay, fontSize: 10, fontWeight: 600, letterSpacing: '0.22em', color: BC.orange, marginBottom: 6 }}>N° {hc.num}</div>
        <div style={{ fontFamily: fontDisplay, fontSize: 22, fontWeight: 700, color: BC.navy, letterSpacing: '-0.01em', lineHeight: 1.15, marginBottom: 2 }}>
          {hc.name}
        </div>
        <div style={{ fontFamily: fontDisplay, fontSize: 11, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: BC.navyMuted, marginBottom: 16 }}>
          {hc.town}
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, paddingTop: 14, borderTop: `1px solid ${BC.border}` }}>
          <div style={{ fontFamily: fontDisplay, fontSize: 9, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: BC.muted }}>When</div>
          <div style={{ fontFamily: fontDisplay, fontSize: 14, fontWeight: 700, color: BC.navy }}>{hc.day} · {hc.time}</div>
        </div>
        {!signupOpen && !signupSent && (
          <div style={{ marginTop: 18, paddingTop: 18, borderTop: `1px solid ${BC.border}` }}>
            <Button variant="primary" size="sm" onClick={(e) => { e.stopPropagation(); onSelect && onSelect(hc.num); setSignupOpen(true); }}>
              Connect me <ArrowRight color="#fff" />
            </Button>
          </div>
        )}
        {selected && signupOpen && !signupSent && (
          <div onClick={(e) => e.stopPropagation()} style={{ marginTop: 18, paddingTop: 18, borderTop: `1px solid ${BC.border}` }}>
            <p style={{ fontFamily: fontBody, fontSize: 14, color: BC.navyMuted, lineHeight: 1.55, fontWeight: 300, marginBottom: 16 }}>
              We can't wait to meet you! Once you submit your info, we'll let the house church pastor know, and they'll be in contact to invite you to the next gathering.
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
                    value={signupData[f.key]}
                    onChange={e => setSignupData(d => ({ ...d, [f.key]: e.target.value }))}
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
                onClick={(e) => { e.stopPropagation(); setSignupOpen(false); }}
                style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontFamily: fontDisplay, fontSize: 12, fontWeight: 600, color: BC.navyMuted, letterSpacing: '0.05em' }}
              >← Back</button>
              <Button
                variant="primary"
                size="sm"
                onClick={submitSignup}
                style={{ opacity: canSubmit ? 1 : 0.4, pointerEvents: canSubmit ? 'auto' : 'none' }}
              >
                Submit <ArrowRight color="#fff" />
              </Button>
            </div>
          </div>
        )}
        {selected && signupSent && (
          <div onClick={(e) => e.stopPropagation()} style={{ marginTop: 18, paddingTop: 18, borderTop: `1px solid ${BC.border}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: BC.orange, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><path d="M3 10l4 4 10-10" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <div style={{ fontFamily: fontDisplay, fontSize: 18, fontWeight: 800, color: BC.navy, letterSpacing: '-0.01em' }}>You're in.</div>
            </div>
            <p style={{ fontFamily: fontBody, fontSize: 14, color: BC.navyMuted, lineHeight: 1.55, fontWeight: 300, margin: 0 }}>
              The house church pastor will be in touch soon.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function WaitlistCard({ hc }) {
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState({ name: '', email: '' });
  const [sent, setSent] = React.useState(false);
  const [sending, setSending] = React.useState(false);
  const canSubmit = data.name.trim().length > 0 && data.email.trim().includes('@');

  const submitWaitlist = async () => {
    if (!canSubmit) return;
    setSending(true);
    try {
      await fetch('/.netlify/functions/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name, email: data.email,
          formType: 'waitlist',
          context: { houseChurch: hc.name, town: hc.town },
        }),
      });
    } catch (_) {}
    setSending(false);
    setSent(true);
  };

  return (
    <div style={{
      background: 'rgba(249,237,214,0.06)', border: '1px dashed rgba(249,237,214,0.35)', borderRadius: 4,
      padding: '24px 22px', display: 'flex', flexDirection: 'column', gap: 8,
      minHeight: 180, backdropFilter: 'blur(2px)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: fontDisplay, fontSize: 22, fontWeight: 700, color: BC.cream, letterSpacing: '-0.01em', lineHeight: 1.15 }}>
            {hc.name}
          </div>
          <div style={{ fontFamily: fontBody, fontSize: 13, color: 'rgba(249,237,214,0.7)', fontWeight: 300, marginTop: 4 }}>
            {hc.town}
          </div>
        </div>
        <div style={{ fontFamily: fontDisplay, fontSize: 9, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: BC.cream, background: 'rgba(249,237,214,0.12)', padding: '3px 8px', borderRadius: 2, flexShrink: 0, marginTop: 4 }}>
          {hc.launch}
        </div>
      </div>
      {!open && !sent && (
        <div style={{ marginTop: 'auto', paddingTop: 12, borderTop: '1px solid rgba(249,237,214,0.15)' }}>
          <button
            onClick={() => setOpen(true)}
            style={{
              background: 'none', border: 'none', padding: 0, cursor: 'pointer',
              fontFamily: fontDisplay, fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase',
              color: BC.orange, display: 'flex', alignItems: 'center', gap: 8,
            }}
          >
            Get on the list <ArrowRight color={BC.orange} size={12} />
          </button>
        </div>
      )}
      {open && !sent && (
        <div style={{ marginTop: 14, paddingTop: 14, borderTop: '1px solid rgba(249,237,214,0.15)' }}>
          <p style={{ fontFamily: fontBody, fontSize: 13, color: 'rgba(249,237,214,0.8)', lineHeight: 1.55, fontWeight: 300, marginBottom: 14 }}>
            We'll email you the moment a house church launches in {hc.name}.
          </p>
          <div style={{ display: 'grid', gap: 10 }}>
            {[
              { label: 'Your name', key: 'name', placeholder: 'Jordan Smith' },
              { label: 'Email', key: 'email', placeholder: 'jordan@example.com' },
            ].map(f => (
              <div key={f.key}>
                <label style={{ fontFamily: fontDisplay, fontSize: 10, fontWeight: 600, color: BC.cream, letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: 5 }}>{f.label}</label>
                <input
                  value={data[f.key]}
                  onChange={e => setData(d => ({ ...d, [f.key]: e.target.value }))}
                  placeholder={f.placeholder}
                  style={{ fontFamily: fontBody, fontSize: 14, color: BC.cream, background: 'rgba(15,34,51,0.5)', border: '1.5px solid rgba(249,237,214,0.25)', borderRadius: 4, padding: '10px 12px', width: '100%', outline: 'none', boxSizing: 'border-box' }}
                  onFocus={e => e.target.style.borderColor = BC.orange}
                  onBlur={e => e.target.style.borderColor = 'rgba(249,237,214,0.25)'}
                />
              </div>
            ))}
          </div>
          <div style={{ marginTop: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
            <button
              onClick={() => setOpen(false)}
              style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontFamily: fontDisplay, fontSize: 12, fontWeight: 600, color: 'rgba(249,237,214,0.7)', letterSpacing: '0.05em' }}
            >← Back</button>
            <Button
              variant="primary"
              size="sm"
              onClick={submitWaitlist}
              style={{ opacity: canSubmit ? 1 : 0.4, pointerEvents: canSubmit && !sending ? 'auto' : 'none' }}
            >
              {sending ? 'Sending…' : <><span>Join list</span> <ArrowRight color="#fff" /></>}
            </Button>
          </div>
        </div>
      )}
      {sent && (
        <div style={{ marginTop: 'auto', paddingTop: 14, borderTop: '1px solid rgba(249,237,214,0.15)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: BC.orange, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="14" height="14" viewBox="0 0 20 20" fill="none"><path d="M3 10l4 4 10-10" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <div style={{ fontFamily: fontDisplay, fontSize: 16, fontWeight: 800, color: BC.cream, letterSpacing: '-0.01em' }}>You're on the list.</div>
          </div>
          <p style={{ fontFamily: fontBody, fontSize: 13, color: 'rgba(249,237,214,0.75)', lineHeight: 1.55, fontWeight: 300, margin: 0 }}>
            We'll be in touch the moment {hc.name} launches.
          </p>
        </div>
      )}
    </div>
  );
}

function MapView({ filtered, launching, selected, setSelected }) {
  return (
    <div style={{ borderRadius: 4, border: `1px solid ${BC.border}` }}>
    <div style={{
      position: 'relative', aspectRatio: '4/3', background: BC.navy,
    }}>
      {/* Custom NRV map */}
      <img
        src="assets/nrv-map.png"
        alt="Map of the New River Valley — Blacksburg, Christiansburg, Radford"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', borderRadius: 4 }}
      />

      {/* Town labels (non-interactive) */}
      {[
        { label: 'BLACKSBURG',     x: 65, y: 37 },
        { label: 'CHRISTIANSBURG', x: 63, y: 75 },
        { label: 'RADFORD',        x: 20, y: 78 },
      ].map(t => (
        <div key={t.label} style={{
          position: 'absolute', left: `${t.x}%`, top: `${t.y}%`,
          transform: 'translate(-50%, -50%)',
          fontFamily: fontDisplay, fontSize: 11, fontWeight: 700,
          letterSpacing: '0.22em', color: 'rgba(249,237,214,0.85)',
          textShadow: '0 1px 3px rgba(0,0,0,0.6)',
          pointerEvents: 'none', whiteSpace: 'nowrap',
          zIndex: 1,
        }}>{t.label}</div>
      ))}

      {/* Pins */}
      {[...filtered, ...(launching || [])].map(hc => {
        const isSel = selected === hc.num;
        const isLaunching = hc.status === 'launching';
        const pinW = isSel ? 40 : 32;
        const pinH = Math.round(pinW * 1.5); // brand mark is ~2:3
        return (
          <button
            key={hc.num}
            onClick={() => setSelected(isSel ? null : hc.num)}
            style={{
              position: 'absolute', left: `${hc.x}%`, top: `${hc.y}%`,
              // Anchor the bottom tip of the chevron to the (x,y) location
              transform: 'translate(-50%, -100%)',
              background: 'transparent', border: 'none', cursor: 'pointer', padding: 0,
              zIndex: isSel ? 5 : 2,
            }}
          >
            <div style={{
              position: 'relative',
              width: pinW, height: pinH,
              filter: isSel
                ? 'drop-shadow(0 6px 10px rgba(0,0,0,0.55))'
                : 'drop-shadow(0 3px 6px rgba(0,0,0,0.4))',
              opacity: isLaunching ? 0.6 : 1,
              transition: 'all 180ms',
            }}>
              <img
                src="assets/brandmark-orange.png"
                alt=""
                style={{ width: '100%', height: '100%', display: 'block' }}
              />
              {/* Number centered inside the "house" portion of the mark (active pins only) */}
              {!isLaunching && (
                <div style={{
                  position: 'absolute',
                  left: 0, right: 0,
                  top: '34%',
                  textAlign: 'center',
                  fontFamily: fontDisplay,
                  fontSize: isSel ? 10 : 8,
                  fontWeight: 800,
                  color: BC.cream,
                  letterSpacing: '0.02em',
                  lineHeight: 1,
                  pointerEvents: 'none',
                }}>{hc.num}</div>
              )}
            </div>
            {isSel && (
              <div data-bc-map-tooltip style={{
                position: 'absolute',
                left: '50%',
                ...(hc.y <= 22
                  ? { top: 'calc(100% + 6px)' }
                  : { bottom: 'calc(100% + 6px)' }
                ),
                transform: 'translateX(-50%)',
                background: BC.white, padding: '8px 14px', borderRadius: 4,
                whiteSpace: 'nowrap', boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
                fontFamily: fontDisplay, fontSize: 12, fontWeight: 700, color: BC.navy,
              }}>{hc.name}</div>
            )}
          </button>
        );
      })}

      {/* Legend — bottom-right overlay (desktop) */}
      <div data-bc-map-legend-overlay style={{
        position: 'absolute', right: 16, bottom: 16, background: 'rgba(15,34,51,0.8)',
        backdropFilter: 'blur(8px)', padding: '10px 12px', borderRadius: 4,
        zIndex: 4,
      }}>
        <div style={{ fontFamily: fontDisplay, fontSize: 9, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(249,237,214,0.5)', marginBottom: 6 }}>
          Legend
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
            <img src="assets/brandmark-orange.png" alt="" style={{ width: 11, height: 16, display: 'block' }} />
            <div style={{ fontFamily: fontBody, fontSize: 10, color: BC.cream }}>Meeting Now</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
            <img src="assets/brandmark-orange.png" alt="" style={{ width: 11, height: 16, display: 'block', opacity: 0.55 }} />
            <div style={{ fontFamily: fontBody, fontSize: 10, color: BC.cream }}>Future House Churches</div>
          </div>
        </div>
      </div>

      {/* Region label */}
    </div>

    {/* Legend below map — mobile only (hidden on desktop via CSS) */}
    <div data-bc-map-legend-bar style={{
      display: 'none', alignItems: 'center', justifyContent: 'space-around',
      padding: '11px 20px',
      borderTop: 'none',
      background: 'rgba(15,34,51,0.9)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <img src="assets/brandmark-orange.png" alt="" style={{ width: 11, height: 16, display: 'block' }} />
        <span style={{ fontFamily: fontBody, fontSize: 11, color: BC.cream, fontWeight: 400 }}>Meeting Now</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <img src="assets/brandmark-orange.png" alt="" style={{ width: 11, height: 16, display: 'block', opacity: 0.55 }} />
        <span style={{ fontFamily: fontBody, fontSize: 11, color: BC.cream, fontWeight: 400 }}>Future House Churches</span>
      </div>
    </div>
    </div>
  );
}

function MapLegend() {
  // retained but unused — legend moved back inside map
  return null;
}

function HouseChurchesPage({ onNav, anchor }) {
  const [selected, setSelected] = React.useState(null);

  // Jump to a section (e.g. future locations) when navigated here with an anchor
  React.useEffect(() => {
    if (!anchor) return;
    const el = document.getElementById(anchor);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'instant' });
  }, [anchor]);

  const filtered = ALL_HOUSE_CHURCHES;

  return (
    <>
      {/* HERO */}
      <div style={{ background: BC.navy, padding: '100px 48px 88px', position: 'relative', overflow: 'hidden' }}>
        <img src={TOPO.navyOrange} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4 }} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 1200, margin: '0 auto' }}>
          <Eyebrow>House Churches</Eyebrow>
          <h1 style={{ fontFamily: fontDisplay, fontSize: 'clamp(52px, 8vw, 108px)', fontWeight: 800, color: BC.cream, letterSpacing: '-0.03em', lineHeight: 0.98, marginBottom: 24 }}>
            One church,<br/><span style={{ fontStyle: 'italic', fontWeight: 300, color: BC.orange, whiteSpace: 'nowrap' }}>many house churches.</span>
          </h1>
          <p style={{ fontFamily: fontBody, fontSize: 20, color: 'rgba(249,237,214,0.8)', lineHeight: 1.6, maxWidth: 680, fontWeight: 300 }}>
            We meet in house churches each week so every person is known by name and cared for by a pastor who actually knows them.
          </p>
        </div>
      </div>

      {/* WHEN WE GATHER — three things, plainly */}
      <section style={{ background: BC.white, padding: '88px 48px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ marginBottom: 64, maxWidth: 760 }}>
            <Eyebrow>Inside a house church</Eyebrow>
            <h2 style={{ fontFamily: fontDisplay, fontSize: 'clamp(40px, 5vw, 56px)', fontWeight: 800, color: BC.navy, letterSpacing: '-0.025em', lineHeight: 1.0, marginTop: 10, marginBottom: 24 }}>
              A place to know,<br /><span style={{ fontStyle: 'italic', fontWeight: 300, color: BC.orange }}>and be known.</span>
            </h2>
            <p style={{ fontFamily: fontBody, fontSize: 17, color: BC.navyMuted, lineHeight: 1.65, fontWeight: 300, margin: 0 }}>
              House churches are how we care for one another and grow together. They&rsquo;re the people who know you by name, who bring meals after a new baby, show up on moving day, sit with you in the hospital, and stand with you at the funeral. Whether you&rsquo;ve followed Jesus your whole life, are exploring faith for the first time, or somewhere in between, everyone needs this kind of community.
            </p>
          </div>

          {/* Three pillars on a dashed line */}
          <div style={{ position: 'relative' }}>
            <div data-bc-pillar-line style={{ position: 'absolute', top: 7, left: 0, right: 0, borderTop: `1px dashed ${BC.navyMuted}`, opacity: 0.35 }} />

            <div data-bc-pillars style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0 }}>
              {[
                { roman: 'I',   label: 'A meal together',             body: "We share a meal every week\u2014whatever the host is cooking, plus whatever others bring. It's unhurried and easy. You catch up on the week, meet the people sitting next to you, and there's always a seat saved for someone new. If it's your first time, you don't need to bring anything\u2014just come." },
                { roman: 'II',  label: 'A discussion in Scripture',   body: "We open the Bible together and talk through that week's passage\u2014usually the same one preached on Sunday. The discussion is about the passage itself, not the sermon, so anyone can ask questions, share what stood out, or just listen. You don't need to know the Bible well or to have been at Sunday's gathering\u2014bring your questions and your curiosity." },
                { roman: 'III', label: 'Prayer for one another',      body: "We close the night by praying for each other. People share what's actually going on\u2014burdens, hopes, decisions, things they're wrestling with\u2014and the group prays for them right there. If praying out loud isn't familiar to you, no one will put you on the spot. You're invited to share whenever you're ready." },
              ].map((m, i) => {
                const isFirst = i === 0;
                const isLast = i === 2;
                return (
                  <div
                    key={m.roman}
                    data-bc-pillar
                    style={{
                      position: 'relative',
                      paddingTop: 36,
                      paddingLeft: isFirst ? 0 : 40,
                      paddingRight: isLast ? 0 : 40,
                      borderRight: !isLast ? `1px solid ${BC.border}` : 'none',
                    }}
                  >
                    <div data-bc-pillar-dot style={{
                      position: 'absolute',
                      top: 0,
                      left: isFirst ? 0 : 40,
                      width: 14, height: 14, borderRadius: '50%',
                      background: BC.orange,
                      boxShadow: `0 0 0 4px ${BC.white}`,
                    }} />
                    <div style={{
                      fontFamily: fontDisplay, fontSize: 11, fontWeight: 700,
                      color: BC.orange, letterSpacing: '0.28em', marginBottom: 14,
                    }}>
                      {m.roman}
                    </div>
                    <h3 style={{
                      fontFamily: fontDisplay, fontSize: 26, fontWeight: 700,
                      color: BC.navy, letterSpacing: '-0.015em', lineHeight: 1.15,
                      marginBottom: 16, marginTop: 0,
                    }}>
                      {m.label}
                    </h3>
                    <p style={{
                      fontFamily: fontBody, fontSize: 16, color: BC.navyMuted,
                      lineHeight: 1.7, fontWeight: 300, margin: 0,
                    }}>
                      {m.body}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* FINDER */}
      <section style={{ background: BC.creamSubtle, padding: '48px 48px 100px', position: 'relative', overflow: 'hidden' }}>
        <img src={TOPO.cream} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.35, pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 1200, margin: '0 auto' }}>
          {/* Join prompt */}
          <div style={{ marginBottom: 56, textAlign: 'center', maxWidth: 680, marginLeft: 'auto', marginRight: 'auto' }}>
            <Eyebrow style={{ justifyContent: 'center' }}>Ready to give it a shot?</Eyebrow>
            <h2 style={{ fontFamily: fontDisplay, fontSize: 'clamp(38px, 5vw, 56px)', fontWeight: 800, color: BC.navy, letterSpacing: '-0.03em', lineHeight: 1.0, marginTop: 10, marginBottom: 20 }}>
              Find yours below.
            </h2>
            <p style={{ fontFamily: fontBody, fontSize: 17, color: BC.navyMuted, lineHeight: 1.65, fontWeight: 300, margin: 0 }}>
              Pick the house church closest to where you live below and fill out the short form. From there, the house church pastor will reach out personally to invite you to the next gathering.
            </p>
          </div>

          {/* Content */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 24 }}>
            <div>
              <MapView filtered={filtered} launching={LAUNCHING_SOON} selected={selected} setSelected={setSelected} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {filtered.map(hc => (
                <HouseChurchCard key={hc.num} hc={hc} selected={selected === hc.num} onSelect={setSelected} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FUTURE LOCATIONS */}
      <section id="future-locations" style={{ background: BC.navy, padding: '100px 48px', position: 'relative', overflow: 'hidden', scrollMarginTop: 80 }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url(${TOPO.navy})`,
          backgroundSize: '1600px auto',
          backgroundPosition: 'center top',
          backgroundRepeat: 'repeat-y',
          opacity: 0.4, pointerEvents: 'none',
        }} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ marginBottom: 48 }}>
            <Eyebrow>Future Locations</Eyebrow>
            <h2 style={{ fontFamily: fontDisplay, fontSize: 52, fontWeight: 800, color: BC.cream, letterSpacing: '-0.025em', lineHeight: 1.05, maxWidth: 600 }}>
              What's next.
            </h2>
            <p style={{ fontFamily: fontBody, fontSize: 17, color: 'rgba(249,237,214,0.8)', lineHeight: 1.7, marginTop: 16, maxWidth: 540, fontWeight: 300 }}>
              Here are some of the places we're praying will have a house church soon. Join the email list to be the first to know when a house church is launching in that area.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16, alignItems: 'start' }}>
            {LAUNCHING_SOON.map(hc => (
              <WaitlistCard key={hc.num} hc={hc} />
            ))}
          </div>
        </div>
      </section>

      {/* CANT FIND CTA */}
      <section style={{ background: BC.white, padding: '100px 48px', textAlign: 'center' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <Eyebrow style={{ justifyContent: 'center' }}>Don't see your area?</Eyebrow>
          <h2 style={{ fontFamily: fontDisplay, fontSize: 48, fontWeight: 800, color: BC.navy, letterSpacing: '-0.025em', lineHeight: 1.1, marginBottom: 20 }}>
            Host the next one.
          </h2>
          <p style={{ fontFamily: fontBody, fontSize: 18, color: BC.navyMuted, lineHeight: 1.7, marginBottom: 32, fontWeight: 300 }}>
            Every house church begins where someone is willing to open their home. If you believe hospitality is a gift that you've been given and you live somewhere in the region, we'd love to talk.
          </p>
          <Button variant="primary" size="lg" onClick={() => onNav && onNav('host')}>
            Talk to us about hosting <ArrowRight color="#fff" />
          </Button>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: BC.creamSubtle, padding: '120px 48px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <Eyebrow>Common questions</Eyebrow>
          <h2 style={{ fontFamily: fontDisplay, fontSize: 48, fontWeight: 800, color: BC.navy, letterSpacing: '-0.025em', lineHeight: 1.05, marginBottom: 56 }}>
            A few things<br />people ask.
          </h2>
          <FAQList items={[
            { q: 'Is this just a small group or a Bible study?', a: "No \u2014 there\u2019s a real difference. A small group or Bible study is usually one slice of church life: a handful of people meeting around a topic or a book, often connected to a larger Sunday service that does the rest. A house church is the church. We share a meal, discuss Scripture, pray for one another, meet each other’s real needs, and look for ways to serve the people around us. The Sunday gathering and the house church are two halves of the same thing, not a service plus an add-on." },
            { q: 'Is this weird?', a: "Fair question — “church in a house” can sound that way. We’re an ordinary Christian church that believes the early church’s pattern of homes and gatherings is worth recovering. Every house church is connected to the same leadership, teaching, and oversight, and our Sunday gathering is fully public. Come see for yourself — no strings attached." },
            { q: 'What actually happens at a house church?', a: 'A shared meal, a discussion in Scripture, prayer for one another, and real conversation about life. Always space to ask questions. It\u2019s closer to a family dinner than a service.' },
            { q: 'Do I need to believe in anything to come?', a: 'Nope. You\u2019re welcome whether you\u2019re a lifelong Christian, totally skeptical, or somewhere in between. Bring your questions \u2014 house church is a great place for them.' },
            { q: 'Do I need to bring anything?', a: 'Just yourself. If the host is doing a meal and you\u2019re able, bringing a dish or drink to share is always appreciated \u2014 but never required.' },
            { q: 'What about my kids?', a: 'Kids are part of it. They\u2019re welcome in the gathering with you. Each house church handles kids a little differently depending on who\u2019s there \u2014 the host can fill you in.' },
            { q: 'Do I have to commit to anything?', a: 'No. Come check it out. If it\u2019s a fit, keep coming. If it\u2019s not, no pressure either way.' },
            { q: 'How is this different from Sunday gatherings?', a: 'On Sunday, we gather as one church \u2014 singing, teaching, and communion (bread and cup, remembering Jesus \u2014 guests are free to simply pass it along). At house church, we gather around a table in a home \u2014 a meal, a discussion in Scripture, and prayer for one another. Neither one is the main event; they\u2019re two halves of the same week, and you\u2019re welcome to start with either.' },
          ]} />
        </div>
      </section>

    </>
  );
}

Object.assign(window, { HouseChurchesPage });
