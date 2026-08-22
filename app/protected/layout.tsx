import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "MoviesManaged",
  description: "A Movie Watchlist Site",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="h-screen flex flex-col">{children}</div>;
}
