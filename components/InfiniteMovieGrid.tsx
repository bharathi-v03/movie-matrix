"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { IMAGE_BASE_URL } from "@/constants";
import { Star } from "lucide-react";

export default function InfiniteMovieGrid({
  initialMovies,
  apiUrl,
  showRating = true,
}: {
  initialMovies: any[];
  apiUrl: string;
  showRating?: boolean;
}) {
  const [movies, setMovies] = useState(initialMovies);
  const [page, setPage] = useState(2);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loaderRef = useRef<HTMLDivElement | null>(null);

  const loadMoreMovies = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    try {
      const response = await fetch(`${apiUrl}?page=${page}`);
      const data = await response.json();

      if (apiUrl === "/api/movies/upcoming") {
        const today = new Date();

        data.results = data.results.filter((movie: any) => {
          return new Date(movie.release_date) > today;
        });
      }

      setMovies((prev) => {
        const existingIds = new Set(prev.map((movie) => movie.id));

        const newMovies = data.results.filter(
          (movie: any) => !existingIds.has(movie.id),
        );

        return [...prev, ...newMovies];
      });
      setHasMore(page < data.total_pages);
      setPage((prev) => prev + 1);
    } catch (error) {
      console.error("Failed to load movies:", error);
    } finally {
      setLoading(false);
    }
  }, [apiUrl, page, loading, hasMore]);

  useEffect(() => {
    const current = loaderRef.current;

    if (!current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          loadMoreMovies();
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(current);

    return () => observer.disconnect();
  }, [loadMoreMovies]);

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-6">
        {movies.map((movie) => (
          <Link key={movie.id} href={`/movies/${movie.id}`} className="group">
            <div
              className="
                relative
                aspect-[2/3]
                overflow-hidden
                rounded-2xl
                bg-zinc-900
                shadow-lg
                transition-all
                duration-300
                group-hover:shadow-2xl
              "
            >
              {movie.poster_path ? (
                <Image
                  src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                  alt={movie.title}
                  fill
                  sizes="300px"
                  className="
                    object-cover
                    transition-transform
                    duration-500
                    group-hover:scale-110
                  "
                />
              ) : (
                <div className="flex h-full items-center justify-center text-sm text-gray-400">
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
                    px-3
                    py-1
                    shadow-lg
                  "
                >
                  <Star
                    size={13}
                    fill="currentColor"
                    strokeWidth={1.5}
                    className="text-yellow-400"
                  />
                  <span className="text-xs font-bold text-white">
                    {movie.vote_average?.toFixed(1)}
                  </span>
                </div>
              )}

              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="font-semibold text-white line-clamp-2">
                  {movie.title}
                </h3>

                {movie.release_date && (
                  <p className="mt-1 text-xs text-gray-300">
                    {movie.release_date.split("-")[0]}
                  </p>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {loading && (
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-6">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="
                aspect-[2/3]
                rounded-2xl
                bg-zinc-800
                animate-pulse
              "
            />
          ))}
        </div>
      )}

      {!loading && movies.length === 0 && (
        <div className="py-20 text-center text-gray-400">No movies found.</div>
      )}

      {!hasMore && movies.length > 0 && (
        <div className="py-10 text-center text-gray-500">
          You've reached the end 🎬
        </div>
      )}

      <div ref={loaderRef} className="h-20 flex items-center justify-center" />
    </>
  );
}
