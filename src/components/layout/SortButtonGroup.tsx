// components/SortButtonGroup.tsx
"use client";
import { useMovieStore } from "@/lib/store";

const sortOptions = [
    { label: "Popular", value: "popular" },
    { label: "Now Playing", value: "now_playing" },
    { label: "Top Rated", value: "top_rated" },
    { label: "Upcoming", value: "upcoming" },
];

export default function SortButtonGroup() {
    const { sortType, setSortType } = useMovieStore();

    return (
        <div className="inline-flex rounded-md shadow-sm mb-6" role="group">
            {sortOptions.map(({ label, value }) => (
                <button
                    key={value}
                    onClick={() => setSortType(value as any)}
                    className={`px-4 py-2 text-sm font-medium border ${sortType === value
                            ? "bg-blue-800 text-white"
                            : "bg-white text-blue-800 border-blue-700 hover:bg-blue-800"
                        }`}
                >
                    {label}
                </button>
            ))}
        </div>
    );
}
