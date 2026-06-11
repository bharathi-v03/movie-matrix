"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { IMAGE_BASE_URL } from "@/constants";
import Link from "next/link";

export default function InfiniteMovieGrid({
  initialMovies,
  apiUrl,
}: {
  initialMovies: any[];
  apiUrl: string;
}) {
  const [movies, setMovies] = useState(initialMovies);
  const [page, setPage] = useState(2);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loaderRef = useRef<HTMLDivElement | null>(null);

  const loadMoreMovies = async () => {
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
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          loadMoreMovies();
        }
      },
      { threshold: 0.1 },
    );

    const current = loaderRef.current;

    if (current) {
      observer.observe(current);
    }

    return () => observer.disconnect();
  }, [page, loading, hasMore]);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <Link key={movie.id} href={`/movies/${movie.id}`} className="block">
            <Image
              src={`${IMAGE_BASE_URL}${movie.poster_path}`}
              alt={movie.title}
              width={300}
              height={450}
            />

            <h3>{movie.title}</h3>
            <p>⭐ {movie.vote_average}</p>
          </Link>
        ))}
      </div>

      <div ref={loaderRef} className="h-20 flex items-center justify-center">
        {loading && <p>Loading...</p>}
      </div>
    </>
  );
}
