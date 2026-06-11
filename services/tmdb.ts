const BASE_URL = "https://api.themoviedb.org/3";

const options = {
  headers: {
    Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
    accept: "application/json",
  },
};

export async function getTrendingMovies(page = 1) {
  const response = await fetch(
    `${BASE_URL}/trending/movie/day?page=${page}`,
    options,
  );

  if (!response.ok) {
    throw new Error(`TMDB Error: ${response.status}`);
  }

  return response.json();
}

export async function getPopularMovies(page = 1) {
  const response = await fetch(
    `${BASE_URL}/movie/popular?page=${page}`,
    options,
  );

  if (!response.ok) {
    throw new Error(`TMDB Error: ${response.status}`);
  }

  return response.json();
}

export async function getTopRatedMovies(page = 1) {
  const response = await fetch(
    `${BASE_URL}/movie/top_rated?page=${page}`,
    options,
  );

  if (!response.ok) {
    throw new Error(`TMDB Error: ${response.status}`);
  }

  return response.json();
}

export async function getUpcomingMovies(page = 1) {
  const response = await fetch(
    `${BASE_URL}/movie/upcoming?page=${page}`,
    options,
  );

  if (!response.ok) {
    throw new Error(`TMDB Error: ${response.status}`);
  }

  return response.json();
}

export async function getMovieDetails(id: string) {
  const response = await fetch(`${BASE_URL}/movie/${id}`, options);

  return response.json();
}

export async function smartMovieSearch(query: string) {
  const response = await fetch(
    `${BASE_URL}/search/movie?query=${encodeURIComponent(query)}`,
    options,
  );

  const data = await response.json();

  if (!data.results?.length) return null;

  // best match = first result (TMDB is already relevance sorted)
  return data.results;
}
