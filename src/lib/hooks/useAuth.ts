import { useState, useEffect } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    User,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { fetchUserWatchlist } from "@/lib/firebase/watchlist";
import { useMovieStore } from "@/lib/store";
{}


export function useAuth() {
    const [user, setUser] = useState<User | null>(null);
    const { setWatchlist } = useMovieStore();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            setUser(firebaseUser);
            if (firebaseUser) {
                const watchlist = await fetchUserWatchlist(firebaseUser.uid);
                console.log("watchlist", watchlist);
                setWatchlist(watchlist);
            } else {
                console.log("watchlist", "empty");
                setWatchlist([]); // clear watchlist on logout
            }
        });

        return () => unsubscribe();
    }, [setWatchlist]);

    const register = (email: string, password: string) =>
        createUserWithEmailAndPassword(auth, email, password);

    const login = (email: string, password: string) =>
        signInWithEmailAndPassword(auth, email, password);

    const logout = () => signOut(auth);

    return { user, register, login, logout };
}
