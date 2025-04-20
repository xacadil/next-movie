"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

interface Backdrop {
    file_path: string;
}

export default function Gallery({ backdrops }: { backdrops: Backdrop[] }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const thumbRefs = useRef<(HTMLDivElement | null)[]>([]);

    const scrollContainerRef = useRef<HTMLDivElement | null>(null);

    const goNext = () => {
        setCurrentIndex((prev) => (prev + 1) % backdrops.length);
    };

    const goPrev = () => {
        setCurrentIndex((prev) =>
            prev === 0 ? backdrops.length - 1 : prev - 1
        );
    };

    const handleThumbClick = (index: number) => {
        setCurrentIndex(index);
    };

    const setThumbRef = useCallback((el: HTMLDivElement | null, index: number) => {
        if (el) thumbRefs.current[index] = el;
    }, []);

    useEffect(() => {
        const activeThumb = thumbRefs.current[currentIndex];
        if (activeThumb) {
            activeThumb.scrollIntoView({
                behavior: "smooth",
                inline: "center",
                block: "nearest",
            });
        }
    }, [currentIndex]);

    if (backdrops.length === 0) return null;

    return (
        <div className="mt-10 w-full">
            <h2 className="text-xl font-bold mb-4">Gallery</h2>

            {/* Main Image */}
            <div className="relative aspect-video bg-black rounded-lg overflow-hidden shadow">
                <Image
                    src={`${process.env.NEXT_PUBLIC_IMAGE_ORIGINAL_URL}${backdrops[currentIndex].file_path}`}
                    alt={`Image ${currentIndex + 1}`}
                    fill
                    className="object-contain"
                    priority
                />

                {/* Left */}
                <button
                    onClick={goPrev}
                    className="cursor-pointer absolute top-1/2 left-2 -translate-y-1/2 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition"
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                {/* Right */}
                <button
                    onClick={goNext}
                    className="cursor-pointer absolute top-1/2 right-2 -translate-y-1/2 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition"
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>

            {/* Thumbnails */}
            <div
                ref={scrollContainerRef}
                className="mt-4 flex overflow-x-auto gap-2 pb-1 no-scrollbar scroll-smooth"
            >
                {backdrops.map((img, index) => (
                    <div
                        key={index}
                        ref={(el) => setThumbRef(el, index)}
                        className={`relative w-20 h-14 flex-shrink-0 cursor-pointer rounded overflow-hidden border-2 transition ${index === currentIndex
                                ? "border-blue-500 ring ring-blue-300"
                                : "border-transparent"
                            }`}
                        onClick={() => handleThumbClick(index)}
                    >
                        <Image
                            src={`${process.env.NEXT_PUBLIC_IMAGE_THUMB_URL}${img.file_path}`}
                            alt={`Thumbnail ${index + 1}`}
                            fill
                            className="object-cover"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
