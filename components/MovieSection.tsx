import Link from "next/link";
import {
  getPopularMovies,
  getTopRatedMovies,
  getTrendingMovies,
  getUpcomingMovies,
} from "@/services/tmdb";
import LimitedMovieGrid from "./LimitedMovieGrid";
import SmartSearch from "./SmartSearch";
import { ChevronRight } from "lucide-react";

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
      title: "Trending Now",
      href: "/trending",
      movies: trendingMovies.results,
      showRating: true,
    },
    {
      title: "Top Rated",
      href: "/top-rated",
      movies: topRatedMovies.results,
      showRating: true,
    },
    {
      title: "Popular",
      href: "/popular",
      movies: popularMovies.results,
      showRating: true,
    },
    {
      title: "Upcoming",
      href: "/upcoming",
      movies: upcomingMovies.results,
      showRating: false,
    },
  ];

  return (
    <section className="p-6 space-y-10">
      <SmartSearch />
      {sections.map((section) => (
        <div key={section.href}>
          <Link
            href={section.href}
            className="
              group
              mb-4
              inline-flex
              items-center
              gap-2
              rounded-xl
              py-2
              text-2xl
              font-bold
              transition-all
              duration-300
              hover:text-red-500
            "
          >
            <span>{section.title}</span>

            <ChevronRight
              size={24}
              strokeWidth={4}
              className="
                transition-transform
                duration-300
                group-hover:translate-x-1
              "
            />
          </Link>

          <LimitedMovieGrid
            initialMovies={section.movies}
            path={section.href}
            showRating={section.showRating}
          />
        </div>
      ))}
    </section>
  );
}
