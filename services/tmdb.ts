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
  const today = new Date();

  let currentPage = page;
  let totalPages = 1;

  const allMovies: any[] = [];
  const seenIds = new Set<number>();

  while (allMovies.length < 10 && currentPage <= totalPages) {
    const response = await fetch(
      `${BASE_URL}/movie/upcoming?page=${currentPage}`,
      options,
    );

    if (!response.ok) {
      throw new Error(`TMDB Error: ${response.status}`);
    }

    const data = await response.json();

    totalPages = data.total_pages;

    const futureMovies = data.results.filter((movie: any) => {
      return new Date(movie.release_date) > today && !seenIds.has(movie.id);
    });

    futureMovies.forEach((movie: any) => {
      seenIds.add(movie.id);
      allMovies.push(movie);
    });

    currentPage++;
  }

  return {
    page,
    results: allMovies.slice(0, 10),
    total_results: allMovies.length,
    total_pages: totalPages,
  };
}

export async function getMovieDetails(id: string) {
  const response = await fetch(
    `${BASE_URL}/movie/${id}?append_to_response=credits,videos,images,recommendations,similar,reviews`,
    options,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch movie details");
  }
  return response.json();
}

export async function smartMovieSearch(query: string) {
  const response = await fetch(
    `${BASE_URL}/search/movie?query=${encodeURIComponent(query)}`,
    options,
  );

  const data = await response.json();

  if (!data.results?.length) return null;

  return data.results;
}
