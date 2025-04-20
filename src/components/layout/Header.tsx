"use client";

import { useMovieStore } from "@/lib/store";
import { searchMovies, discoverMovies } from "@/lib/tmdb";
import { ChangeEvent, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function Header() {
    const router = useRouter();
    const pathname = usePathname();

    const { searchQuery, setSearchQuery, setMovies, setLoading } = useMovieStore();

    useEffect(() => {
        async function fetchMovies() {
            setLoading(true);
            const data = searchQuery
                ? await searchMovies(searchQuery)
                : await discoverMovies({ sort_by: "popularity.desc" });
            setMovies(data.results);
            setLoading(false);
        }

        const delayDebounce = setTimeout(() => {
            fetchMovies();
        }, 400);

        return () => clearTimeout(delayDebounce);
    }, [searchQuery, setMovies]);

    return (
        <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                <span className="text-xl font-bold text-gray-800">Next Movie</span>
                <input
                    type="text"
                    placeholder="Search..."
                    className="border p-2 rounded-md w-full max-w-md"
                    value={searchQuery}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        const value = e.target.value;
                        setSearchQuery(value);

                        if (pathname !== "/") {
                            router.push("/");
                        }
                    }}
                />
            </div>
        </header>
    );
}
