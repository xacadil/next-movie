"use client";

import { useMovieStore, SortType } from "@/lib/store";
import { ArrowDown, ArrowUp } from "lucide-react"; // Install if not already

const sortOptions = [
    { label: "Popular", value: "popular" },
    { label: "Top Rated", value: "top_rated" },
    {
        label: (
            <span className="flex items-center gap-1">
                Release Year <ArrowDown className="w-4 h-4" />
            </span>
        ),
        value: "release_year_desc",
    },
    {
        label: (
            <span className="flex items-center gap-1">
                Release Year <ArrowUp className="w-4 h-4" />
            </span>
        ),
        value: "release_year_asc",
    },
];

export default function SortButtonGroup() {
    const { sortType, setSortType,searchQuery } = useMovieStore();

    return (
        <>
        {searchQuery==="" &&
        <div className="flex flex-wrap gap-2 mb-6">
            {sortOptions.map(({ label, value }) => (
                <button
                    key={String(value)}
                    onClick={() => setSortType(value as SortType)}
                    className={`cursor-pointer inline-flex items-center px-4 py-2 text-sm font-medium border rounded ${sortType === value
                            ? "bg-blue-700 text-white border-blue-700"
                            : "bg-white text-gray-900 border-gray-300 hover:bg-blue-700 hover:text-white"
                        }`}
                >
                    {label}
                </button>
            ))}
        </div>}
        </> 
    );
}
