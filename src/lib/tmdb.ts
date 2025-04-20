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
