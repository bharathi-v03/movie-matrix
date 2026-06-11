import { getTopRatedMovies } from "@/services/tmdb";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const page = Number(searchParams.get("page")) || 1;

  const data = await getTopRatedMovies(page);

  return Response.json(data);
}
