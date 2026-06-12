import InfiniteMovieGrid from "@/components/InfiniteMovieGrid";
import PageHeader from "@/components/PageHeader";
import { getUpcomingMovies } from "@/services/tmdb";

export default async function UpcomingPage() {
  const data = await getUpcomingMovies(1);

  return (
    <div>
      <PageHeader title="Upcoming Movies" />
      <InfiniteMovieGrid
        initialMovies={data.results}
        apiUrl="/api/movies/upcoming"
        showRating={false}
      />
    </div>
  );
}
