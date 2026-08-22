"use client";
import { MovieCard } from "@/components/movieCard";
import { PopupForm } from "@/components/popupForm";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Review = {
  //read in movie data from supabase.
  id: number;
  Name: string;
  Rating: number;
};

type MovieListProps = {
  watched: boolean;
};

export const MovieDisplay = ({ watched }: MovieListProps) => {
  const supabase = createClient();
  const [data, setData] = useState<Review[]>([]);
  const [popup, setPopup] = useState(false); //popup starts at closed
  async function fetchData() {
    const { data, error } = await supabase.from("MovieReview").select();
    if (error) console.log(error);
    else {
      console.log(data);
      setData(data || [null]);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="bg-[#1d2b3d] w-screen flex-1">
      <nav>
        <ul className="flex justify-start m-15">
          <li
            id="add-button"
            className="bg-blue-500 text-white p-3 m-3 border-4 border-[#0a1118] text-xl hover:cursor-pointer"
            onClick={() => setPopup(true)}
          >
            Add Movie
          </li>
          <li
            id="remove-button"
            className="bg-blue-500 text-white p-3 m-3 border-4 border-[#0a1118] text-xl hover:cursor-pointer"
          >
            Remove Movie
          </li>
        </ul>
      </nav>
      <PopupForm watched={watched} open={popup} setOpen={setPopup}></PopupForm>
      <MovieCard items={data} Rated={false}></MovieCard>
    </div>
  );
};
