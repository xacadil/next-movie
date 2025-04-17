// app/page.tsx

import MovieList from "@/components/movies/MovieList";
import { mockMovies } from "@/mock/movies";

export default function Home() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">Latest Movies</h1>
      <MovieList movies={mockMovies} />
    </div>
  );
}
