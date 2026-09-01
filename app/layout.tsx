import type { Metadata } from "next";
import { Cormorant_Garamond, Playfair_Display, Parisienne } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
});

const parisienne = Parisienne({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-script",
});

export const metadata: Metadata = {
  title: "Abdullah & Kabirah — Our Wedding",
  description: "An invitation to celebrate the beginning of Abdullah and Kabirah's next chapter.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${playfair.variable} ${parisienne.variable}`}>
      <body>{children}</body>
    </html>
  );
}
