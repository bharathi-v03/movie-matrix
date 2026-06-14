import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

import { IMAGE_BASE_URL } from "@/constants";

export default function LimitedMovieGrid({
  initialMovies,
  path = "",
  showRating = true,
}: {
  initialMovies: any[];
  path?: string;
  showRating?: boolean;
}) {
  return (
    <div
      className="
        flex gap-2 sm:gap-4
        overflow-x-auto pb-4 scroll-smooth
        [&::-webkit-scrollbar]:hidden
        [scrollbar-width:none]
        [-ms-overflow-style:none]
      "
    >
      {initialMovies.map((movie) => (
        <Link
          key={movie.id}
          href={`/movies/${movie.id}`}
          className="
            group
            relative
            flex-shrink-0
            w-32 sm:w-40 md:w-44
            transition-transform duration-300
            hover:scale(0.5)
          "
        >
          <div
            className="
              relative
              w-full
              aspect-[2/3]
              overflow-hidden
              rounded-lg sm:rounded-xl
              bg-zinc-900
              shadow-md shadow-black/30
            "
          >
            {movie.poster_path ? (
              <Image
                src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                alt={movie.title}
                fill
                sizes="(max-width: 640px) 120px, (max-width: 1024px) 160px, 180px"
                className="
                  object-cover
                  transition-transform duration-500
                  group-hover:scale-110
                "
              />
            ) : (
              <div className="flex items-center justify-center h-full text-[10px] text-gray-400">
                No Poster
              </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

            {showRating && (
              <div
                className="
                  absolute
                  top-2 right-2
                  flex items-center gap-1
                  rounded-full
                  bg-black/70
                  backdrop-blur-md
                  px-2 py-0.5
                "
              >
                <Star
                  size={11}
                  fill="currentColor"
                  className="text-yellow-400"
                />
                <span className="text-[9px] sm:text-xs font-semibold text-white">
                  {movie.vote_average?.toFixed(1)}
                </span>
              </div>
            )}

            <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3">
              <h3 className="font-semibold text-white text-xs sm:text-sm line-clamp-2">
                {movie.title}
              </h3>

              <p className="text-[9px] sm:text-xs text-gray-300 mt-1">
                {movie.release_date?.split("-")[0]}
              </p>
            </div>
          </div>
        </Link>
      ))}

      {path && (
        <Link
          href={path}
          className="
            flex-shrink-0
            w-32 sm:w-40 md:w-44
            aspect-[2/3]
            rounded-lg sm:rounded-xl
            bg-zinc-900
            flex items-center justify-center
            transition-all duration-300
            hover:bg-red-500
            active:scale-95
          "
        >
          <p className="text-xs sm:text-sm font-bold text-white">Show More</p>
        </Link>
      )}
    </div>
  );
}
