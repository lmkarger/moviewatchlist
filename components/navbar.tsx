"use client";
import { LogoutButton } from "@/components/logout-button";
type NavbarProps = {
  watched: boolean;
  setWatched: (value: boolean) => void;
};

export default function Navbar({ watched, setWatched }: NavbarProps) {
  return (
    <nav className="flex justify-between items-center bg-[#0a1118] text-white">
      <h1 id="logo" className="p-3 mx-15 text-5xl">
        Movies Managed
      </h1>
      <div className="flex justify-around">
        <button
          className={`p-3 my-5 mx-15 text-4xl text-right hover:cursor-pointer ${!watched && "underline decoration-blue-500 decoration-[10px] underline-offset-[37px]"}`}
          onClick={() => setWatched(false)}
        >
          Watchlist
        </button>
        <button
          className={`p-3 my-5 mx-15 text-4xl text-right hover:cursor-pointer ${watched && "underline decoration-blue-500 decoration-[10px] underline-offset-[37px]"}`}
          onClick={() => setWatched(true)}
        >
          Watched
        </button>
        <LogoutButton />
      </div>
    </nav>
  );
}
