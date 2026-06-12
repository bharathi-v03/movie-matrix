import InfiniteMovieGrid from "@/components/InfiniteMovieGrid";
import PageHeader from "@/components/PageHeader";
import { getTrendingMovies } from "@/services/tmdb";

export default async function TrendingPage() {
  const data = await getTrendingMovies(1);

  return (
    <div>
      <PageHeader title="Trending Movies" />
      <InfiniteMovieGrid
        initialMovies={data.results}
        apiUrl="/api/movies/trending"
      />
    </div>
  );
}
