import type { Metadata } from "next";
import {
  Italiana,
  Great_Vibes,
  Rubik,
  Playfair_Display,
  Assistant,
} from "next/font/google";
import "./globals.css";

const italiana = Italiana({
  subsets: ["latin"],
  variable: "--font-italiana",
  weight: ["400"],
  display: "swap",
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  variable: "--font-great-vibes",
  weight: ["400"],
  display: "swap",
});

const rubik = Rubik({
  subsets: ["latin", "hebrew"],
  variable: "--font-rubik",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const assistant = Assistant({
  subsets: ["latin", "hebrew"],
  variable: "--font-assistant",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "TopTik Collection — Move in Style. Travel with Purpose.",
  description: "TopTik — דף נחיתה רשמי",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="he" dir="rtl">
      <body
        className={`${italiana.variable} ${greatVibes.variable} ${rubik.variable} ${playfair.variable} ${assistant.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
