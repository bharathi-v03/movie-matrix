import InfiniteMovieGrid from "@/components/InfiniteMovieGrid";
import { getUpcomingMovies } from "@/services/tmdb";

export default async function UpcomingPage() {
  const data = await getUpcomingMovies(1);

  return (
    <InfiniteMovieGrid
      initialMovies={data.results}
      apiUrl="/api/movies/upcoming"
    />
  );
}
