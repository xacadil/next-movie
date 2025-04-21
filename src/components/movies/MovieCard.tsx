// components/movies/MovieCard.tsx

import { Movie } from "@/types/movie";
import Image from "next/image";
import Link from "next/link";
import { Star } from 'lucide-react';

/**
 * A component that renders a single movie item with a poster image, title,
 * average rating, and a brief description. The component is a link to the
 * movie details page.
 *
 * @param {Movie} movie - the movie object data
 * @returns {JSX.Element} a single movie item component
 */
export default function MovieCard({ movie }: { movie: Movie }) {
    const poster = movie.poster_path
        ? `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${movie.poster_path}`
        : "/fallback.png"; //fallback image
    //few movies don't have average ratings
    const ratings = movie.vote_average ? movie.vote_average.toFixed(1) : false;

    return (
        <Link href={`/movie/${movie.id}`}> 
        <div title={movie.title} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden transition transform duration-300 hover:scale-[1.02] hover:shadow-md hover:border-blue-300">

            
                <Image
                    src={`${poster}`}
                    alt={movie.title}
                    width={400}
                    height={600}
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAGgwJ/lqtBkQAAAABJRU5ErkJggg=="

                />
            
            <div className="p-5">
                
                    <div className="flex items-start justify-between mb-2 gap-4">
                        <h5 className="text-xl font-bold tracking-tight text-gray-900 w-1/2 truncate">
                            {movie.title}
                        </h5>
                        {ratings && (
                            <div className="flex items-center gap-1 shrink-0">
                                <Star className="w-5 h-5 text-yellow-400" fill="currentColor" />
                                <span className="text-sm font-medium text-gray-800">
                                    {ratings}
                                </span>
                            </div>
                        )}
                    </div>
                
                <p className="mb-3 text-sm text-gray-700">
                    {movie.overview.length > 50
                        ? movie.overview.slice(0, 50) + "..."
                        : movie.overview}
                </p>
                   
                
                <div
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800"
                >
                    Read more
                    <svg
                        className="ml-2 w-3.5 h-3.5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 10"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M1 5h12m0 0L9 1m4 4L9 9"
                        />
                    </svg>
                </div>
            </div>
        </div>
        </Link>
    );
}
