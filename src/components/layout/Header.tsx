"use client";

import Link from "next/link";
import { useMovieStore } from "@/lib/store";
import { searchMovies, discoverMovies } from "@/lib/tmdb";
import { ChangeEvent, useEffect } from "react";
import { useDebounce } from "use-debounce";
import { usePathname, useRouter } from "next/navigation";
import { Film } from "lucide-react";

export default function Header() {
    const router = useRouter();
    const pathname = usePathname();

    const {
        searchQuery,
        setSearchQuery,
        setMovies,
        setLoading,
    } = useMovieStore();

    const [debouncedQuery] = useDebounce(searchQuery, 400);
    const {setPage } = useMovieStore();
    useEffect(() => {
        async function fetchMovies() {
            setLoading(true);
            const data = debouncedQuery
                ? await searchMovies(debouncedQuery)
                : await discoverMovies({ sort_by: "popularity.desc" });

            setMovies(data.results);
            setLoading(false);
        }

        fetchMovies();
    }, [debouncedQuery]);

    return (
        <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                <Link href="/" className="flex items-center space-x-2 text-xl font-bold text-gray-800 hover:text-blue-600 transition">
                    <Film className="w-6 h-6" />
                    <span>Next Movie</span>
                </Link>
                <input
                    type="text"
                    placeholder="Search..."
                    className="border p-2 rounded-md w-full max-w-md"
                    value={searchQuery}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        const value = e.target.value;
                        setSearchQuery(value);
                        setPage(1);

                        if (pathname !== "/") {
                            router.push("/");
                        }
                    }}
                />
            </div>
        </header>
    );
}
