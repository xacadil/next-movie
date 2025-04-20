// components/Pagination.tsx
"use client";

import { useMovieStore } from "@/lib/store";

export default function Pagination() {
    const { page, totalPages, setPage } = useMovieStore();

    const pages = Array.from({ length: Math.min(totalPages, 10) }, (_, i) => i + 1);

    return (
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 mt-6">
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between w-full">
                <div>
                    <p className="text-sm text-gray-700">
                        Page <span className="font-medium">{page}</span> of{" "}
                        <span className="font-medium">{totalPages}</span>
                    </p>
                </div>
                <div>
                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-xs" aria-label="Pagination">
                        <button
                            onClick={() => setPage(Math.max(page - 1, 1))}
                            className="cursor-pointer relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 hover:bg-gray-50"
                        >
                            <span className="sr-only">Previous</span>
                            &#8592;
                        </button>
                        {pages.map((p) => (
                            <button
                                key={p}
                                onClick={() => setPage(p)}
                                className={`cursor-pointer relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-gray-300 ${p === page ? "bg-indigo-600 text-white" : "text-gray-900 hover:bg-gray-50"
                                    }`}
                            >
                                {p}
                            </button>
                        ))}
                        <button
                            onClick={() => setPage(Math.min(page + 1, totalPages))}
                            className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 hover:bg-gray-50"
                        >
                            <span className="sr-only">Next</span>
                            &#8594;
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    );
}
