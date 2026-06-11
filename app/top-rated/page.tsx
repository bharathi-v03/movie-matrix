import InfiniteMovieGrid from "@/components/InfiniteMovieGrid";
import { getTopRatedMovies } from "@/services/tmdb";

export default async function TopRatedPage() {
  const data = await getTopRatedMovies(1);

  return (
    <InfiniteMovieGrid
      initialMovies={data.results}
      apiUrl="/api/movies/top-rated"
    />
  );
}