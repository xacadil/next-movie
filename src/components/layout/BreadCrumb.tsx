"use client";

import { useMovieStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import { Home, Search } from "lucide-react";

interface BreadcrumbProps {
    currentTitle: string;
}

export default function Breadcrumb({ currentTitle }: BreadcrumbProps) {
    const { searchQuery, setSearchQuery, setPage } = useMovieStore();
    const router = useRouter();

    const goHome = () => {
        setSearchQuery("");
        setPage(1);
        router.push("/");
    };

    return (
        <nav
            className="flex px-5 py-3 text-gray-700 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700 mb-4"
            aria-label="Breadcrumb"
        >
            <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                {/* Home */}
                <li className="inline-flex items-center">
                    <button
                        onClick={goHome}
                        className="cursor-pointer inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
                    >
                        <Home className="w-4 h-4 mr-2" />
                        Home
                    </button>
                </li>

                {/* If search query is active */}
                {searchQuery && (
                    <li>
                        <div className="flex items-center">
                            <svg
                                className="rtl:rotate-180 w-3 h-3 mx-1 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 6 10"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M1 9l4-4-4-4"
                                />
                            </svg>
                            <button
                                onClick={() => router.back()}
                                className="cursor-pointer inline-flex items-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white"
                            >
                                Search: <span className="italic">"{searchQuery}"</span>
                            </button>
                        </div>
                    </li>
                )}

                {/* Current Movie */}
                <li aria-current="page">
                    <div className="flex items-center">
                        <svg
                            className="rtl:rotate-180 w-3 h-3 mx-1 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 6 10"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M1 9l4-4-4-4"
                            />
                        </svg>
                        <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400 truncate ">
                            {currentTitle}
                        </span>
                    </div>
                </li>
            </ol>
        </nav>
    );
}
