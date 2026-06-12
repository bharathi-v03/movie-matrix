import InfiniteMovieGrid from "@/components/InfiniteMovieGrid";
import PageHeader from "@/components/PageHeader";
import { getTopRatedMovies } from "@/services/tmdb";

export default async function TopRatedPage() {
  const data = await getTopRatedMovies(1);

  return (
    <div>
      <PageHeader title="Top Rated Movies" />
      <InfiniteMovieGrid
        initialMovies={data.results}
        apiUrl="/api/movies/top-rated"
      />
    </div>
  );
}
