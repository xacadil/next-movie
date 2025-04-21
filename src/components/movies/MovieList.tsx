// components/movies/MovieList.tsx

import MovieCard from "./MovieCard";
import { Movie } from "@/types/movie";

/**
 * A component that renders a list of movies in a responsive grid layout.
 *
 * @param {Object} props - Component properties.
 * @param {Movie[]} props.movies - An array of movie objects to be displayed.
 */

export default function MovieList({ movies }: { movies: Movie[] }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
            ))}
        </div>
    );
}
