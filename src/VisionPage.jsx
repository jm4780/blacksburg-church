// Blacksburg Church — Vision Page
// A manifesto-style page describing where the church is going.
// Linked from About / Who We Are. Not in top nav.
//
// Voice: forward-looking. Every section frames what we HOPE this becomes,
// not just what we mean by it.

// ── HERO ─────────────────────────────────────────────────
function VisionHero() {
  return (
    <div data-bc-pytall style={{ background: BC.navy, padding: '120px 48px 100px', position: 'relative', overflow: 'hidden' }}>
      <img src={TOPO.navyOrange} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.35, pointerEvents: 'none' }} />
      <div style={{ position: 'relative', zIndex: 2, maxWidth: 1200, margin: '0 auto' }}>
        <Eyebrow>Vision</Eyebrow>
        <h1 data-bc-h1-xl style={{ fontFamily: fontDisplay, fontSize: 'clamp(56px, 9vw, 132px)', fontWeight: 800, color: BC.cream, letterSpacing: '-0.035em', lineHeight: 0.94, marginBottom: 32, maxWidth: 1100 }}>
          What He's put<br /><span style={{ fontStyle: 'italic', fontWeight: 300, color: BC.orange }}>on our hearts.</span>
        </h1>
        <p style={{ fontFamily: fontBody, fontSize: 21, color: 'rgba(249,237,214,0.85)', lineHeight: 1.6, maxWidth: 760, fontWeight: 300 }}>
          What follows isn't a strategic plan we cooked up. It's a set of convictions God has placed on our hearts for this church in Blacksburg and beyond.
        </p>
      </div>
    </div>
  );
}

// ── SECTION: Equipping resources ────────────────────────
// Umbrella for the kinds of resources we hope to build. Podcast network
// is one of three sub-sections here (rather than its own section), and
// each list is framed as "what we picture" so nothing is committed to.
const EQUIPPING_TYPES = [
  {
    label: 'Guides',
    body: [
      "Helpful frames for the moments that matter — at home, at work, over coffee. For discipling your family, walking with a curious friend, or stepping someone through their first steps of faith.",
    ],
    listLabel: 'The kinds of things we picture',
    listItems: ['Family discipleship', 'Faith conversations', 'First steps', 'Hospitality', 'Marks of a disciple', 'Reading scripture together'],
    listNote: "Directions, not deliverables. We'll build what's needed as we go.",
  },
  {
    label: 'Courses',
    body: [
      "Not another curriculum or program. Short, on-demand answers to the kinds of foundational questions every new believer faces — the kind of thing you hand to a curious friend or watch alongside someone just getting started.",
    ],
    listLabel: 'The kinds of questions we want to answer',
    listItems: ['Prayer', 'Scripture', 'Sharing your story', 'Doubt & questions', 'Worship', 'What it means to follow Jesus'],
    listNote: 'A flavor of where we want to start, not a syllabus.',
  },
  {
    label: 'Podcast Network',
    body: [
      "A network of voices speaking to specific people about specific things — what you listen to while you commute, work out, fold laundry, or drive the kids around.",
      "Each show hosted by someone called and compelled to speak to that group. Paired eventually with a single annual conference — the only in-person component. Everything else on demand.",
    ],
    listLabel: 'The kinds of audiences we hope to reach',
    listItems: ['Men', 'Women', 'Marriage', 'Money & finances', 'Leadership', 'Parenting', 'Singleness', 'Vocation'],
    listNote: 'A sense of the landscape. The network grows as the right hosts step forward.',
  },
];

function VisionEquipping() {
  return (
    <section id="equipping" style={{ background: BC.creamSubtle, padding: '120px 48px', position: 'relative', overflow: 'hidden', scrollMarginTop: 40 }}>
      <img src={TOPO.cream} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.32, pointerEvents: 'none' }} />
      <div style={{ position: 'relative', zIndex: 2, maxWidth: 1200, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ maxWidth: 1000, marginBottom: 32 }}>
          <SectionNumber>Conviction One</SectionNumber>
          <Eyebrow>Equipping resources</Eyebrow>
          <h2 style={{ fontFamily: fontDisplay, fontSize: 'clamp(44px, 6.5vw, 100px)', fontWeight: 800, color: BC.navy, letterSpacing: '-0.035em', lineHeight: 0.96, marginBottom: 36 }}>
            Disciples are made<br/><span style={{ fontStyle: 'italic', fontWeight: 300, color: BC.orange }}>in everyday life.</span>
          </h2>
          <p style={{ fontFamily: fontBody, fontSize: 20, color: BC.navy, lineHeight: 1.6, fontWeight: 400, maxWidth: 820, marginBottom: 18 }}>
            We see everything we do as discipleship, but we also believe that the primary means and spaces for making disciples is everyday life.
          </p>
          <p style={{ fontFamily: fontBody, fontSize: 19, color: BC.navyMuted, lineHeight: 1.7, fontWeight: 300, maxWidth: 800 }}>
            We envision developing a library of resources to put in your hands — to help you as you follow Jesus, and help others follow Jesus.
          </p>
        </div>

        {/* Three sub-sections */}
        {EQUIPPING_TYPES.map((t) => (
          <EquippingSub key={t.label} {...t} />
        ))}

      </div>
    </section>
  );
}

// Small section-number lockup that sits above the eyebrow on every Vision section.
function SectionNumber({ children, onDark = false }) {
  return (
    <div style={{
      fontFamily: fontDisplay,
      fontSize: 'clamp(28px, 3vw, 40px)',
      fontWeight: 800,
      color: onDark ? 'rgba(249,237,214,0.18)' : 'rgba(11,28,55,0.14)',
      letterSpacing: '-0.04em',
      lineHeight: 1,
      marginBottom: 20,
    }}>
      {children}
    </div>
  );
}

function EquippingSub({ label, body, listLabel, listItems, listNote }) {
  return (
    <Reveal>
      <div style={{
        paddingTop: 48,
        paddingBottom: 16,
        marginTop: 32,
        borderTop: `2px solid ${BC.orange}`,
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 1fr', gap: 80, alignItems: 'start' }}>
          {/* Left: heading + body */}
          <div>
            <h3 style={{
              fontFamily: fontDisplay,
              fontSize: 'clamp(34px, 4.4vw, 60px)',
              fontWeight: 800,
              color: BC.navy,
              letterSpacing: '-0.03em',
              lineHeight: 1.0,
              marginBottom: 28,
            }}>
              {label}.
            </h3>
            {body.map((p, i) => (
              <p key={i} style={{
                fontFamily: fontBody,
                fontSize: 18,
                color: BC.navyMuted,
                lineHeight: 1.7,
                fontWeight: 300,
                marginBottom: i === body.length - 1 ? 0 : 16,
                maxWidth: 580,
              }}>
                {p}
              </p>
            ))}
          </div>

          {/* Right: loose cluster of topics (intentionally NOT a ranked/numbered list — these are examples of the landscape, not a roadmap) */}
          <div>
            <div style={{
              fontFamily: fontDisplay,
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: BC.orange,
              marginBottom: 18,
              display: 'inline-flex', alignItems: 'center', gap: 10,
            }}>
              <span style={{ width: 20, height: 1, background: BC.orange, display: 'inline-block' }} />
              {listLabel}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 4 }}>
              {listItems.map((item) => (
                <span key={item} style={{
                  fontFamily: fontDisplay,
                  fontSize: 15,
                  fontWeight: 600,
                  color: BC.navy,
                  letterSpacing: '-0.005em',
                  background: BC.white,
                  border: `1px solid ${BC.border}`,
                  borderRadius: 999,
                  padding: '9px 18px',
                  lineHeight: 1.2,
                  whiteSpace: 'nowrap',
                }}>
                  {item}
                </span>
              ))}
              <span style={{
                fontFamily: fontDisplay,
                fontSize: 15,
                fontWeight: 600,
                color: BC.orange,
                letterSpacing: '-0.005em',
                background: 'transparent',
                border: `1px dashed ${BC.orange}`,
                borderRadius: 999,
                padding: '9px 18px',
                lineHeight: 1.2,
                whiteSpace: 'nowrap',
              }}>
                & more
              </span>
            </div>
            <p style={{
              fontFamily: fontBody,
              fontSize: 13,
              color: BC.muted,
              lineHeight: 1.6,
              fontWeight: 300,
              marginTop: 20,
              fontStyle: 'italic',
            }}>
              {listNote}
            </p>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

// ── SECTION: Multiplying ────────────────────────────────
function VisionMultiplying() {
  return (
    <section id="multiplying" style={{ background: BC.navy, padding: '120px 48px', position: 'relative', overflow: 'hidden', scrollMarginTop: 40 }}>
      <img src={TOPO.navy} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.18 }} />
      <div style={{ position: 'relative', zIndex: 2, maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ maxWidth: 1000, marginBottom: 80 }}>
          <SectionNumber onDark>Conviction Two</SectionNumber>
          <Eyebrow>Multiplying</Eyebrow>
          <h2 style={{ fontFamily: fontDisplay, fontSize: 'clamp(44px, 6.5vw, 100px)', fontWeight: 800, color: BC.cream, letterSpacing: '-0.035em', lineHeight: 0.96, marginBottom: 36 }}>
            We only do what is<br/><span style={{ fontStyle: 'italic', fontWeight: 300, color: BC.orange }}>worth multiplying.</span>
          </h2>
          <p style={{ fontFamily: fontBody, fontSize: 20, color: 'rgba(249,237,214,0.88)', lineHeight: 1.6, fontWeight: 400, marginBottom: 18, maxWidth: 760 }}>
            Multiplication is built into the fabric of creation. Every living thing that doesn't multiply, eventually goes extinct.
          </p>
          <p style={{ fontFamily: fontBody, fontSize: 19, color: 'rgba(249,237,214,0.78)', lineHeight: 1.7, fontWeight: 300, maxWidth: 760 }}>
            So we only want to do things worth multiplying. We want to multiply <em style={{ fontWeight: 500, fontStyle: 'normal', color: BC.cream }}>house churches</em>, <em style={{ fontWeight: 500, fontStyle: 'normal', color: BC.cream }}>Sunday gatherings</em>, and <em style={{ fontWeight: 500, fontStyle: 'normal', color: BC.cream }}>ministry partners</em>.
          </p>
        </div>

        {/* Diagram + notes */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.1fr 1fr',
          gap: 72,
          alignItems: 'center',
        }}>
          <Reveal>
            <MultiplicationDiagram />
          </Reveal>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
            <VisionNote
              num="01"
              label="House churches"
              title="They send, not split."
              body="Each new house church begins with a called pastor and a small group sent from another. Multiplication doesn't happen because a room got too crowded — it happens because we're ready."
            />
            <VisionNote
              num="02"
              label="Sunday gatherings"
              title="Closer to home."
              body="As house churches multiply, getting to Sunday can get hard. When the drive becomes impractical, we'll launch a new gathering closer in — with the house churches already in that area."
            />
            <VisionNote
              num="03"
              label="Ministry partners"
              title="Resource over replicate."
              body="We'd rather come alongside ministries already meeting real needs than start our own version of everything. The more good work we can resource, the more good work gets done."
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// Vision-side numbered note (cream on navy variant)
function VisionNote({ num, label, title, body }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '64px 1fr', gap: 24, alignItems: 'start' }}>
      <div style={{
        fontFamily: fontDisplay,
        fontSize: 36,
        fontWeight: 800,
        color: BC.orange,
        letterSpacing: '-0.02em',
        lineHeight: 1,
      }}>{num}</div>
      <div>
        {label && (
          <div style={{
            fontFamily: fontDisplay,
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: BC.orange,
            marginBottom: 8,
          }}>{label}</div>
        )}
        <h4 style={{
          fontFamily: fontDisplay,
          fontSize: 22,
          fontWeight: 700,
          color: BC.cream,
          letterSpacing: '-0.015em',
          lineHeight: 1.25,
          marginBottom: 10,
        }}>{title}</h4>
        <p style={{
          fontFamily: fontBody,
          fontSize: 16,
          color: 'rgba(249,237,214,0.78)',
          lineHeight: 1.75,
          fontWeight: 300,
        }}>{body}</p>
      </div>
    </div>
  );
}

// SVG diagram — Sunday gathering at center, scattered house churches at varying distances,
// dotted "future gathering" markers further out.
function MultiplicationDiagram() {
  return (
    <div style={{ width: '100%', maxWidth: 540, aspectRatio: '1 / 1', position: 'relative' }}>
      <svg viewBox="-18 -18 556 556" width="100%" height="100%" style={{ display: 'block' }}>
        {/* Faint reference rings */}
        <circle cx="260" cy="260" r="90"  fill="none" stroke={BC.cream} strokeOpacity="0.10" strokeWidth="1" />
        <circle cx="260" cy="260" r="160" fill="none" stroke={BC.cream} strokeOpacity="0.08" strokeWidth="1" strokeDasharray="2 5" />
        <circle cx="260" cy="260" r="220" fill="none" stroke={BC.cream} strokeOpacity="0.06" strokeWidth="1" strokeDasharray="2 5" />

        {/* Outer ring — future Sunday gathering threshold */}
        <circle cx="260" cy="260" r="248" fill="none" stroke={BC.orange} strokeOpacity="0.6" strokeWidth="1.2" strokeDasharray="4 6" />

        {/* Center: Sunday gathering */}
        <circle cx="260" cy="260" r="24" fill={BC.orange} />
        <text x="260" y="264" textAnchor="middle"
          fontFamily="Montserrat, sans-serif" fontSize="9" fontWeight="700"
          fill={BC.white} letterSpacing="0.15em">SUN.</text>

        {/* Scattered house churches at varying distances (no neat ring) */}
        {[
          // close
          [220, 175], [330, 200], [320, 320], [195, 320], [160, 240],
          // middle
          [120, 180], [395, 145], [420, 280], [360, 400], [200, 415], [90, 350], [80, 240],
          // farther
          [50, 130], [400, 60], [475, 360], [330, 470], [60, 440], [430, 470],
        ].map(([cx, cy], i) => {
          const dx = cx - 260, dy = cy - 260;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const r = dist < 110 ? 9 : dist < 200 ? 8 : 7;
          const fill = dist < 110 ? BC.cream : dist < 200 ? 'rgba(249,237,214,0.7)' : 'rgba(249,237,214,0.45)';
          return <circle key={`hc-${i}`} cx={cx} cy={cy} r={r} fill={fill} />;
        })}

        {/* Future Sunday gatherings — at the edge */}
        {[
          [260, 12],
          [508, 260],
          [260, 508],
          [12, 260],
        ].map(([cx, cy], i) => (
          <circle key={`future-${i}`} cx={cx} cy={cy} r="14" fill={BC.navy} stroke={BC.orange} strokeWidth="2" strokeDasharray="3 3" />
        ))}

        {/* Labels — using cream for navy bg */}
        <g fontFamily="Montserrat, sans-serif" fontSize="9" fontWeight="600" letterSpacing="0.2em">
          <text x="260" y="232" textAnchor="middle" fill="rgba(249,237,214,0.7)">SUNDAY GATHERING</text>
          <text x="356" y="120" textAnchor="start" fill="rgba(249,237,214,0.55)">HOUSE CHURCHES</text>
          <text x="260" y="490" textAnchor="middle" fill={BC.orange}>FUTURE GATHERING</text>
        </g>
      </svg>
    </div>
  );
}

// ── SECTION: On buildings — redesigned ───────────────────
// Cream subtle background, structured manifesto layout, with the
// "pays for itself" conviction as the typographic anchor.
function VisionBuildings({ onNav }) {
  return (
    <section id="buildings" style={{ background: BC.creamSubtle, padding: '140px 48px 120px', position: 'relative', overflow: 'hidden', scrollMarginTop: 40 }}>
      <img src={TOPO.cream} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.36 }} />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: 1200, margin: '0 auto' }}>

        {/* Pull quote */}
        <div style={{ maxWidth: 1100, marginBottom: 100 }}>
          <SectionNumber>Conviction Three</SectionNumber>
          <Eyebrow>On buildings</Eyebrow>
          <h2 style={{
            fontFamily: fontDisplay,
            fontSize: 'clamp(40px, 6.2vw, 92px)',
            fontWeight: 800,
            color: BC.navy,
            letterSpacing: '-0.035em',
            lineHeight: 1.0,
            marginTop: 8,
          }}>
            <span style={{ whiteSpace: 'nowrap' }}>We only pay for space</span><br/>
            <span style={{ fontStyle: 'italic', fontWeight: 300, color: BC.orange }}>
              that pays for itself.
            </span>
          </h2>
          <p style={{ fontFamily: fontBody, fontSize: 19, color: BC.navyMuted, lineHeight: 1.7, fontWeight: 300, marginTop: 28, maxWidth: 640 }}>
            Space is not sacred, but sacred things happen in space.
          </p>
        </div>

        {/* Supporting points — three structured columns */}
        <div style={{ maxWidth: 1100, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 40 }}>
          {[
            {
              num: '01',
              label: 'Shared by design',
              body: 'Whatever space we hold, we hold openly — shared and stewarded with the community around us so it works for both church and neighborhood.',
            },
            {
              num: '02',
              label: 'It earns its keep',
              body: 'Used through the week by other groups and businesses, the building offsets its own expense. No facility is a drain on the mission.',
            },
            {
              num: '03',
              label: 'Resources follow ministry',
              body: 'Every dollar saved on keeping the lights on is a dollar freed up for gospel-centered ministry, planting, and partnerships beyond our walls.',
            },
          ].map((b) => (
            <Reveal key={b.num}>
              <div style={{ paddingTop: 24, borderTop: `2px solid ${BC.orange}` }}>
                <div style={{ fontFamily: fontDisplay, fontSize: 11, fontWeight: 600, letterSpacing: '0.22em', color: BC.orange, marginBottom: 14 }}>
                  N° {b.num}
                </div>
                <h4 style={{ fontFamily: fontDisplay, fontSize: 22, fontWeight: 700, color: BC.navy, letterSpacing: '-0.015em', lineHeight: 1.25, marginBottom: 12 }}>
                  {b.label}.
                </h4>
                <p style={{ fontFamily: fontBody, fontSize: 16, color: BC.navyMuted, lineHeight: 1.75, fontWeight: 300 }}>
                  {b.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Quiet back-link — no CTA, just navigation home */}
        <div style={{
          marginTop: 96,
          paddingTop: 40,
          borderTop: `1px solid ${BC.creamDark}`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 16,
          maxWidth: 1100,
        }}>
          <div style={{
            fontFamily: fontDisplay,
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: BC.muted,
          }}>
            Blacksburg Church · Vision
          </div>
          <button
            onClick={() => onNav && onNav('about')}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              fontFamily: fontDisplay,
              fontSize: 14,
              fontWeight: 600,
              color: BC.navy,
              letterSpacing: '0.04em',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              padding: 0,
            }}
          >
            <span style={{ width: 24, height: 1, background: BC.orange, display: 'inline-block' }} />
            Back to Who We Are
          </button>
        </div>

      </div>
    </section>
  );
}

// ── PAGE assembly ────────────────────────────────────────
function VisionPage({ onNav }) {
  return (
    <>
      <VisionHero />
      <VisionEquipping />
      <VisionMultiplying />
      <VisionBuildings onNav={onNav} />
    </>
  );
}

Object.assign(window, { VisionPage });
