// Blacksburg Church — DeviceFrame toggle
// Renders a fixed bottom-right pill that toggles the app between
// Desktop and Mobile preview. In Mobile mode, the app is wrapped
// in an iPhone-style bezel at 390x844 (iPhone 14 viewport).

function useDevice() {
  const [device, setDevice] = React.useState(() => localStorage.getItem('bc-device') || 'desktop');
  React.useEffect(() => { localStorage.setItem('bc-device', device); }, [device]);
  return [device, setDevice];
}

function DeviceToggle({ device, setDevice }) {
  const pill = {
    position: 'fixed', bottom: 20, right: 20, zIndex: 10000,
    background: 'rgba(15,34,51,0.95)', backdropFilter: 'blur(8px)',
    borderRadius: 999, padding: 4, display: 'flex', gap: 2,
    boxShadow: '0 8px 28px rgba(15,34,51,0.35), 0 0 0 1px rgba(249,237,214,0.1)',
    fontFamily: "'Montserrat', sans-serif",
  };
  const btn = (active) => ({
    padding: '8px 16px', fontSize: 12, fontWeight: 600, letterSpacing: '0.04em',
    border: 'none', borderRadius: 999, cursor: 'pointer',
    background: active ? '#F58220' : 'transparent',
    color: active ? '#fff' : 'rgba(249,237,214,0.75)',
    display: 'inline-flex', alignItems: 'center', gap: 6,
    transition: 'background 180ms, color 180ms',
  });
  return (
    <div style={pill}>
      <button style={btn(device === 'desktop')} onClick={() => setDevice('desktop')}>
        <DesktopIcon /> Desktop
      </button>
      <button style={btn(device === 'mobile')} onClick={() => setDevice('mobile')}>
        <PhoneIcon /> Mobile
      </button>
    </div>
  );
}

function DesktopIcon() {
  return <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><rect x="1.5" y="2.5" width="13" height="9" rx="1" stroke="currentColor" strokeWidth="1.3"/><path d="M6 14h4M8 11.5V14" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>;
}
function PhoneIcon() {
  return <svg width="11" height="13" viewBox="0 0 12 16" fill="none"><rect x="1.5" y="1.5" width="9" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.3"/><circle cx="6" cy="12.5" r="0.7" fill="currentColor"/></svg>;
}

// iPhone bezel wrapping the app content
function MobileBezel({ children }) {
  const W = 390, H = 844;
  // Scale to fit viewport: leave room for toggle (80px bottom) + 40 top padding.
  const [scale, setScale] = React.useState(1);
  React.useEffect(() => {
    const recalc = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const maxW = Math.min(vw - 80, 480);
      const maxH = vh - 120;
      const s = Math.min(maxW / W, maxH / H, 1);
      setScale(s);
    };
    recalc();
    window.addEventListener('resize', recalc);
    return () => window.removeEventListener('resize', recalc);
  }, []);

  return (
    <div style={{
      position: 'fixed', inset: 0, background: '#1a1a1a',
      backgroundImage: 'radial-gradient(ellipse at center, #2a2a2a 0%, #0f0f0f 100%)',
      display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
      paddingTop: 40, zIndex: 5, overflow: 'auto',
    }}>
      <div style={{
        width: W * scale,
        height: H * scale,
        position: 'relative',
        marginBottom: 120,
      }}>
        {/* Outer bezel */}
        <div style={{
          width: W, height: H,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          position: 'absolute', top: 0, left: 0,
          background: '#0a0a0a',
          borderRadius: 54,
          padding: 12,
          boxShadow: '0 30px 80px rgba(0,0,0,0.6), 0 0 0 2px #2a2a2a, inset 0 0 0 1px rgba(255,255,255,0.06)',
        }}>
          {/* Side buttons */}
          <div style={{ position: 'absolute', left: -3, top: 110, width: 3, height: 32, background: '#1a1a1a', borderRadius: '2px 0 0 2px' }} />
          <div style={{ position: 'absolute', left: -3, top: 160, width: 3, height: 56, background: '#1a1a1a', borderRadius: '2px 0 0 2px' }} />
          <div style={{ position: 'absolute', left: -3, top: 230, width: 3, height: 56, background: '#1a1a1a', borderRadius: '2px 0 0 2px' }} />
          <div style={{ position: 'absolute', right: -3, top: 170, width: 3, height: 90, background: '#1a1a1a', borderRadius: '0 2px 2px 0' }} />

          {/* Screen */}
          <div style={{
            width: '100%', height: '100%',
            borderRadius: 44,
            overflow: 'hidden',
            background: '#fff',
            position: 'relative',
          }}>
            {/* Status bar */}
            <div style={{
              height: 44, background: 'transparent',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '0 24px', position: 'absolute', top: 0, left: 0, right: 0, zIndex: 500,
              pointerEvents: 'none',
              fontFamily: "'Montserrat', sans-serif", fontSize: 15, fontWeight: 600, color: '#1D3A4F',
            }}>
              <span>9:41</span>
              <span style={{ display: 'inline-flex', gap: 5, alignItems: 'center' }}>
                {/* signal */}
                <svg width="17" height="10" viewBox="0 0 17 10" fill="currentColor"><rect x="0" y="7" width="3" height="3" rx="0.5"/><rect x="5" y="5" width="3" height="5" rx="0.5"/><rect x="10" y="2" width="3" height="8" rx="0.5"/><rect x="15" y="0" width="2" height="10" rx="0.5" opacity="0.4"/></svg>
                {/* wifi */}
                <svg width="16" height="11" viewBox="0 0 16 11" fill="none"><path d="M8 10.5a1.1 1.1 0 100-2.2 1.1 1.1 0 000 2.2z" fill="currentColor"/><path d="M3.5 6a6 6 0 019 0" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/><path d="M1 3.4a10 10 0 0114 0" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
                {/* battery */}
                <svg width="27" height="11" viewBox="0 0 27 11" fill="none"><rect x="0.5" y="0.5" width="22" height="10" rx="2.5" stroke="currentColor" opacity="0.5"/><rect x="2" y="2" width="19" height="7" rx="1.2" fill="currentColor"/><rect x="23.5" y="3.5" width="1.5" height="4" rx="0.75" fill="currentColor" opacity="0.5"/></svg>
              </span>
            </div>
            {/* Dynamic Island */}
            <div style={{
              position: 'absolute', top: 11, left: '50%', transform: 'translateX(-50%)',
              width: 120, height: 34, background: '#000', borderRadius: 20, zIndex: 501,
            }} />

            {/* Scrollable app content */}
            <div style={{
              width: '100%', height: '100%',
              overflowY: 'auto', overflowX: 'hidden',
              WebkitOverflowScrolling: 'touch',
              paddingTop: 44,
            }}>
              {children}
            </div>

            {/* Home indicator */}
            <div style={{
              position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)',
              width: 134, height: 5, background: '#1D3A4F', opacity: 0.45, borderRadius: 3, zIndex: 500,
            }} />
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { useDevice, DeviceToggle, MobileBezel });
