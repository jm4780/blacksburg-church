// Blacksburg Church — Nav + Footer + Announcement bar

const NAV_LINKS = [
  { label: 'Who we are',        slug: 'about' },
  { label: 'House Churches',    slug: 'house-churches' },
  { label: 'Sunday Gatherings', slug: 'gatherings' },
  { label: 'Messages',          slug: 'messages' },
  { label: 'Partners',          slug: 'partners' },
  { label: 'Give',              slug: 'give' },
];

function Announcement({ onNav }) {
  return (
    <div data-bc-announce style={{
      background: BC.navyDark, color: BC.cream,
      fontFamily: fontBody, fontSize: 12, fontWeight: 400,
      padding: '8px 24px', textAlign: 'center',
      borderBottom: '1px solid rgba(249,237,214,0.08)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
    }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: BC.orange, display: 'inline-block' }} />
      <span style={{ color: 'rgba(249,237,214,0.85)' }}>Sundays at 10:00am · 200 Miller St, Blacksburg</span>
      <a href="#" onClick={(e) => { e.preventDefault(); onNav && onNav('connect', { mode: 'visit' }); }} style={{
        color: BC.orange, fontFamily: fontDisplay, fontWeight: 600, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase',
        textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4,
      }}>
        Be our guest <ArrowRight size={10} />
      </a>
    </div>
  );
}

function Nav({ dark = false, activePage = 'home', onNav, transparent = false }) {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    h(); window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  const onDark = dark;
  const bg = dark ? BC.navy : BC.white;
  const borderCol = dark ? 'rgba(249,237,214,0.1)' : BC.border;

  const logoSrc = onDark ? 'assets/logo-horizontal-cream-orange.png' : 'assets/logo-horizontal-navy-orange.png';

  return (
    <nav data-bc-nav style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 48px', height: 72,
      background: bg,
      borderBottom: `1px solid ${borderCol}`,
      position: 'sticky', top: 0, zIndex: 100,
      transition: 'background-color 300ms, border-color 300ms',
    }}>
      <a href="#" onClick={(e) => { e.preventDefault(); onNav && onNav('home'); }} style={{ display: 'flex', alignItems: 'center' }}>
        <img src={logoSrc} alt="Blacksburg Church" style={{ height: 44 }} />
      </a>

      <div data-bc-navlinks style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
        {NAV_LINKS.map((l) => {
          const active = activePage === l.slug;
          return (
            <a key={l.slug} href="#" onClick={e => { e.preventDefault(); onNav && onNav(l.slug); }} style={{
              fontFamily: fontDisplay, fontSize: 13, fontWeight: 500,
              letterSpacing: '0.03em', textDecoration: 'none',
              color: active ? BC.orange : (onDark ? 'rgba(249,237,214,0.85)' : BC.navy),
              position: 'relative', padding: '6px 0',
              transition: 'color 150ms',
            }}
              onMouseEnter={e => { if (!active) e.currentTarget.style.color = BC.orange; }}
              onMouseLeave={e => { if (!active) e.currentTarget.style.color = onDark ? 'rgba(249,237,214,0.85)' : BC.navy; }}
            >
              {l.label}
              {active && <span style={{ position: 'absolute', bottom: -2, left: 0, right: 0, height: 2, background: BC.orange }} />}
            </a>
          );
        })}
      </div>

      <button data-bc-navcta onClick={() => onNav && onNav('connect')} style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        fontFamily: fontDisplay, fontWeight: 600, letterSpacing: '0.04em',
        border: 'none', cursor: 'pointer', borderRadius: 4,
        padding: '8px 16px', fontSize: 12,
        background: BC.orange, color: BC.white,
      }}>
        Get connected <ArrowRight size={12} color="#fff" />
      </button>
    </nav>
  );
}

// Mobile full-screen menu overlay
function MobileMenu({ onClose, activePage, onNav }) {
  React.useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);
  const pick = (slug) => { onNav && onNav(slug); onClose(); };
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 200, background: BC.navyDark,
      display: 'flex', flexDirection: 'column',
      animation: 'bcFadeIn 220ms ease-out',
    }}>
      <style>{`@keyframes bcFadeIn { from { opacity: 0; } to { opacity: 1; } }`}</style>
      <img src={TOPO.navyOrange} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.2, pointerEvents: 'none' }} />
      <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px', height: 60 }}>
        <img src="assets/logo-horizontal-cream-orange.png" alt="Blacksburg Church" style={{ height: 32 }} />
        <button onClick={onClose} aria-label="Close" style={{
          background: 'transparent', border: 'none', cursor: 'pointer', color: BC.cream,
          width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M3 3l16 16M19 3L3 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
        </button>
      </div>
      <div style={{ position: 'relative', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 28px' }}>
        {NAV_LINKS.map((l, i) => {
          const active = activePage === l.slug;
          return (
            <a key={l.slug} href="#" onClick={e => { e.preventDefault(); pick(l.slug); }} style={{
              fontFamily: fontDisplay, fontSize: 34, fontWeight: 700,
              letterSpacing: '-0.02em', textDecoration: 'none',
              color: active ? BC.orange : BC.cream,
              padding: '14px 0',
              borderBottom: i === NAV_LINKS.length - 1 ? 'none' : '1px solid rgba(249,237,214,0.1)',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              {l.label}
              <ArrowRight size={18} color={active ? BC.orange : 'rgba(249,237,214,0.4)'} />
            </a>
          );
        })}
      </div>
      <div style={{ position: 'relative', padding: '24px 20px 32px', borderTop: '1px solid rgba(249,237,214,0.1)' }}>
        <button onClick={() => pick('connect')} style={{
          width: '100%', padding: '16px 24px', background: BC.orange, color: BC.white,
          fontFamily: fontDisplay, fontWeight: 600, fontSize: 14, letterSpacing: '0.04em',
          border: 'none', borderRadius: 4, cursor: 'pointer',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        }}>
          Connect <ArrowRight size={14} color="#fff" />
        </button>
        <div style={{ marginTop: 16, fontFamily: fontBody, fontSize: 12, color: 'rgba(249,237,214,0.55)', textAlign: 'center', fontWeight: 300 }}>
          Sundays 10:00am · Blacksburg Public Library
        </div>
      </div>
    </div>
  );
}

function Footer({ onNav }) {
  const cols = [
    { title: 'Explore', items: [
      ['Who we are', 'about'],
      ['House Churches', 'house-churches'],
      ['Sunday Gatherings', 'gatherings'],
      ['Messages', 'messages'],
    ]},
    { title: 'Connect', items: [
      ["Connect", 'connect'],
      ['Give', 'give'],
      ['Contact', 'connect'],
    ]},
  ];

  return (
    <footer style={{
      background: BC.navyDark, padding: '80px 48px 32px',
      position: 'relative', overflow: 'hidden',
    }}>
      <img src={TOPO.navy} alt="" style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%',
        objectFit: 'cover', opacity: 0.15, pointerEvents: 'none',
      }} />
      <div style={{ position: 'relative', zIndex: 2, maxWidth: 1200, margin: '0 auto' }}>
        <div data-bc-footer-grid style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1.2fr', gap: 64, marginBottom: 56 }}>
          <div>
            <img src="assets/logo-horizontal-cream-orange.png" alt="Blacksburg Church" style={{ height: 32, marginBottom: 20 }} />
            <p style={{ fontFamily: fontBody, fontSize: 14, color: 'rgba(249,237,214,0.65)', lineHeight: 1.7, maxWidth: 280, fontWeight: 300 }}>
              One church, many house churches. Based in Blacksburg, Virginia — equipping all people to find and follow Jesus.
            </p>
          </div>
          {cols.map(col => (
            <div key={col.title}>
              <div style={{ fontFamily: fontDisplay, fontSize: 11, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: BC.orange, marginBottom: 18 }}>
                {col.title}
              </div>
              {col.items.map(([label, slug]) => (
                <a key={label} href="#" onClick={e => { e.preventDefault(); onNav && onNav(slug); }} style={{
                  display: 'block', fontFamily: fontBody, fontSize: 14,
                  color: 'rgba(249,237,214,0.75)', marginBottom: 10, textDecoration: 'none', fontWeight: 300,
                }}
                  onMouseEnter={e => e.currentTarget.style.color = BC.orange}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(249,237,214,0.75)'}
                >{label}</a>
              ))}
            </div>
          ))}
          <div>
            <div style={{ fontFamily: fontDisplay, fontSize: 11, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: BC.orange, marginBottom: 18 }}>
              Visit us
            </div>
            <div style={{ fontFamily: fontBody, fontSize: 14, color: 'rgba(249,237,214,0.75)', lineHeight: 1.7, fontWeight: 300, marginBottom: 14 }}>
              Sundays at 10:00am<br />
              Blacksburg Public Library<br />
              200 Miller St, Blacksburg, VA 24060
            </div>
            <a href="mailto:hello@blacksburg.church" style={{ fontFamily: fontBody, fontSize: 14, color: BC.orange, textDecoration: 'none', fontWeight: 400 }}>
              hello@blacksburg.church
            </a>
          </div>
        </div>

        {/* Big wordmark */}
        <div data-bc-footer-wordmark style={{
          fontFamily: fontDisplay, fontWeight: 800, fontSize: 'clamp(60px, 12vw, 180px)',
          lineHeight: 0.9, letterSpacing: '-0.04em',
          color: 'rgba(249,237,214,0.08)',
          marginBottom: 40,
          userSelect: 'none',
        }}>
          BLACKSBURG<br />CHURCH
        </div>

        <div data-bc-footer-bottom style={{
          borderTop: '1px solid rgba(249,237,214,0.1)', paddingTop: 24,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16,
        }}>
          <div style={{ fontFamily: fontBody, fontSize: 12, color: 'rgba(249,237,214,0.45)' }}>
            © 2026 Blacksburg Church. A church of house churches.
          </div>
          <div style={{ display: 'flex', gap: 20, fontFamily: fontBody, fontSize: 12, color: 'rgba(249,237,214,0.45)' }}>
            <span>Blacksburg, Virginia</span>
            <span>·</span>
            <span>Instagram</span>
            <span>YouTube</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { Nav, Footer, Announcement, NAV_LINKS });
