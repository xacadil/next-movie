"use client";

import ImageGallery from "react-image-gallery";

interface Backdrop {
    file_path: string;
}

/**
 * Renders a gallery component using an array of backdrops. Each backdrop is 
 * displayed as an image with a corresponding thumbnail. The gallery includes 
 * features such as play button, fullscreen button, and navigation controls.
 * 
 * @param {Object} props - The properties object.
 * @param {Backdrop[]} props.backdrops - An array of backdrop objects, each 
 * containing a `file_path` string used to construct image URLs.
 * 
 * @returns {JSX.Element | null} A JSX element representing the image gallery 
 * or null if no backdrops are provided.
 */

export default function Gallery({ backdrops }: { backdrops: Backdrop[] }) {
    if (!backdrops || backdrops.length === 0) return null;

    const items = backdrops.map((img) => ({
        original: `${process.env.NEXT_PUBLIC_IMAGE_ORIGINAL_URL}${img.file_path}`,
        thumbnail: `${process.env.NEXT_PUBLIC_IMAGE_THUMB_URL}${img.file_path}`,
    }));

    return (
        <div className="w-full bg-white p-5">
            <h2 className="text-xl font-bold mb-4">Gallery</h2>
            <ImageGallery
                items={items}
                showPlayButton={true}
                showFullscreenButton={true}
                showNav={true}
                showBullets={false}
                lazyLoad={true}
                slideDuration={350}
                slideInterval={4000}
            />
        </div>
    );
}
