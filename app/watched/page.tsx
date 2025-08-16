'use client'
import {MovieCard} from "@/components/movieCard";

export const movieRatings = [
  {
    title: "Spider Man - Across the Spiderverse",
    rating: 10
  },
  {
    title: "Infinity War",
    rating: 9
  },
  {
    title: "Avengers Endgame",
    rating: 7
  },
  {
    title: "Black Panther",
    rating: 9
  },
  {
    title: "Everything Everywhere All at once holy yap time to test the character limit and see what happens no movie is this long!!",
    rating: 9
  },
]

export default function Home() {
  return (
    <div>
        <nav>
        <ul className="flex justify-center ">
          <li className="p-3 m-5 w-[300px] text-2xl bg-blue-400 hover:bg-blue-700 rounded-full text-center">Add to Watched</li>
          <li className="p-3 m-5 w-[300px] text-2xl bg-blue-400 hover:bg-blue-700 rounded-full text-center">Remove from Watched</li>
        </ul>
      </nav>
      <MovieCard items={movieRatings}></MovieCard>
    </div>
  );
}
