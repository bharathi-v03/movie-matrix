import Image from "next/image";
import Link from "next/link";
import { IMAGE_BASE_URL } from "@/constants";

export default function LimitedMovieGrid({
  initialMovies,
  path = "",
}: {
  initialMovies: any[];
  path: string;
}) {
  return (
    <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
      {initialMovies.map((movie) => (
        <Link
          key={movie.id}
          href={`/movies/${movie.id}`}
          className="flex-shrink-0 w-48"
        >
          <Image
            src={`${IMAGE_BASE_URL}${movie.poster_path}`}
            alt={movie.title}
            width={300}
            height={450}
            className="rounded-lg"
          />

          <h3 className="mt-2 font-medium">{movie.title}</h3>

          <p>⭐ {movie.vote_average}</p>
        </Link>
      ))}
      {path && (
        <Link
          href={path}
          className="flex-shrink-0 w-48 h-[270px] border rounded-lg flex items-center justify-center hover:bg-gray-100 transition"
        >
          <div className="text-center">
            <p className="text-lg font-semibold">Show More</p>
            <p className="text-sm text-gray-500">→</p>
          </div>
        </Link>
      )}
    </div>
  );
}
