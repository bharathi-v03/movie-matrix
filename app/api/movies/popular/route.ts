import { getPopularMovies } from "@/services/tmdb";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const page = Number(searchParams.get("page")) || 1;

  const data = await getPopularMovies(page);

  return Response.json(data);
}
