// lib/tmdb.ts

const BASE_URL = "https://api.themoviedb.org/3";

export interface DiscoverMovieOptions {
    sort_by?: string;
    page?: number;
    year?: number;
    primary_release_year?: number;
    vote_average_gte?: number;
    vote_average_lte?: number;
    with_genres?: string;
}

export interface SearchMovieOptions {
    query: string;
    page?: number;
    year?: number;
    include_adult?: boolean;
}

export class TMDB {
    private static authHeader = {
        Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
    };

    /**
     * Discover movies using filters like sort_by, genre, vote average, release year, etc.
     */
    static async discoverMovies(options: DiscoverMovieOptions = {}) {
        const params = new URLSearchParams({
            language: "en-US",
            include_adult: "false",
            include_video: "false",
            sort_by: options.sort_by ?? "popularity.desc",
            page: String(options.page ?? 1),
        });

        if (options.year) params.append("year", String(options.year));
        if (options.primary_release_year)
            params.append("primary_release_year", String(options.primary_release_year));
        if (options.vote_average_gte)
            params.append("vote_average.gte", String(options.vote_average_gte));
        if (options.vote_average_lte)
            params.append("vote_average.lte", String(options.vote_average_lte));
        if (options.with_genres) params.append("with_genres", options.with_genres);

        const response = await fetch(`${BASE_URL}/discover/movie?${params.toString()}`, {
            headers: TMDB.authHeader,
            next: { revalidate: 60 },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch movies from TMDB Discover");
        }

        return response.json(); // includes `results`, `page`, `total_pages`, etc.
    }

    /**
     * Search movies by title using /search/movie endpoint
     */
    static async searchMovies(options: SearchMovieOptions) {
        if (!options.query || options.query.trim().length === 0) {
            return { results: [], page: 1, total_pages: 0 };
        }

        const params = new URLSearchParams({
            language: "en-US",
            include_adult: String(options.include_adult ?? false),
            query: options.query.trim(),
            page: String(options.page ?? 1),
        });

        if (options.year) params.append("year", String(options.year));

        const response = await fetch(`${BASE_URL}/search/movie?${params.toString()}`, {
            headers: TMDB.authHeader,
            next: { revalidate: 30 }, // shorter cache for search
        });

        if (!response.ok) {
            throw new Error("Failed to search movies from TMDB");
        }

        return response.json();
    }
}
