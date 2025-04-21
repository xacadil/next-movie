"use client";

import { useMovieStore } from "@/lib/store";
import { useEffect, useState } from "react";
import { searchMovies, discoverMovies } from "@/lib/tmdb";
import MovieList from "@/components/movies/MovieList";
import Pagination from "@/components/layout/Pagination";
import SortButtonGroup from "@/components/layout/SortButtonGroup";
import MovieCardSkeleton from "@/components/movies/MovieCardSkeleton";

export default function HomePage() {
  const {
    searchQuery,
    movies,
    setMovies,
    loading,
    setLoading,
    page,
    setTotalPages,
    sortType,
  } = useMovieStore();

  const [shouldShowSkeleton, setShouldShowSkeleton] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);

      const res = searchQuery
        ? await searchMovies(searchQuery, page)
        : await discoverMovies({
          sort_by:
            sortType === "popular"
              ? "popularity.desc"
              : sortType === "top_rated"
                ? "vote_average.desc"
                : sortType === "release_year_asc"
                  ? "primary_release_date.asc"
                  : sortType === "release_year_desc"
                    ? "primary_release_date.desc"
                    : "popularity.desc", //
          page,
        });

      setMovies(res.results);
      setTotalPages(res.total_pages);
      setLoading(false);
    };

    fetchMovies();
  }, [searchQuery, sortType, page, setLoading, setMovies, setTotalPages]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (loading) {
      setShouldShowSkeleton(true);
    } else {
      timeout = setTimeout(() => {
        setShouldShowSkeleton(false);
      }, 200); // Delay before hiding skeletons
    }

    return () => clearTimeout(timeout);
  }, [loading]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <SortButtonGroup />

      {shouldShowSkeleton ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <MovieCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <MovieList movies={movies} />
      )}

      <Pagination />
    </div>
  );
}
