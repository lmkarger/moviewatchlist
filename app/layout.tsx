import type { Metadata } from "next";
import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}
