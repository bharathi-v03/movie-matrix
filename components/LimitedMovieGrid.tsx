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
        flex gap-5 overflow-x-auto pb-4
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
            w-48
            transition-all
            duration-300
            hover:scale(0.5)
          "
        >
          <div
            className="
              relative
              w-48
              h-72
              overflow-hidden
              rounded-2xl
              bg-zinc-900
              shadow-lg
              shadow-black/30
            "
          >
            {movie.poster_path ? (
              <Image
                src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                alt={movie.title}
                fill
                sizes="192px"
                className="
                  object-cover
                  transition-transform
                  duration-500
                  group-hover:scale-110
                "
              />
            ) : (
              <div className="flex items-center justify-center h-full text-sm text-gray-400">
                No Poster Available
              </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

            {showRating && (
              <div
                className="
                  absolute
                  top-3
                  right-3
                  flex
                  items-center
                  gap-1
                  rounded-full
                  bg-black/70
                  backdrop-blur-md
                  px-2.5
                  py-1
                "
              >
                <Star
                  size={12}
                  fill="currentColor"
                  className="text-yellow-400"
                />
                <span className="text-xs font-semibold text-white">
                  {movie.vote_average?.toFixed(1)}
                </span>
              </div>
            )}

            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="font-semibold text-white line-clamp-2">
                {movie.title}
              </h3>

              <p className="text-xs text-gray-300 mt-1">
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
            w-48
            h-72
            rounded-2xl
            bg-zinc-900
            flex
            items-center
            justify-center
            transition-all
            duration-300
            hover:bg-red-500
          "
        >
          <div className="text-center">
            <p className="text-xl font-bold text-white">Show More</p>
          </div>
        </Link>
      )}
    </div>
  );
}
