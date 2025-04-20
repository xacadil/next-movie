// lib/store.ts
import { create } from "zustand";
import { Movie } from "@/types/movie";

type SortType = "popular" | "now_playing" | "top_rated" | "upcoming";

interface MovieStore {
    searchQuery: string;
    movies: Movie[];
    loading: boolean;
    page: number;
    totalPages: number;
    sortType: SortType;

    setSearchQuery: (query: string) => void;
    setMovies: (movies: Movie[]) => void;
    setLoading: (loading: boolean) => void;
    setPage: (page: number) => void;
    setTotalPages: (total: number) => void;
    setSortType: (type: SortType) => void;
}

export const useMovieStore = create<MovieStore>((set) => ({
    searchQuery: "",
    movies: [],
    loading: false,
    page: 1,
    totalPages: 1,
    sortType: "popular",

    setSearchQuery: (query) => set({ searchQuery: query }),
    setMovies: (movies) => set({ movies }),
    setLoading: (loading) => set({ loading }),
    setPage: (page) => set({ page }),
    setTotalPages: (totalPages) => set({ totalPages }),
    setSortType: (sortType) => set({ sortType, page: 1 }), // reset page when sort changes
}));
