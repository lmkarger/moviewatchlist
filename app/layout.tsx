import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from 'next/link';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MoviesManaged",
  description: "A Movie Watchlist Site",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <nav>
          <ul className="grid grid-cols-3 items-start text-center">
            <li className="p-3 m-5 text-4xl hover:underline text-left"><Link href="/..">Plan to Watch</Link></li>
            <h1 className="p-3 m-5 text-4xl hover:underline">Movies Managed</h1>
            <li className="p-3 m-5 text-4xl hover:underline text-right"><Link href="/watched">Watched</Link></li>
          </ul>
        </nav>
        {children}
      </body>
    </html>
  );
}
