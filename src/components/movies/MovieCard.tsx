// components/movies/MovieCard.tsx

import { Movie } from "@/types/movie";
import Image from "next/image";
import Link from "next/link";
import { Star } from 'lucide-react';

export default function MovieCard({ movie }: { movie: Movie }) {
    return (
        <Link href={`/movies/${movie.id}`}> 
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden transition transform duration-300 hover:scale-[1.02] hover:shadow-md hover:border-blue-300">

            
                <Image
                    src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${movie.poster_path}`}
                    alt={movie.title}
                    width={400}
                    height={600}
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAGgwJ/lqtBkQAAAABJRU5ErkJggg=="

                />
            
            <div className="p-5">
                
                    <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
                        {movie.title}
                    </h5>
                
                <p className="mb-3 text-sm text-gray-700">
                    {movie.overview.length > 100
                        ? movie.overview.slice(0, 100) + "..."
                        : movie.overview}
                </p>
                <div className="flex items-center gap-1 mb-2">
                    {/* Star Icon */}
                    <Star className="w-5 h-5 text-yellow-400" fill="currentColor" />
                    &nbsp;
                    {/* Rating Number */}
                    <span className="text-sm font-medium text-gray-800">
                        {movie.vote_average.toFixed(1)}
                    </span>
                </div>
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
