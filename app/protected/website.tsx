"use client";
import { MovieCard } from "@/components/movieCard";
import { DropdownForm } from "@/components/dropDown";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type Item = {
  id: number;
  Name: string;
  Path: string;
  Rating: number;
};

export const Website = () => {
  const [data, setData] = useState<Item[]>([]);

  async function fetchData() {
    const { data, error } = await supabase.from("movieWatchlist").select();
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
    <div>
      <nav>
        <ul className="flex justify-center ">
          <li>
            <DropdownForm Rated={false} onMovieAdded={fetchData}></DropdownForm>
          </li>
          <li
            id="remove-button"
            className="bg-blue-500 text-white p-5 m-3 text-xl rounded-full hover:p-6 hover:m-2"
          >
            Remove Movie
          </li>
        </ul>
      </nav>
      <MovieCard items={data} Rated={false}></MovieCard>
    </div>
  );
};
