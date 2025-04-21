"use client";

import Link from "next/link";
import { useMovieStore } from "@/lib/store";
import { searchMovies, discoverMovies } from "@/lib/tmdb";
import { ChangeEvent, useEffect } from "react";
import { useDebounce } from "use-debounce";
import { usePathname, useRouter } from "next/navigation";
import { Film } from "lucide-react";
import { useAuth } from "@/lib/hooks/useAuth";



export default function Header() {
    const router = useRouter();
    const pathname = usePathname();
    const { user, logout } = useAuth();

    const {
        searchQuery,
        setSearchQuery,
        setMovies,
        setLoading,
        setPage,
    } = useMovieStore();

    const handleLogoClick = () => {
        setSearchQuery("");    // Clear the search
        setPage(1);            // Optionally reset page
        router.push("/");      // Navigate to homepage
    };

    const [debouncedQuery] = useDebounce(searchQuery, 400);

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
                {/* Logo */}
                <button
                    
                    onClick={handleLogoClick}   
                    className="cursor-pointer flex items-center space-x-2 text-xl font-bold text-gray-800 hover:text-blue-600 transition"
                >
                    <Film className="w-6 h-6" />
                    <span>Next Movie</span>
                </button>

                {/* Search */}
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

                {/* Auth Links */}
                <div className="flex items-center gap-4 ml-4">
                    {user ? (
                        <>
                            <Link href="/watchlist" className="text-sm text-gray-800 hover:text-blue-600">
                                Watchlist
                            </Link>
                            <button
                                onClick={logout}
                                className="text-sm text-red-600 hover:underline"
                            >
                                Sign Out
                            </button>
                        </>
                    ) : (
                        <>
                            {pathname !== "/login" && (
                                <Link href="/login" className="text-sm text-gray-800 hover:text-blue-600">
                                    Login
                                </Link>
                            )}
                            {pathname !== "/signup" && (
                                <Link href="/signup" className="text-sm text-gray-800 hover:text-blue-600">
                                    Signup
                                </Link>
                            )}
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}
