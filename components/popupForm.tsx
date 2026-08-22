"use state";

import { useState, useRef, useEffect, FormEvent } from "react";
import { createClient } from "@/lib/supabase/client";

export const PopupForm = ({
  watched,
  open,
  setOpen,
}: {
  watched: boolean;
  open: boolean;
  setOpen: (value: boolean) => void;
}) => {
  const supabase = createClient();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  const [Name, setName] = useState("");
  const [Rating, setRating] = useState<number | "">(1);
  const [Review, setReview] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", { Name, Rating, Review, watched });

    // Insert movie and get the generated id
    const { data: movie, error: movieError } = await supabase
      .from("Movie")
      .insert([{ Name }])
      .select("id")
      .single();
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    console.log("Current user:", user);
    console.log("Auth error:", error);
    if (movieError) {
      console.error("Error inserting movie:", movieError);
      return;
    }

    // Insert review using the generated id
    const { error: reviewError } = await supabase.from("MovieReview").insert([
      {
        movie_id: movie.id,
        Rating,
        Review,
        Watched: watched,
      },
    ]);

    if (reviewError) {
      console.error("Error inserting review:", reviewError);
      console.error("Code:", reviewError.code);
      console.error("Message:", reviewError.message);
      console.error("Details:", reviewError.details);
      console.error("Hint:", reviewError.hint);
      return;
    }

    // Reset form
    setName("");
    setRating("");
    setReview("");
    setOpen(false);
  };

  return (
    <div
      className={`${open ? "fixed inset-0 z-50 flex items-center justify-center bg-black/50" : "hidden"}`}
    >
      <div
        className={`relative mt-2 w-150 bg-gray-800 border-blue-500 border-6 rounded shadow-lg p-10 z-1000
          ${open ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}
        `}
        ref={dropdownRef}
      >
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="absolute top-3 right-3 text-gray-400 hover:text-white text-xl"
        >
          ✕
        </button>
        <form onSubmit={handleSubmit} className="space-y-3 z-10">
          <input
            type="text"
            placeholder="Name..."
            value={Name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-[#D3D3D3]"
          />
          {watched && (
            <input
              type="number"
              min="0"
              max="10"
              value={Rating}
              onChange={(e) => setRating(Number(e.target.value))}
              placeholder="Rating..."
              className="w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-[#D3D3D3]"
            />
          )}
          {watched && (
            <div>
              <textarea
                placeholder="Review..."
                value={Review}
                maxLength={500}
                onChange={(e) => setReview(e.target.value)}
                className="w-full h-32 border border-gray-300 rounded px-2 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-[#D3D3D3] resize-none"
              />
              <div className="text-sm text-gray-500 text-right">
                {Review.length}/1000
              </div>
            </div>
          )}
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded w-full"
          >
            Add Movie
          </button>
        </form>
      </div>
    </div>
  );
};
