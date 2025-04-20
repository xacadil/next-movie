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
        <div className="bg-zinc-200 p-5 border-b-4 border-b-gray-400">
            {/* Section Header */}
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Cast</h2>
                {actors.length > 5 && (
                    <label className="inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            checked={showAll}
                            onChange={() => setShowAll((prev) => !prev)}
                            className="sr-only peer"
                        />
                        <div className="relative w-11 h-6 bg-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" />
                        <span className="ms-3 text-sm font-medium text-black dark:text-gray-900">Show all</span>
                    </label>
                )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
                {visibleActors.map((actor) => (
                    <div key={actor.id} className="text-center">
                        <Image
                            src={
                                actor.profile_path
                                    ? `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${actor.profile_path}`
                                    : "/fallback.png"
                            }
                            alt={actor.name}
                            width={300}
                            height={300}
                            className="w-70 h-50 object-cover rounded-full"
                        />
                        <p className="text-sm font-medium mt-2">{actor.name}</p>
                        <p className="text-xs text-gray-500">{actor.character}</p>
                    </div>
                ))}
            </div>

           
        </div>
    );
}
