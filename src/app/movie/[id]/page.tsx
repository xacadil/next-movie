import ActorList from "@/components/movies/ActorList";
import Gallery from "@/components/movies/Gallery";
import {
    getMovieDetails,
    getMovieCredits,
    getMovieImages,
} from "@/lib/tmdb";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
    Clock,
    CalendarDays,
    Star,
    Globe,
    Languages,
    BadgeCheck,
    Tags,
    Building2,
    PackageOpen,
} from "lucide-react";
import AddToWatchlist from "@/components/movies/AddToWatchlist";
import Breadcrumb from "@/components/layout/BreadCrumb";

export default async function MoviePage({ params }: { params: { id: string } }) {
    const [movie, cast, images] = await Promise.all([
        getMovieDetails(params.id),
        getMovieCredits(params.id),
        getMovieImages(params.id),
    ]);

    if (!movie) return notFound();


    return (
        
            
        
        <div className="max-w-6xl mx-auto px-4 py-8">
                <Breadcrumb currentTitle={movie.title} />
            {/* Movie Info */}
            <div className="flex flex-col md:flex-row gap-8 bg-gray-800 text-white p-8 border-b-amber-400 border-b-4">
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
                    <h1 className="text-3xl font-bold text-yellow-500">{movie.title}</h1>
                    <p className="text-white ">{movie.overview}</p>
                    <AddToWatchlist movie={{ id: movie.id, title: movie.title }} />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-white">
                        {movie.runtime && (
                            <p className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-yellow-400" />
                                Runtime: {movie.runtime} minutes
                            </p>
                        )}
                        <p className="flex items-center gap-2">
                            <CalendarDays className="w-4 h-4 text-yellow-400" />
                            Release: {movie.release_date}
                        </p>
                        <p className="flex items-center gap-2">
                            <Star className="w-4 h-4 text-yellow-400" />
                            Rating: {movie.vote_average.toFixed(1)} / 10
                        </p>
                        <p className="flex items-center gap-2">
                            <BadgeCheck className="w-4 h-4 text-yellow-400" />
                            Status: {movie.status}
                        </p>
                        <p className="flex items-center gap-2">
                            <Globe className="w-4 h-4 text-yellow-400" />
                            Country: {movie.production_countries?.[0]?.name ?? "N/A"}
                        </p>
                        <p className="flex items-center gap-2">
                            <Languages className="w-4 h-4 text-yellow-400" />
                            Language: {movie.spoken_languages?.[0]?.english_name ?? "N/A"}
                        </p>
                        {/* {movie.genres?.length > 0 && (
                            <p className="flex items-center gap-2 col-span-full sm:col-span-1">
                                <Tags className="w-4 h-4 text-yellow-400" />
                                Genres: {movie.genres.map((g) => g.name).join(", ")}
                            </p>
                        )} */}
                        {movie.production_companies?.[0]?.name && (
                            <p className="flex items-center gap-2 col-span-full sm:col-span-1">
                                <Building2 className="w-4 h-4 text-yellow-400" />
                                Studio: {movie.production_companies[0].name}
                            </p>
                        )}
                        {movie.belongs_to_collection && (
                            <div className="flex items-start gap-3 col-span-full mt-2">
                                <PackageOpen className="w-5 h-5 text-yellow-400 mt-1" />
                                <div>
                                    <p className="text-sm font-semibold">
                                        Part of: {movie.belongs_to_collection.name}
                                    </p>
                                    {movie.belongs_to_collection.poster_path && (
                                        <Image
                                            src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${movie.belongs_to_collection.poster_path}`}
                                            alt="Collection Poster"
                                            width={100}
                                            height={150}
                                            className="rounded mt-2"
                                        />
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Cast Section */}
            <ActorList actors={cast} />

            {/* Images Section */}
            <Gallery backdrops={images} />
        
        </div>
        
    );
}
