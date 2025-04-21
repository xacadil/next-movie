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


    /**
     * Provides the current user, and functions to register, login, and logout.
     * The user is updated live as the authentication state changes.
     * The watchlist is also synced with the user's watchlist in Firestore,
     * and is cleared on logout.
     *
     * @returns An object with keys:
     *  - user: The current user, or null if not authenticated.
     *  - register: A function to register a new user with email and password.
     *  - login: A function to login an existing user with email and password.
     *  - logout: A function to logout the current user.
     */
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

    /**
     * Registers a new user with the given email and password.
     * 
     * @param email The email address to register.
     * @param password The password to register.
     * @returns A promise that resolves with the user credential if
     * registration is successful, or rejects with an error if not.
     */
    const register = (email: string, password: string) =>
        createUserWithEmailAndPassword(auth, email, password);

    /**
     * Logs in an existing user with the provided email and password.
     * 
     * @param email The email address of the user.
     * @param password The password of the user.
     * @returns A promise that resolves with the user credential if
     * the login is successful, or rejects with an error if not.
     */

    const login = (email: string, password: string) =>
        signInWithEmailAndPassword(auth, email, password);

    const logout = () => signOut(auth);

    return { user, register, login, logout };
}
