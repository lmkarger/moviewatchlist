"use client";
import Navbar from "@/components/navbar";
import { MovieDisplay } from "@/components/movieDisplay";
import { useState } from "react";

export default function Website() {
  const [watched, setWatched] = useState(false);

  return (
    <>
      <Navbar watched={watched} setWatched={setWatched} />
      <MovieDisplay watched={watched} />
    </>
  );
}
