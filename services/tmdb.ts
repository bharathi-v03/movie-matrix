const BASE_URL = "https://api.themoviedb.org/3";

const options = {
  headers: {
    Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
    accept: "application/json",
  },
};

async function tmdbFetch(endpoint: string) {
  const controller = new AbortController();

  const timeout = setTimeout(() => {
    controller.abort();
  }, 10000);

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      signal: controller.signal,
      next: {
        revalidate: 3600,
      },
    });

    clearTimeout(timeout);

    if (!response.ok) {
      throw new Error(`TMDB Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    clearTimeout(timeout);

    console.error(`TMDB Fetch Failed: ${endpoint}`, error);

    return null;
  }
}

export async function getTrendingMovies(page = 1) {
  const data = await tmdbFetch(`/trending/movie/day?page=${page}`);

  return (
    data ?? {
      page,
      results: [],
      total_pages: 0,
      total_results: 0,
    }
  );
}

export async function getPopularMovies(page = 1) {
  const data = await tmdbFetch(`/movie/popular?page=${page}`);

  return (
    data ?? {
      page,
      results: [],
      total_pages: 0,
      total_results: 0,
    }
  );
}

export async function getTopRatedMovies(page = 1) {
  const data = await tmdbFetch(`/movie/top_rated?page=${page}`);

  return (
    data ?? {
      page,
      results: [],
      total_pages: 0,
      total_results: 0,
    }
  );
}

export async function getUpcomingMovies(page = 1) {
  const today = new Date();

  let currentPage = page;
  let totalPages = 1;

  const allMovies: any[] = [];
  const seenIds = new Set<number>();

  while (allMovies.length < 10 && currentPage <= totalPages) {
    const data = await tmdbFetch(`/movie/upcoming?page=${currentPage}`);

    if (!data) {
      break;
    }

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
  const data = await tmdbFetch(
    `/movie/${id}?append_to_response=credits,videos,images,recommendations,similar,reviews`,
  );

  return data;
}

export async function smartMovieSearch(query: string) {
  const data = await tmdbFetch(
    `/search/movie?query=${encodeURIComponent(query)}`,
  );

  return data?.results ?? [];
}
