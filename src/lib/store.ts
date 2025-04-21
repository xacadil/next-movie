// lib/store.ts
import { create } from "zustand";
import { Movie, WatchlistItem } from "@/types/movie";

type SortType = "popular" | "release_year_asc" | "top_rated" | "release_year_desc";

interface MovieStore {
    searchQuery: string;
    movies: Movie[];
    loading: boolean;
    page: number;
    totalPages: number;
    sortType: SortType;

    watchlist: WatchlistItem[];
    hasFetchedWatchlist: boolean;

    setSearchQuery: (query: string) => void;
    setMovies: (movies: Movie[]) => void;
    setLoading: (loading: boolean) => void;
    setPage: (page: number) => void;
    setTotalPages: (total: number) => void;
    setSortType: (type: SortType) => void;

    setWatchlist: (items: WatchlistItem[]) => void;
    addToWatchlist: (item: WatchlistItem) => void;
    removeFromWatchlist: (movieId: number) => void;
    resetWatchlist: () => void;
    markWatchlistFetched: () => void;
}

export const useMovieStore = create<MovieStore>((set, get) => ({
    searchQuery: "",
    movies: [],
    loading: false,
    page: 1,
    totalPages: 1,
    sortType: "popular",

    watchlist: [],
    hasFetchedWatchlist: false,

    setSearchQuery: (query) => set({ searchQuery: query }),
    setMovies: (movies) => set({ movies }),
    setLoading: (loading) => set({ loading }),
    setPage: (page) => set({ page }),
    setTotalPages: (totalPages) => set({ totalPages }),
    setSortType: (sortType) => set({ sortType, page: 1 }),

    setWatchlist: (items) => set({ watchlist: items }),
    addToWatchlist: (item) => {
        const existing = get().watchlist;
        if (!existing.some((m) => m.id === item.id)) {
            set({ watchlist: [...existing, item] });
        }
    },
    removeFromWatchlist: (id) =>
        set((state) => ({
            watchlist: state.watchlist.filter((m) => m.id !== id),
        })),
    resetWatchlist: () => set({ watchlist: [], hasFetchedWatchlist: false }),
    markWatchlistFetched: () => set({ hasFetchedWatchlist: true }),
}));
