import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import Image from "next/image";
import "./globals.css";
import Navbar from "./components/layout/navbar";
import { ui } from "./ui/classes";


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
        className={`${geistSans.variable} ${geistMono.variable} ${farmhouse.variable} ${irishGrover.variable} ${ui.page} ${ui.shell}`}
      >
        <div className="fixed inset-0 z-[-1]">
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
      </body>
    </html>
  );
}
