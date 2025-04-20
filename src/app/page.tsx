"use client";

import MovieList from "@/components/movies/MovieList";
import { useMovieStore } from "@/lib/store";
import { useEffect } from "react";
import { discoverMovies } from "@/lib/tmdb";

export default function HomePage() {
  const { movies, setMovies, loading } = useMovieStore();

  // Fetch default movies only once on load
  useEffect(() => {
    const init = async () => {
      const data = await discoverMovies({ sort_by: "popularity.desc" });
      setMovies(data.results);
    };

    if (movies.length === 0) init();
  }, [movies.length]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {loading && <p className="text-gray-500">Loading...</p>}
      {!loading && <MovieList movies={movies} />}
    </div>
  );
}
