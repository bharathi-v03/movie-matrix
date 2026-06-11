import { smartMovieSearch } from "@/services/tmdb";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const query = searchParams.get("query") || "";

  if (!query) {
    return Response.json(null);
  }

  const movie = await smartMovieSearch(query);

  return Response.json(movie);
}
