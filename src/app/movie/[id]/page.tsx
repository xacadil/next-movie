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

    const topCast = cast.slice(0, 5);

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
            <div className="mt-10">
                <h2 className="text-xl font-bold mb-4">Top Cast</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                    {topCast.map((actor: any) => (
                        <div key={actor.id} className="text-center">
                            <Image
                                src={
                                    actor.profile_path
                                        ? `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${actor.profile_path}`
                                        : "/images/fallback.jpg"
                                }
                                alt={actor.name}
                                width={150}
                                height={225}
                                className="rounded shadow"
                            />
                            <p className="text-sm font-medium mt-2">{actor.name}</p>
                            <p className="text-xs text-gray-500">{actor.character}</p>
                        </div>
                    ))}
                </div>
                {/* Client-side "Show More" toggle will go here (optional enhancement) */}
            </div>

            {/* Images Section */}
            <div className="mt-10">
                <h2 className="text-xl font-bold mb-4">Gallery</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {images.slice(0, 8).map((img: any, index: number) => (
                        <Image
                            key={index}
                            src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${img.file_path}`}
                            alt={`Backdrop ${index + 1}`}
                            width={300}
                            height={169}
                            className="rounded shadow object-cover h-[169px] w-full"
                        />
                    ))}
                </div>
                {/* Later: Add click-to-zoom or modal viewer */}
            </div>
        </div>
    );
}
