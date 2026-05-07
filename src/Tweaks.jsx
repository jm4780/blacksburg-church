// Blacksburg Church — Tweaks Panel

function TweaksPanel({ tweaks, setTweak }) {
  const [collapsed, setCollapsed] = React.useState(false);
  return (
    <div style={{
      position: 'fixed', right: 20, bottom: 20, zIndex: 200,
      background: BC.navyDark, color: BC.cream,
      borderRadius: 6, border: `1px solid rgba(249,237,214,0.15)`,
      boxShadow: '0 12px 40px rgba(0,0,0,0.35)',
      width: collapsed ? 180 : 280, overflow: 'hidden',
      fontFamily: fontDisplay,
    }}>
      <div style={{
        padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        borderBottom: collapsed ? 'none' : '1px solid rgba(249,237,214,0.1)',
        cursor: 'pointer',
      }} onClick={() => setCollapsed(c => !c)}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: BC.orange }} />
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase' }}>Tweaks</span>
        </div>
        <span style={{ fontSize: 16, color: 'rgba(249,237,214,0.5)' }}>{collapsed ? '+' : '–'}</span>
      </div>
      {!collapsed && (
        <div style={{ padding: 16, display: 'grid', gap: 16 }}>
          <TweakGroup label="Home hero">
            {[
              ['topo', 'Topo'],
              ['photo', 'Photo'],
              ['type', 'Type'],
            ].map(([v, l]) => (
              <TweakPill key={v} active={tweaks.heroVariant === v} onClick={() => setTweak('heroVariant', v)}>{l}</TweakPill>
            ))}
          </TweakGroup>
          <TweakGroup label="Announcement bar">
            <TweakPill active={tweaks.announcementBar} onClick={() => setTweak('announcementBar', true)}>On</TweakPill>
            <TweakPill active={!tweaks.announcementBar} onClick={() => setTweak('announcementBar', false)}>Off</TweakPill>
          </TweakGroup>
          <div style={{ fontFamily: fontBody, fontSize: 11, color: 'rgba(249,237,214,0.5)', lineHeight: 1.5, paddingTop: 4, borderTop: '1px solid rgba(249,237,214,0.08)' }}>
            Changes persist to the file automatically.
          </div>
        </div>
      )}
    </div>
  );
}

function TweakGroup({ label, children }) {
  return (
    <div>
      <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(249,237,214,0.5)', marginBottom: 8 }}>
        {label}
      </div>
      <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>{children}</div>
    </div>
  );
}
function TweakPill({ active, onClick, children }) {
  return (
    <button onClick={onClick} style={{
      padding: '6px 12px', borderRadius: 3, cursor: 'pointer',
      background: active ? BC.orange : 'rgba(249,237,214,0.08)',
      color: active ? BC.white : BC.cream,
      border: `1px solid ${active ? BC.orange : 'rgba(249,237,214,0.15)'}`,
      fontFamily: fontDisplay, fontSize: 11, fontWeight: 600, letterSpacing: '0.05em',
    }}>{children}</button>
  );
}

Object.assign(window, { TweaksPanel });
