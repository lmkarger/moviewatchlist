import type { Metadata } from "next";
import Link from "next/link";
import { LogoutButton } from "@/components/logout-button";

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
    <div>
      <nav>
        <ul className="flex justify-between items-center">
          <h1 id="logo" className="p-3 mx-5 text-5xl">
            Movies Managed
          </h1>
          <div className="flex justify-around">
            <li className="p-3 my-5 mx-15 text-4xl hover:underline text-right">
              <Link href="/watched">WatchList</Link>
            </li>
            <li className="p-3 my-5 mx-15 text-4xl hover:underline text-right">
              <Link href="/watched">Watched</Link>
            </li>
            <LogoutButton />
          </div>
        </ul>
      </nav>
      {children}
    </div>
  );
}
