import ActorList from "@/components/movies/ActorList";
import Gallery from "@/components/movies/Gallery";
import {
    getMovieDetails,
    getMovieCredits,
    getMovieImages,
} from "@/lib/tmdb";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function MoviePage({ params }: { params: { id: string } }) {
    const [movie, cast, images] = await Promise.all([
        getMovieDetails(params.id),
        getMovieCredits(params.id),
        getMovieImages(params.id),
    ]);

    if (!movie) return notFound();


    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            {/* Movie Info */}
            <div className="flex flex-col md:flex-row gap-8">
                <div className="w-full md:w-1/3">
                    <Image
                        src={
                            movie.poster_path
                                ? `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${movie.poster_path}`
                                : "/images/fallback.jpg"
                        }
                        alt={movie.title}
                        width={500}
                        height={750}
                        className="rounded shadow"
                    />
                </div>

                <div className="flex-1 space-y-4">
                    <h1 className="text-3xl font-bold">{movie.title}</h1>
                    <p className="text-gray-700">{movie.overview}</p>
                    <p><strong>Release Date:</strong> {movie.release_date}</p>
                    <p><strong>Rating:</strong> {movie.vote_average.toFixed(1)} / 10</p>
                    {movie.runtime && <p><strong>Runtime:</strong> {movie.runtime} minutes</p>}
                </div>
            </div>

            {/* Cast Section */}
            <ActorList actors={cast} />

            {/* Images Section */}
            <Gallery backdrops={images} />
        
        </div>
    );
}
