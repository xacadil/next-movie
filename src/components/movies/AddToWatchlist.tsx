// components/movies/AddToWatchlist.tsx
"use client";

import { useState } from "react";
import { Bookmark, BookmarkX } from "lucide-react";
import { useAuth } from "@/lib/hooks/useAuth";
import { useMovieStore } from "@/lib/store";
import { doc, setDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useRouter } from "next/navigation";

interface Props {
    movie: {
        poster_path: null;
        id: number;
        title: string;
    };
}

export default function AddToWatchlist({ movie }: Props) {
    const { user } = useAuth();
    const router = useRouter();

    const {
        watchlist,
        addToWatchlist,
        removeFromWatchlist,
    } = useMovieStore();

    const [loading, setLoading] = useState(false);

    const isInWatchlist = watchlist.some((m) => m.id === movie.id);

    const handleToggle = async () => {
        if (!user) {
            router.push("/login");
            return;
        }

        const docRef = doc(db, "users", user.uid, "watchlist", movie.id.toString());

        // Optimistically update UI
        if (isInWatchlist) {
            removeFromWatchlist(movie.id);
        } else {
            addToWatchlist({
                id: movie.id,
                title: movie.title,
                poster_path: movie.poster_path ?? "null",
            });
        }

        setLoading(true);
        try {
            if (isInWatchlist) {
                await deleteDoc(docRef);
            } else {
                await setDoc(docRef, {
                    id: movie.id,
                    title: movie.title,
                    poster_path: movie.poster_path ?? null,
                    addedAt: Date.now(),
                });
            }
        } catch (err) {
            console.error("Firestore sync failed:", err);
            // Optionally: revert optimistic update here
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleToggle}
            disabled={loading}
            className={`inline-flex items-center px-4 py-2 text-sm font-medium text-white rounded-lg ${isInWatchlist ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"
                } transition-colors`}
        >
            {isInWatchlist ? (
                <>
                    <BookmarkX className="w-5 h-5 mr-2" />
                    Remove from Watchlist
                </>
            ) : (
                <>
                    <Bookmark className="w-5 h-5 mr-2" />
                    Add to my Watchlist
                </>
            )}
        </button>
    );
}
