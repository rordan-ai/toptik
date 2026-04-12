import type { Metadata } from "next";
import { Playfair_Display, Heebo, Space_Mono } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "700"],
  display: "swap",
});

const heebo = Heebo({
  subsets: ["latin", "hebrew"],
  variable: "--font-heebo",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "TopTik Hot Collection | Mandarina Duck",
  description: "כי כל מסע מגיע לתיק הנכון",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="he" dir="ltr">
      <body
        className={`${playfair.variable} ${heebo.variable} ${spaceMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
