"use client";

import { useMovieStore } from "@/lib/store";
import Image from "next/image";
import { BookmarkX } from "lucide-react";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase"
import { useAuth } from "@/lib/hooks/useAuth";

export default function WatchlistPage() {
    const { watchlist, removeFromWatchlist } = useMovieStore();
    const { user } = useAuth();
    const handleRemove = async (movieId: number) => {
        const confirmed = confirm("Are you sure you want to remove this from your watchlist?");
        if (!confirmed || !user) return;

        try {
            const docRef = doc(db, "users", user.uid, "watchlist", movieId.toString());
            removeFromWatchlist(movieId); // The response from firebase is slow so lets update the store first.
            await deleteDoc(docRef);
        } catch (err) {
            console.error("Failed to remove movie from Firebase", err);
            alert("Something went wrong while removing the movie.");
        }
    };
    if (watchlist.length === 0) {
        return <p className="text-center text-gray-500 mt-10">Your watchlist is empty.</p>;
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {watchlist.map((movie) => (
                <div key={movie.id} className="bg-white rounded shadow-md overflow-hidden">
                    <Image
                        src={
                            movie.poster_path
                                ? `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${movie.poster_path}`
                                : "/images/fallback.jpg"
                        }
                        alt={movie.title}
                        width={300}
                        height={450}
                        className="w-full h-auto object-cover"
                    />
                    <div className="p-4 flex justify-between items-center">
                        <h3 className="text-md font-semibold">{movie.title}</h3>
                        <button
                            onClick={() => handleRemove(movie.id)}
                            className="text-red-600 hover:text-red-800"
                            title="Remove from watchlist"
                        >
                            <BookmarkX className="w-5 h-5" />
                        </button>

                    </div>
                </div>
            ))}
        </div>
    );
}
