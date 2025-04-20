"use client";

import { useMovieStore } from "@/lib/store";
import { useEffect } from "react";
import { searchMovies, discoverMovies } from "@/lib/tmdb";
import MovieList from "@/components/movies/MovieList";
import Pagination from "@/components/layout/Pagination";
import SortButtonGroup from "@/components/layout/SortButtonGroup";

export default function HomePage() {
  const {
    searchQuery,
    movies,
    setMovies,
    loading,
    setLoading,
    page,
    totalPages,
    setTotalPages,
    sortType,
  } = useMovieStore();

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);

      const res = searchQuery
        ? await searchMovies(searchQuery, page)
        : await discoverMovies({
          sort_by:
            sortType === "popular"
              ? "popularity.desc"
              : sortType === "now_playing"
                ? "release_date.desc"
                : sortType === "top_rated"
                  ? "vote_average.desc"
                  : "release_date.asc",
          page,
        });

      setMovies(res.results);
      setTotalPages(res.total_pages);
      setLoading(false);
    };

    fetchMovies();
  }, [searchQuery, sortType, page]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <SortButtonGroup />
      {loading ? <p>Loading...</p> : <MovieList movies={movies} />}
      <Pagination />
    </div>
  );
}
