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

function HouseChurchCard({ hc, selected, onSelect, onConnect }) {
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
        {selected && (
          <div style={{ marginTop: 18, paddingTop: 18, borderTop: `1px solid ${BC.border}` }}>
            <Button variant="primary" size="sm" onClick={(e) => { e.stopPropagation(); onConnect && onConnect(); }}>
              Request to join N° {hc.num} <ArrowRight color="#fff" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

function MapView({ filtered, launching, selected, setSelected }) {
  return (
    <div style={{
      position: 'relative', aspectRatio: '4/3', background: BC.navy,
      borderRadius: 4, border: `1px solid ${BC.border}`,
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
              <div style={{
                position: 'absolute',
                left: '50%',
                ...(hc.y < 15
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

      {/* Legend — bottom-right, compact */}
      <div style={{
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
      <div style={{ position: 'absolute', left: 16, top: 16, fontFamily: fontDisplay, fontSize: 10, color: 'rgba(249,237,214,0.7)', letterSpacing: '0.2em', textTransform: 'uppercase', background: 'rgba(15,34,51,0.6)', padding: '6px 10px', borderRadius: 4, backdropFilter: 'blur(6px)' }}>
        New River Valley
      </div>
    </div>
  );
}

function MapLegend() {
  // retained but unused — legend moved back inside map
  return null;
}

function HouseChurchesPage({ onNav }) {
  const [selected, setSelected] = React.useState(null);

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
            We meet in house churches weekly, where every person can be personally known and pastored. House church is designed around five things: a meal, scripture, prayer, relationships, and real-life discipleship. Everyone's welcome — whether you're curious, skeptical, somewhere in between, or have been following Jesus for years.
          </p>
        </div>
      </div>

      {/* FINDER */}
      <section style={{ background: BC.creamSubtle, padding: '48px 48px 100px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          {/* Join prompt */}
          <div style={{ marginBottom: 40 }}>
            <Eyebrow>Ready to give it a shot?</Eyebrow>
            <h2 style={{ fontFamily: fontDisplay, fontSize: 38, fontWeight: 800, color: BC.navy, letterSpacing: '-0.025em', lineHeight: 1.08, marginTop: 10, marginBottom: 28, maxWidth: 720 }}>
              Three steps to your first gathering.
            </h2>
            <ol style={{
              listStyle: 'none', padding: 0, margin: 0,
              display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0,
              borderTop: `1px solid ${BC.border}`,
            }}>
              {[
                'Use the map below to identify the house church closest to where you live.',
                'Select it from the options on the right and fill out the form.',
                "You'll be contacted by the house church pastor and invited to the next gathering.",
              ].map((text, i) => (
                <li
                  key={i}
                  style={{
                    padding: '22px 28px 22px 0',
                    borderRight: i < 2 ? `1px solid ${BC.border}` : 'none',
                    paddingLeft: i > 0 ? 28 : 0,
                  }}
                >
                  <div style={{
                    fontFamily: fontDisplay, fontSize: 10, fontWeight: 600,
                    letterSpacing: '0.22em', color: BC.orange, marginBottom: 10,
                  }}>STEP 0{i + 1}</div>
                  <div style={{ fontFamily: fontBody, fontSize: 15, color: BC.navy, fontWeight: 400, lineHeight: 1.55 }}>
                    {text}
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Content */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 24 }}>
            <div>
              <MapView filtered={filtered} launching={LAUNCHING_SOON} selected={selected} setSelected={setSelected} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {filtered.map(hc => (
                <HouseChurchCard key={hc.num} hc={hc} selected={selected === hc.num} onSelect={setSelected} onConnect={() => onNav && onNav('connect')} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* LAUNCHING SOON */}
      <section style={{ background: BC.cream, padding: '100px 48px', position: 'relative', overflow: 'hidden' }}>
        <img src={TOPO.creamOrange} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.35, pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ marginBottom: 48 }}>
            <Eyebrow>Launching Soon</Eyebrow>
            <h2 style={{ fontFamily: fontDisplay, fontSize: 52, fontWeight: 800, color: BC.navy, letterSpacing: '-0.025em', lineHeight: 1.05, maxWidth: 600 }}>
              What's next.
            </h2>
            <p style={{ fontFamily: fontBody, fontSize: 17, color: BC.navyMuted, lineHeight: 1.7, marginTop: 16, maxWidth: 540, fontWeight: 300 }}>
              Here are some of the places we're praying will have a house church soon. Join the email list to be the first to know when a house church is launching in that area.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
            {LAUNCHING_SOON.map(hc => (
              <div key={hc.num} style={{
                background: BC.white, border: `1px dashed ${BC.navyMuted}`, borderRadius: 4,
                padding: '24px 22px', display: 'flex', flexDirection: 'column', gap: 8,
                minHeight: 180,
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: fontDisplay, fontSize: 22, fontWeight: 700, color: BC.navy, letterSpacing: '-0.01em', lineHeight: 1.15 }}>
                      {hc.name}
                    </div>
                    <div style={{ fontFamily: fontBody, fontSize: 13, color: BC.navyMuted, fontWeight: 300, marginTop: 4 }}>
                      {hc.town}
                    </div>
                  </div>
                  <div style={{ fontFamily: fontDisplay, fontSize: 9, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: BC.navyMuted, background: BC.creamSubtle, padding: '3px 8px', borderRadius: 2, flexShrink: 0, marginTop: 4 }}>
                    {hc.launch}
                  </div>
                </div>
                <div style={{ marginTop: 'auto', paddingTop: 12, borderTop: `1px solid ${BC.border}` }}>
                  <button
                    onClick={() => onNav && onNav('connect')}
                    style={{
                      background: 'none', border: 'none', padding: 0, cursor: 'pointer',
                      fontFamily: fontDisplay, fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase',
                      color: BC.orange, display: 'flex', alignItems: 'center', gap: 8,
                    }}
                  >
                    Get on the list <ArrowRight color={BC.orange} size={12} />
                  </button>
                </div>
              </div>
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
          <Button variant="primary" size="lg" onClick={() => onNav && onNav('connect')}>
            Talk to us about hosting <ArrowRight color="#fff" />
          </Button>
        </div>
      </section>
    </>
  );
}

Object.assign(window, { HouseChurchesPage });
