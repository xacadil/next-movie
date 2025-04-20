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

export async function discoverMovies(options = {}) {
    const params = new URLSearchParams({
        language: "en-US",
        include_adult: "false",
        sort_by: "popularity.desc",
        page: "1",
        ...options,
    });

    const response = await fetch(`${BASE_URL}/discover/movie?${params.toString()}`, {
        headers: authHeader,
    });

    if (!response.ok) throw new Error("Failed to fetch movies");

    return response.json();
}

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
