import Image from "next/image";

function ShoppingBagIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="5"
        y="13"
        width="26"
        height="18"
        rx="2.5"
        stroke="#1190af"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M12 13V10.5a6 6 0 0112 0V13"
        stroke="#1190af"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

const navItems = ["צרו קשר", "סניפים", "אודותינו"];

export default function Home() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* ─── HEADER CARD ─── */}
      <header
        style={{
          margin: "10px 10px 0",
          borderRadius: "16px",
          background: "rgba(255,255,255,0.96)",
          boxShadow: "0 2px 14px rgba(0,0,0,0.09)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "8px 24px",
          flexShrink: 0,
          minHeight: "70px",
        }}
      >
        {/* ── Brand left: MANDARINA DUCK + Luggage and Lifestyle SVGs ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
          {/* MANDARINA DUCK logo — extracted Canva PNG, inverted for white bg */}
          <Image
            src="/md-logo-extracted.png"
            alt="Mandarina Duck"
            width={180}
            height={62}
            style={{
              width: "clamp(100px, 12vw, 165px)",
              height: "auto",
              filter: "invert(1) contrast(2.2) brightness(0.75)",
              display: "block",
            }}
          />
          {/* Luggage and Lifestyle - styled text */}
          <span
            style={{
              fontFamily: "var(--font-mono), monospace",
              fontSize: "clamp(0.42rem, 0.55vw, 0.58rem)",
              letterSpacing: "0.12em",
              color: "#1190af",
              marginTop: "1px",
            }}
          >
            Luggage and Lifestyle
          </span>
        </div>

        {/* ── Nav + TOPTIK right ── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "clamp(12px, 2vw, 30px)",
          }}
        >
          {navItems.map((label) => (
            <a
              key={label}
              href="#"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "2px",
                textDecoration: "none",
              }}
            >
              <ShoppingBagIcon />
              <span
                style={{
                  fontFamily: "var(--font-heebo), sans-serif",
                  fontSize: "clamp(0.5rem, 0.65vw, 0.65rem)",
                  color: "#444",
                  fontWeight: 500,
                }}
              >
                {label}
              </span>
            </a>
          ))}

          {/* ── TOPTIK Logo Text ── */}
          <div
            style={{
              marginLeft: "clamp(6px, 1vw, 16px)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              lineHeight: 1.1,
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
                fontSize: "clamp(1rem, 1.6vw, 1.6rem)",
                fontWeight: 700,
                letterSpacing: "0.25em",
                color: "#1190af",
                textTransform: "uppercase",
              }}
            >
              TOPTIK
            </span>
            <span
              style={{
                fontFamily: "var(--font-mono), monospace",
                fontSize: "clamp(0.4rem, 0.5vw, 0.5rem)",
                letterSpacing: "0.08em",
                color: "#0880a3",
              }}
            >
              Luggage and Lifestyle
            </span>
          </div>
        </div>
      </header>

      {/* ─── HERO SECTION ─── */}
      <main
        style={{
          flex: 1,
          display: "flex",
          alignItems: "stretch",
          padding: "clamp(10px, 2vh, 24px) clamp(16px, 2vw, 36px) clamp(10px, 2vh, 24px)",
          gap: "clamp(10px, 1.5vw, 24px)",
          overflow: "hidden",
        }}
      >
        {/* ── Left: Text ── */}
        <div
          style={{
            flex: "0 0 57%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            paddingTop: "clamp(6px, 4vh, 48px)",
          }}
        >
          {/* Main heading — sized to fit 2 lines max */}
          <h1
            style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              fontSize: "clamp(2.4rem, 5vw, 5.5rem)",
              fontWeight: 400,
              color: "#514d4d",
              lineHeight: 1.08,
              letterSpacing: "-0.01em",
              whiteSpace: "nowrap",
            }}
          >
            TopTik
            <br />
            Hot Colection
          </h1>

          {/* Hebrew quote */}
          <blockquote
            dir="rtl"
            style={{
              fontFamily: "var(--font-heebo), sans-serif",
              fontSize: "clamp(0.85rem, 1.8vw, 1.7rem)",
              fontWeight: 400,
              color: "#1190af",
              marginTop: "clamp(10px, 2vh, 24px)",
              lineHeight: 1.4,
            }}
          >
            &ldquo;כי כל מסע מגיע לתיק הנכון&rdquo;
          </blockquote>

          {/* Hebrew subtext */}
          <p
            dir="rtl"
            style={{
              fontFamily: "var(--font-heebo), sans-serif",
              fontSize: "clamp(0.6rem, 0.95vw, 0.88rem)",
              fontWeight: 400,
              color: "#514d4d",
              marginTop: "clamp(4px, 0.8vh, 10px)",
              letterSpacing: "0.01em",
            }}
          >
            מזוודות, תיקי נסיעות, תיקי גב, פאוצ&apos;ים, תיקי צד ואסצורים
          </p>
        </div>

        {/* ── Right: Hero Image ── */}
        <div
          style={{
            flex: "0 0 43%",
            position: "relative",
            height: "100%",
            borderRadius: "3px",
            overflow: "hidden",
          }}
        >
          <Image
            src="/hero-woman.jpg"
            alt="Mandarina Duck – TopTik Hot Collection"
            fill
            sizes="43vw"
            style={{
              objectFit: "cover",
              objectPosition: "center 55%",
            }}
            priority
          />
        </div>
      </main>
    </div>
  );
}
