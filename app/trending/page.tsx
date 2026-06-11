import InfiniteMovieGrid from "@/components/InfiniteMovieGrid";
import { getTrendingMovies } from "@/services/tmdb";

export default async function TrendingPage() {
  const data = await getTrendingMovies(1);

  return (
    <InfiniteMovieGrid
      initialMovies={data.results}
      apiUrl="/api/movies/trending"
    />
  );
}