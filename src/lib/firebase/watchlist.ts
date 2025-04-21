// lib/firebase/watchlist.ts
import { collection, getDocs, orderBy, query,limit } from "firebase/firestore";
import { db } from "../firebase";
import { WatchlistItem } from "@/types/movie";

/**
 * Fetch a user's watchlist from Firestore.
 *
 * @param {string} uid - The user's Firebase UID.
 * @returns {Promise<WatchlistItem[]>} - A promise resolving to an array of WatchlistItem objects.
 */
export async function fetchUserWatchlist(uid: string): Promise<WatchlistItem[]> {
    /**
     * @todo - The cold starts takes at least 7-10 seconds to load the watchlist. Need to find a way around it. 
     */
    const q = query(
        collection(db, "users", uid, "watchlist"),
        orderBy("addedAt", "desc"),
        limit(50)
    );

    const snapshot = await getDocs(q);
    console.log("snapshot",snapshot.docs);
    return snapshot.docs.map((doc) => doc.data() as WatchlistItem);
}
