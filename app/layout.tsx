import type { Metadata } from "next";
import { Geist, Cormorant_Garamond, Cinzel } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "FLORIA — Where Creatures Come Alive",
  description: "An immersive world of curious creatures, magical places, and stories waiting to be discovered.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${cormorant.variable} ${cinzel.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-black text-white selection:bg-white/20 selection:text-white">
        {children}
      </body>
    </html>
  );
}
