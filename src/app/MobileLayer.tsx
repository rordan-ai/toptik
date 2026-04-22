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
        <div className="m-topbar-actions">
          <a
            className="m-wa-icon"
            href="https://wa.me/"
            target="_blank"
            rel="noopener"
            aria-label="דברו איתנו בוואטסאפ"
          >
            <Image
              src="/whatsapp.png"
              alt="WhatsApp"
              width={1024}
              height={1024}
              unoptimized
            />
          </a>
          <button
            className="m-burger"
            aria-label={open ? "סגור תפריט" : "פתח תפריט"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className={`m-burger-icon ${open ? "is-open" : ""}`} />
          </button>
        </div>
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
      </div>

      {/* Bottom bar — single row: TOPTIK logo | 3 categories | MANDARINA DUCK logo */}
      <div className="m-bottombar" dir="rtl">
        <Image
          src="/toptik-logo-mobile.png"
          alt="TopTik"
          width={2000}
          height={2000}
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
          width={1430}
          height={224}
          className="m-bb-mandarina-img"
          unoptimized
          priority
        />
      </div>
    </div>
  );
}
