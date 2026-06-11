import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

import { IMAGE_BASE_URL } from "@/constants";

export default function LimitedMovieGrid({
  initialMovies,
  path = "",
}: {
  initialMovies: any[];
  path?: string;
}) {
  return (
    <div
      className="
        flex gap-4 overflow-x-auto pb-4
        [&::-webkit-scrollbar]:hidden
        [scrollbar-width:none]
        [-ms-overflow-style:none]
      "
    >
      {initialMovies.map((movie) => (
        <Link
          key={movie.id}
          href={`/movies/${movie.id}`}
          className="flex-shrink-0 w-48 group"
        >
          <div className="relative w-48 h-72 bg-gray-900 rounded-lg overflow-hidden">
            {movie.poster_path ? (
              <Image
                src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                alt={movie.title}
                fill
                sizes="192px"
                className="
                  object-cover
                  transition-transform
                  duration-300
                  group-hover:scale-105
                "
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                No Poster Available
              </div>
            )}
          </div>

          <div className="mt-3">
            <h3 className="font-medium text-white line-clamp-1">
              {movie.title}
            </h3>

            <div className="flex items-center gap-1 mt-1 text-saffron">
              <Star size={16} fill="currentColor" strokeWidth={1.5} />
              <span className="text-white">
                {movie.vote_average?.toFixed(1) ?? "N/A"}
              </span>
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
            rounded-lg
            border border-white/10
            bg-white/5
            flex items-center justify-center
            hover:bg-white/10
            transition
          "
        >
          <div className="text-center">
            <p className="text-lg font-semibold text-white">Show More</p>
            <p className="text-santas-gray">→</p>
          </div>
        </Link>
      )}
    </div>
  );
}
