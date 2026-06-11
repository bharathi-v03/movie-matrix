import Link from "next/link";
import {
  getPopularMovies,
  getTopRatedMovies,
  getTrendingMovies,
  getUpcomingMovies,
} from "@/services/tmdb";
import LimitedMovieGrid from "./LimitedMovieGrid";
import SmartSearch from "./SmartSearch";

export default async function MovieSection() {
  const [trendingMovies, topRatedMovies, popularMovies, upcomingMovies] =
    await Promise.all([
      getTrendingMovies(1),
      getTopRatedMovies(1),
      getPopularMovies(1),
      getUpcomingMovies(1),
    ]);

  const sections = [
    {
      title: "Trending Movies",
      href: "/trending",
      movies: trendingMovies.results,
    },
    {
      title: "Top Rated Movies",
      href: "/top-rated",
      movies: topRatedMovies.results,
    },
    {
      title: "Popular Movies",
      href: "/popular",
      movies: popularMovies.results,
    },
    {
      title: "Upcoming Movies",
      href: "/upcoming",
      movies: upcomingMovies.results,
    },
  ];

  return (
    <section className="p-6 space-y-10">
      <SmartSearch />
      {sections.map((section) => (
        <div key={section.href}>
          <Link href={section.href} className="mb-4 block text-2xl font-bold">
            {section.title}
          </Link>

          <LimitedMovieGrid
            initialMovies={section.movies}
            path={section.href}
          />
        </div>
      ))}
    </section>
  );
}
