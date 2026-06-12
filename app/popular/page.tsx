import InfiniteMovieGrid from "@/components/InfiniteMovieGrid";
import PageHeader from "@/components/PageHeader";
import { getPopularMovies } from "@/services/tmdb";

export default async function PopularPage() {
  const data = await getPopularMovies(1);

  return (
    <div>
      <PageHeader title="Popular Movies" />
      <InfiniteMovieGrid
        initialMovies={data.results}
        apiUrl="/api/movies/popular"
      />
    </div>
  );
}
