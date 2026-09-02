"use client";
import { MovieCard } from "@/components/movieCard";
import { PopupForm } from "@/components/popupForm";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type MovieCardProp = {
  id: number;
  Name: string;
  Rating: number;
  Review: string;
  Watched: boolean;
};

type MovieListProps = {
  watched: boolean;
};

export const MovieDisplay = ({ watched }: MovieListProps) => {
  const supabase = createClient();
  const [data, setData] = useState<MovieCardProp[]>([]);
  const [refreshKey, setRefreshKey] = useState(0); //refresh movie cards when a new movie is added or removed
  const [popup, setPopup] = useState(false); //popup starts at closed
  const [edit, setEdit] = useState(false);

  const handleMovieCardChange = () => {
    setRefreshKey((prev) => prev + 1);
  };

  async function findMovieName(movieId: number): Promise<string> {
    const { data: movie, error: movieError } = await supabase
      .from("Movie")
      .select("Name")
      .eq("id", movieId)
      .single();
    if (movieError) {
      console.error(movieError);
      return "";
    }
    return movie?.Name || "";
  }
  useEffect(() => {
    async function loadData() {
      const { data: rawData, error } = await supabase
        .from("MovieReview")
        .select("id, movie_id, Rating, Review, Watched");

      if (error) {
        console.error(error);
        return;
      }

      const purifiedData = await Promise.all(
        (rawData ?? []).map(async (item) => ({
          id: item.id,
          Name: await findMovieName(item.movie_id),
          Rating: item.Rating,
          Review: item.Review,
          Watched: item.Watched,
        })),
      );

      setData(purifiedData);
    }

    loadData();
  }, [refreshKey]);

  return (
    <div className="bg-[#1d2b3d] w-screen flex-1">
      <nav>
        <ul className="flex justify-start m-15">
          <li
            id="add-button"
            className="bg-blue-500 text-white p-3 m-3 border-4 border-[#0a1118] text-xl hover:cursor-pointer"
            onClick={() =>{ 
              setPopup(true); 
              setEdit(false);}}
          >
            Add Movie
          </li>
          <li
            id="remove-button"
            className="bg-blue-500 text-white p-3 m-3 border-4 border-[#0a1118] text-xl hover:cursor-pointer"
          >
            Remove Movie
          </li>
                    <li
            id="edie-button"
            className="bg-blue-500 text-white p-3 m-3 border-4 border-[#0a1118] text-xl hover:cursor-pointer"
            onClick={() => setEdit(true)}
          >
            Edit Movie Review
          </li>
        </ul>
      </nav>
      <PopupForm
        watched={watched}
        open={popup}
        setOpen={setPopup}
        onMoviesChanged={handleMovieCardChange}
        edit={edit}
      ></PopupForm>
      <MovieCard items={data} watched={watched}></MovieCard>
    </div>
  );
};
