"use client";

import { useEffect, useState } from "react";
import LimitedMovieGrid from "./LimitedMovieGrid";

export default function SmartSearch() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setMovies([]);
      return;
    }

    const timeout = setTimeout(async () => {
      setLoading(true);

      try {
        const res = await fetch(
          `/api/movies/smart-search?query=${encodeURIComponent(query)}`
        );
        const data = await res.json();

        setMovies(data);
      } catch (err) {
        console.error("Search failed:", err);
      } finally {
        setLoading(false);
      }
    }, 500); // debounce delay

    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <div className="p-4 space-y-6">
      {/* INPUT */}
      <div className="flex gap-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search movies..."
          className="border p-2 w-full rounded"
        />
      </div>

      {/* LOADING */}
      {loading && <p>Searching...</p>}

      {/* RESULT */}
      <div className="space-y-10">
        <LimitedMovieGrid initialMovies={movies} path={""} />
      </div>
    </div>
  );
}