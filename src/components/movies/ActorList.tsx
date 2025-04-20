"use client";

import { useState } from "react";
import Image from "next/image";

interface Actor {
    id: number;
    name: string;
    character: string;
    profile_path: string | null;
}

export default function ActorList({ actors }: { actors: Actor[] }) {
    const [showAll, setShowAll] = useState(false);

    const visibleActors = showAll ? actors : actors.slice(0, 5);

    return (
        <div className="mt-10">
            <h2 className="text-xl font-bold mb-4">Cast</h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
                {visibleActors.map((actor) => (
                    <div key={actor.id} className="text-center">
                        <Image
                            src={
                                actor.profile_path
                                    ? `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${actor.profile_path}`
                                    : "/images/fallback.jpg"
                            }
                            alt={actor.name}
                            width={100}
                            height={100}
                            className="rounded-full object-cover mx-auto shadow"
                        />
                        <p className="text-sm font-medium mt-2">{actor.name}</p>
                        <p className="text-xs text-gray-500">{actor.character}</p>
                    </div>
                ))}
            </div>

            {actors.length > 5 && (
                <div className="mt-4 text-center">
                    <button
                        onClick={() => setShowAll((prev) => !prev)}
                        className="text-blue-600 hover:underline text-sm"
                    >
                        {showAll ? "Show Less" : "Show All"}
                    </button>
                </div>
            )}
        </div>
    );
}
