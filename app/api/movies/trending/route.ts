import { getTrendingMovies } from "@/services/tmdb";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const page = Number(searchParams.get("page")) || 1;

  const data = await getTrendingMovies(page);

  return Response.json(data);
}
