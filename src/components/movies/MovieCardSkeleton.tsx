import Skeleton from "react-loading-skeleton";

/**
 * A loading skeleton for a MovieCard, mimicking the layout
 * with loading skeletons for the image, title, genres, and
 * ratings.
 */
export default function MovieCardSkeleton() {
    return (
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm p-4">
            <Skeleton height={300} borderRadius="8px" />
            <div className="mt-4 space-y-2">
                <Skeleton height={20} width="70%" />
                <Skeleton height={14} width="90%" />
                <Skeleton height={14} width="60%" />
                <Skeleton height={32} width="40%" />
            </div>
        </div>
    );
}
