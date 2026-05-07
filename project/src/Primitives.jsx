// Blacksburg Church — Shared Primitives (colors, type, Button, Eyebrow, Section)

const BC = {
  navy:        '#1D3A4F',
  navyDark:    '#0F2233',
  navyMuted:   '#2D4F66',
  orange:      '#F58220',
  orangeDark:  '#D96E10',
  cream:       '#F9EDD6',
  creamDark:   '#EDD9B4',
  creamSubtle: '#FDF8F1',
  white:       '#FFFFFF',
  border:      '#E8D9BC',
  muted:       '#6B7E8A',
};

const fontDisplay = "'Montserrat', 'Helvetica Neue', sans-serif";
const fontBody    = "'Söhne', 'Helvetica Neue', sans-serif";

// ── BUTTON ─────────────────────────────────────────────────
function Button({ children, variant = 'primary', size = 'md', style: extra = {}, onClick, as: Tag = 'button', href }) {
  const [hover, setHover] = React.useState(false);
  const [down, setDown] = React.useState(false);
  const base = {
    display: 'inline-flex', alignItems: 'center', gap: 8,
    fontFamily: fontDisplay, fontWeight: 600, letterSpacing: '0.04em',
    border: 'none', cursor: 'pointer', textDecoration: 'none',
    transition: 'transform 150ms cubic-bezier(0.25,0.1,0.25,1), background-color 150ms, color 150ms, border-color 150ms',
    whiteSpace: 'nowrap', borderRadius: 4,
    transform: down ? 'scale(0.97)' : 'scale(1)',
  };
  const sizes = {
    sm: { padding: '8px 16px', fontSize: 12 },
    md: { padding: '12px 24px', fontSize: 14 },
    lg: { padding: '16px 32px', fontSize: 15 },
    xl: { padding: '20px 36px', fontSize: 16 },
  };
  const variants = {
    primary:        { background: hover ? BC.orangeDark : BC.orange, color: BC.white },
    navy:           { background: hover ? BC.navyDark : BC.navy,  color: BC.cream },
    outline:        { background: hover ? BC.navy : 'transparent', color: hover ? BC.cream : BC.navy, border: `1.5px solid ${BC.navy}` },
    outlineOrange:  { background: hover ? BC.orange : 'transparent', color: hover ? BC.white : BC.orange, border: `1.5px solid ${BC.orange}` },
    ghost:          { background: hover ? 'rgba(29,58,79,0.06)' : 'transparent', color: BC.navy },
    onDark:         { background: hover ? BC.orangeDark : BC.orange, color: BC.white },
    outlineDark:    { background: hover ? 'rgba(249,237,214,0.1)' : 'transparent', color: BC.cream, border: `1.5px solid rgba(249,237,214,0.4)` },
  };
  const props = {
    style: { ...base, ...sizes[size], ...variants[variant], ...extra },
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => { setHover(false); setDown(false); },
    onMouseDown: () => setDown(true),
    onMouseUp: () => setDown(false),
    onClick,
  };
  if (Tag === 'a') return <a href={href} {...props}>{children}</a>;
  return <button {...props}>{children}</button>;
}

// ── EYEBROW ────────────────────────────────────────────────
function Eyebrow({ children, style: extra = {} }) {
  return (
    <div style={{
      fontFamily: fontDisplay, fontSize: 11, fontWeight: 600,
      letterSpacing: '0.2em', textTransform: 'uppercase',
      color: BC.orange, marginBottom: 14,
      display: 'inline-flex', alignItems: 'center', gap: 8,
      ...extra
    }}>
      <span style={{ width: 24, height: 1, background: BC.orange, display: 'inline-block' }} />
      {children}
    </div>
  );
}

// ── SECTION ────────────────────────────────────────────────
function Section({ children, bg = BC.white, style: extra = {}, py = 96, maxWidth = 1200 }) {
  return (
    <section style={{ background: bg, padding: `${py}px 48px`, ...extra }}>
      <div style={{ maxWidth, margin: '0 auto' }}>
        {children}
      </div>
    </section>
  );
}

// ── REVEAL (intersection observer fade-up) ────────────────
function Reveal({ children, delay = 0, style: extra = {} }) {
  const ref = React.useRef();
  const [visible, setVisible] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); io.disconnect(); } }, { threshold: 0.12 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} style={{
      transform: visible ? 'translateY(0)' : 'translateY(20px)',
      opacity: visible ? 1 : 0,
      transition: `opacity 700ms cubic-bezier(0.25,0.1,0.25,1) ${delay}ms, transform 700ms cubic-bezier(0.25,0.1,0.25,1) ${delay}ms`,
      ...extra
    }}>{children}</div>
  );
}

// ── CHEVRON arrow (used in CTAs) ──────────────────────────
function ArrowRight({ size = 16, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M2 8h12M9 3l5 5-5 5" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// ── TOPO texture image paths helper ───────────────────────
const TOPO = {
  navyOrange: 'assets/topograph-navy-orange.png',
  navy:       'assets/topograph-navy.png',
  creamOrange:'assets/topograph-cream-orange.png',
  cream:      'assets/topograph-cream.png',
  orange:     'assets/topograph-orange.png',
};

Object.assign(window, { BC, fontDisplay, fontBody, Button, Eyebrow, Section, Reveal, ArrowRight, TOPO });
