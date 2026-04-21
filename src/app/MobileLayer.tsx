"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

const navItems = [
  { href: "#deals", label: "מבצעים" },
  { href: "#about", label: "אודותינו" },
  { href: "#stores", label: "סניפים" },
];

const categories = [
  {
    label: "עיצוב איטלקי",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M3 21h18M5 21V9l7-5 7 5v12M9 21v-7h6v7M9 9V7M12 9V6M15 9V7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "פונקציונליות חכמה",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" strokeLinejoin="round" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "חומרי גלם איכותיים",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M6 3l-4 6 10 12L22 9l-4-6H6z M11 3 L8 9 L12 21 L16 9 L13 3 M2 9h20" strokeLinejoin="round" strokeLinecap="round" />
      </svg>
    ),
  },
];

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.611-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.372-.01-.57-.01-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.999-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.886 9.884m8.413-18.297A11.82 11.82 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.88 11.88 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.82 11.82 0 0 0 20.464 3.488" />
    </svg>
  );
}

export default function MobileLayer() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onEsc);
    // Tag <html> with platform class so CSS can target Android only
    if (typeof navigator !== "undefined" && /android/i.test(navigator.userAgent)) {
      document.documentElement.classList.add("is-android");
    }
    return () => window.removeEventListener("keydown", onEsc);
  }, []);

  return (
    <div className="m-layer">
      {/* Top bar */}
      <header className="m-topbar">
        <div className="m-brand">
          <div className="m-title">TOPTIK COLLECTION</div>
          <div className="m-slogan">Move in Style.</div>
        </div>
        <button
          className="m-burger"
          aria-label={open ? "סגור תפריט" : "פתח תפריט"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className={`m-burger-icon ${open ? "is-open" : ""}`} />
        </button>
      </header>

      {/* Slide-down menu */}
      <div className={`m-menu ${open ? "is-open" : ""}`} role="dialog" aria-hidden={!open}>
        <nav dir="rtl">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </a>
          ))}
        </nav>
        <a
          className="m-menu-cta"
          href="https://wa.me/"
          target="_blank"
          rel="noopener"
          dir="rtl"
          onClick={() => setOpen(false)}
        >
          <WhatsAppIcon />
          דברו איתנו בוואטסאפ
        </a>
      </div>

      {/* Bottom bar — single row: TOPTIK logo | 3 categories | MANDARINA DUCK logo */}
      <div className="m-bottombar" dir="rtl">
        <Image
          src="/toptik-logo-trans.png"
          alt="TopTik"
          width={380}
          height={150}
          className="m-bb-toptik-img"
          unoptimized
          priority
        />
        <div className="m-bb-cats">
          {categories.map((c) => (
            <div key={c.label} className="m-bb-cat">
              <div className="m-bb-icon">{c.icon}</div>
              <div className="m-bb-label">{c.label}</div>
            </div>
          ))}
        </div>
        <Image
          src="/mandarina-logo-trans.png"
          alt="Mandarina Duck"
          width={380}
          height={150}
          className="m-bb-mandarina-img"
          unoptimized
          priority
        />
      </div>
    </div>
  );
}
