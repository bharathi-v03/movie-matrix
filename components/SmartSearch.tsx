"use client";

import { useEffect, useState } from "react";
import { Search, X } from "lucide-react";

import LimitedMovieGrid from "./LimitedMovieGrid";

export default function SmartSearch() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setMovies([]);
      setHasSearched(false);
      return;
    }

    const timeout = setTimeout(async () => {
      setLoading(true);

      try {
        const res = await fetch(
          `/api/movies/smart-search?query=${encodeURIComponent(query)}`,
        );

        const data = await res.json();

        setMovies(data || []);
        setHasSearched(true);
      } catch (err) {
        console.error("Search failed:", err);
        setMovies([]);
        setHasSearched(true);
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <div className="space-y-8">
      <div className="max-w-2xl mx-auto">
        <div className="relative">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-santas-gray"
            size={20}
          />

          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search movies..."
            className="
              w-full
              rounded-full
              bg-woodsmoke
              border
              border-white/10
              py-3
              pl-12
              pr-12
              text-white
              placeholder:text-santas-gray
              outline-none
              transition
              focus:border-red-500
              focus:ring-2
              focus:ring-red-500/20
            "
          />

          {query && (
            <button
              onClick={() => {
                setQuery("");
                setMovies([]);
                setHasSearched(false);
              }}
              className="
                absolute
                right-4
                top-1/2
                -translate-y-1/2
                text-santas-gray
                hover:text-white
                transition
                cursor-pointer
              "
            >
              <X size={18} />
            </button>
          )}
        </div>
      </div>

      {query.trim() && (
        <p className="text-santas-gray">
          {loading ? (
            <>Searching for "{query}"...</>
          ) : movies.length > 0 ? (
            <>
              {movies.length} result
              {movies.length !== 1 ? "s" : ""} for{" "}
              <span className="text-white font-medium">"{query}"</span>
            </>
          ) : hasSearched ? (
            <>
              Results for{" "}
              <span className="text-white font-medium">"{query}"</span>
            </>
          ) : null}
        </p>
      )}

      {loading && (
        <div className="space-y-4">
          <div className="flex gap-4 overflow-hidden">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="flex-shrink-0 w-48">
                <div className="h-72 rounded-lg bg-white/5 animate-pulse" />

                <div className="mt-3 h-4 w-3/4 rounded bg-white/5 animate-pulse" />

                <div className="mt-2 h-4 w-1/4 rounded bg-white/5 animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      )}

      {!loading && movies.length > 0 && (
        <LimitedMovieGrid initialMovies={movies} path="" />
      )}

      {!loading && hasSearched && query.trim() && movies.length === 0 && (
        <div className="py-12 text-center">
          <h3 className="text-xl font-semibold text-white">No results found</h3>

          <p className="mt-2 text-santas-gray">No movies found for "{query}"</p>
        </div>
      )}
    </div>
  );
}
