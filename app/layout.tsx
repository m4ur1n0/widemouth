import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import Image from "next/image";
import "./globals.css";
import Navbar from "./components/layout/navbar";
import Footer from "./components/layout/footer";
import { uiIndie as ui } from "./ui/classes";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const farmhouse = localFont({
  src: "../public/fonts/Farmhouse.otf",
  variable: "--font-farmhouse",
  display: "swap",
});

const irishGrover = localFont({
  src: "../public/fonts/IrishGrover-Regular.ttf",
  variable: "--font-irish-grover",
  display: "swap",
});

const fellEnglish= localFont({
  src: "../public/fonts/fell-english.ttf",
  variable: "--font-fell",
  display: "swap",
  preload: true

});

const garamond = localFont({
  src: "../public/fonts/garamond.ttf",
  variable: "--font-garamond",
  display: "swap",
  preload: true
});

const garamondItalics = localFont({
  src: "../public/fonts/garamond-italics.ttf",
  variable: "--font-garamond-italics",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Widemouth Band",
  description: "Landing page for the band Widemouth.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${farmhouse.variable} ${irishGrover.variable} ${fellEnglish.variable} ${garamond.variable} ${garamondItalics.variable} ${ui.page}`}
      >
        <div className="fixed inset-0 z-[-1] bg-[#fbf7f0]">
          <Image
            src="/images/widemouth-landscape.png"
            alt=""
            fill
            priority
            className="object-cover opacity-15"
            sizes="100vw"
          />
        </div>
        <Navbar />

        {children}

        <Footer />
      </body>
    </html>
  );
}
