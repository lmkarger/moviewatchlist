'use client'
import {MovieCard} from "@/components/movieCard";
import DropdownForm from "@/components/dropDown";


const movieRatings = [
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
]

export default function Home() {
  return (
    <div>
        <nav>
        <ul className="flex justify-center ">
          <li><DropdownForm></DropdownForm></li>
          <li className="bg-blue-500 text-white p-5 m-3 text-xl rounded-full hover:p-6 hover:m-2">Remove Movie</li>
        </ul>
        </nav>
      <MovieCard items={movieRatings}></MovieCard>
    </div>
  );
}
