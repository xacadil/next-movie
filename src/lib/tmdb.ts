// lib/tmdb.ts
'use server';

const BASE_URL = "https://api.themoviedb.org/3";

if (!process.env.TMDB_ACCESS_TOKEN) {
    throw new Error("Missing TMDB_ACCESS_TOKEN in .env.local");
}

const authHeader = {
    Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
    "Content-Type": "application/json",
};

/**
 * Fetches a list of movies from the TMDB API based on the provided options.
 * 
 * @param {Object} options - Query parameters for fetching the movies.
 * @param {string} [options.language=en-US] - Language code for the results.
 * @param {string} [options.include_adult=false] - Whether to include adult content.
 * @param {string} [options.sort_by=primary_release_date.desc] - Sorting criteria for the results.
 * @param {string} [options.page=1] - Page number for pagination.
 * @returns {Promise<Object>} A promise that resolves to the JSON response containing the list of movies.
 * @throws Will throw an error if the fetch operation fails.
 */

export async function discoverMovies(options = {}) {
    const params = new URLSearchParams({
        language: "en-US",
        include_adult: "false",
        sort_by: "primary_release_date.desc",
        page: "1",
        ...options,
    });

    const response = await fetch(`${BASE_URL}/discover/movie?${params.toString()}`, {
        headers: authHeader,
    });

    if (!response.ok) throw new Error("Failed to fetch movies");

    return response.json();
}

/**
 * Searches for movies using the TMDB API based on the provided query.
 * 
 * @param {string} query - The search term to query movies.
 * @param {number} [page=1] - The page of results to retrieve for pagination.
 * @returns {Promise<Object>} A promise that resolves to the JSON response containing the search results.
 * @throws Will throw an error if the search operation fails.
 */

export async function searchMovies(query: string, page = 1) {
    if (!query) return { results: [] };

    const params = new URLSearchParams({
        language: "en-US",
        query,
        page: String(page),
    });

    const response = await fetch(`${BASE_URL}/search/movie?${params.toString()}`, {
        headers: authHeader,
    });

    if (!response.ok) throw new Error("Search failed");

    return response.json();
}

/**
 * Fetches a movie's details from the TMDB API.
 * 
 * @param {string} id - The ID of the movie to fetch.
 * @returns {Promise<Object | null>} A promise that resolves to the movie's details or null if the fetch failed.
 * @throws Will throw an error if the fetch operation fails.
 */
export async function getMovieDetails(id: string) {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, {
        headers: {
            Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
        },
        next: { revalidate: 60 },
    });

    if (!res.ok) return null;
    return res.json();
}

export async function getMovieCredits(id: string) {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits`, {
        headers: {
            Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
        },
        next: { revalidate: 60 },
    });

    if (!res.ok) return [];
    const data = await res.json();
    return data.cast || [];
}

export async function getMovieImages(id: string) {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${id}/images`, {
        headers: {
            Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
        },
        next: { revalidate: 60 },
    });

    if (!res.ok) return [];
    const data = await res.json();
    return data.backdrops || [];
}
