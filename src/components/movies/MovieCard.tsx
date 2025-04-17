// components/movies/MovieCard.tsx

import { Movie } from "@/types/movie";
import Image from "next/image";
import Link from "next/link";

export default function MovieCard({ movie }: { movie: Movie }) {
    return (
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
            <Link href={`/movies/${movie.id}`}>
                <Image
                    src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${movie.poster_path}`}
                    alt={movie.title}
                    width={400}
                    height={600}
                    className="rounded-t-lg w-full h-[300px] object-cover"
                />
            </Link>
            <div className="p-5">
                <Link href={`/movies/${movie.id}`}>
                    <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
                        {movie.title}
                    </h5>
                </Link>
                <p className="mb-3 text-sm text-gray-700">
                    {movie.overview.length > 100
                        ? movie.overview.slice(0, 100) + "..."
                        : movie.overview}
                </p>
                <Link
                    href={`/movies/${movie.id}`}
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
                </Link>
            </div>
        </div>
    );
}
