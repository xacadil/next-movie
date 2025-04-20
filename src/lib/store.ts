// lib/store.ts
import { create } from "zustand";
import { Movie } from "@/types/movie";

interface MovieStore {
    searchQuery: string;
    movies: Movie[];
    loading: boolean;
    setSearchQuery: (query: string) => void;
    setMovies: (movies: Movie[]) => void;
    setLoading: (loading: boolean) => void;
}

export const useMovieStore = create<MovieStore>((set) => ({
    searchQuery: "",
    movies: [],
    loading: false,
    setSearchQuery: (query) => set({ searchQuery: query }),
    setMovies: (movies) => set({ movies }),
    setLoading: (loading) => set({ loading }),
}));
