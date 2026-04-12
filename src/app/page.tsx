import Image from "next/image";

function BagIcon() {
  return (
    <svg
      width="30"
      height="30"
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
        stroke="white"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M12 13V10.5a6 6 0 0112 0V13"
        stroke="white"
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
      {/* ─── HEADER – על גבי הגרדיאנט הזהב ─── */}
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding:
            "clamp(10px, 1.8vh, 22px) clamp(20px, 3vw, 48px)",
          flexShrink: 0,
        }}
      >
        {/* ── Brand left ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          <span
            style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              fontSize: "clamp(0.75rem, 1vw, 1.05rem)",
              fontWeight: 700,
              letterSpacing: "0.18em",
              color: "#6b6530",
              textTransform: "uppercase",
            }}
          >
            MANDARINA DUCK
          </span>
          <span
            style={{
              fontFamily: "var(--font-mono), monospace",
              fontSize: "clamp(0.44rem, 0.58vw, 0.62rem)",
              letterSpacing: "0.12em",
              color: "#1190af",
            }}
          >
            Luggage and Lifestyle
          </span>
        </div>

        {/* ── Nav: ריבועים תכלת + TOPTIK ── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "clamp(10px, 1.5vw, 22px)",
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
                justifyContent: "center",
                gap: "4px",
                background: "#1190af",
                borderRadius: "8px",
                padding:
                  "clamp(6px, 0.8vh, 10px) clamp(10px, 1.2vw, 18px)",
                minWidth: "clamp(58px, 6.5vw, 82px)",
                textDecoration: "none",
                cursor: "pointer",
              }}
            >
              <BagIcon />
              <span
                style={{
                  fontFamily: "var(--font-heebo), sans-serif",
                  fontSize: "clamp(0.55rem, 0.7vw, 0.72rem)",
                  fontWeight: 600,
                  color: "white",
                  direction: "rtl",
                }}
              >
                {label}
              </span>
            </a>
          ))}

          {/* TOPTIK */}
          <span
            style={{
              marginLeft: "clamp(8px, 1.2vw, 20px)",
              fontFamily: "var(--font-playfair), Georgia, serif",
              fontSize: "clamp(1.1rem, 1.8vw, 1.8rem)",
              fontWeight: 700,
              letterSpacing: "0.22em",
              color: "#514d4d",
              textTransform: "uppercase",
            }}
          >
            TOPTIK
          </span>
        </div>
      </header>

      {/* ─── HERO ─── */}
      <main
        style={{
          flex: 1,
          display: "flex",
          alignItems: "stretch",
          padding:
            "clamp(6px, 1.5vh, 18px) clamp(16px, 2.5vw, 40px) clamp(10px, 2vh, 24px)",
          gap: "clamp(10px, 1.5vw, 24px)",
          overflow: "hidden",
        }}
      >
        {/* Left: Text */}
        <div
          style={{
            flex: "0 0 55%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            paddingTop: "clamp(6px, 3vh, 36px)",
          }}
        >
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
            מזוודות, תיקי נסיעות, תיקי גב, פאוצ&apos;ים, תיקי צד ואקססוריז
          </p>
        </div>

        {/* Right: Hero Image */}
        <div
          style={{
            flex: "1",
            position: "relative",
            minHeight: 0,
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
