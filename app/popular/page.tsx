import InfiniteMovieGrid from "@/components/InfiniteMovieGrid";
import { getPopularMovies } from "@/services/tmdb";

export default async function PopularPage() {
  const data = await getPopularMovies(1);

  return (
    <InfiniteMovieGrid
      initialMovies={data.results}
      apiUrl="/api/movies/popular"
    />
  );
}