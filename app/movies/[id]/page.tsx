import Image from "next/image";
import Link from "next/link";

import { getMovieDetails } from "@/services/tmdb";
import { IMAGE_BASE_URL } from "@/constants";

export default async function MovieDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const movie = await getMovieDetails(id);

  const cast = movie.credits?.cast?.slice(0, 12) || [];

  const trailer = movie.videos?.results?.find(
    (video: any) => video.site === "YouTube" && video.type === "Trailer",
  );

  const recommendations = movie.recommendations?.results?.slice(0, 8) || [];

  const similarMovies = movie.similar?.results?.slice(0, 8) || [];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-12">
      <div className="grid md:grid-cols-4 gap-8">
        <div>
          <Image
            src={`${IMAGE_BASE_URL}${movie.poster_path}`}
            alt={movie.title}
            width={400}
            height={600}
            className="rounded-lg w-full"
          />
        </div>

        <div>
          <Image
            src={`${IMAGE_BASE_URL}${movie.backdrop_path}`}
            alt={movie.title}
            width={500}
            height={600}
            className="rounded-lg w-full h-full object-cover"
          />
        </div>

        <div className="md:col-span-2 space-y-3">
          <h1 className="text-4xl font-bold">{movie.title}</h1>

          {movie.tagline && (
            <p className="italic text-gray-500">{movie.tagline}</p>
          )}

          <p className="text-yellow-500 text-lg">
            ⭐ {movie.vote_average?.toFixed(1)} / 10 ({movie.vote_count} votes)
          </p>

          <p>
            <b>Status:</b> {movie.status}
          </p>

          <p>
            <b>Release Date:</b> {movie.release_date}
          </p>

          <p>
            <b>Runtime:</b> {movie.runtime} min
          </p>

          <p>
            <b>Language:</b> {movie.original_language?.toUpperCase()}
          </p>

          <p>
            <b>Popularity:</b> {movie.popularity?.toFixed(0)}
          </p>

          <p>
            <b>Adult:</b> {movie.adult ? "Yes" : "No"}
          </p>

          <p>
            <b>Origin Country:</b> {movie.origin_country?.join(", ")}
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {movie.genres?.map((genre: any) => (
              <span
                key={genre.id}
                className="px-3 py-1 rounded-full bg-gray-200 text-sm"
              >
                {genre.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* OVERVIEW */}
      <section>
        <h2 className="text-2xl font-semibold mb-3">Overview</h2>

        <p className="leading-relaxed text-gray-700">{movie.overview}</p>
      </section>

      {/* TRAILER */}
      {trailer && (
        <section>
          <h2 className="text-2xl font-semibold mb-4">Trailer</h2>

          <div className="aspect-video overflow-hidden rounded-lg">
            <iframe
              src={`https://www.youtube.com/embed/${trailer.key}`}
              title={trailer.name}
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </section>
      )}

      {/* CAST */}
      {cast.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold mb-4">Cast</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {cast.map((actor: any) => (
              <div key={actor.id} className="text-center">
                {actor.profile_path ? (
                  <Image
                    src={`${IMAGE_BASE_URL}${actor.profile_path}`}
                    alt={actor.name}
                    width={150}
                    height={225}
                    className="rounded-lg mx-auto"
                  />
                ) : (
                  <div className="w-[150px] h-[225px] bg-gray-200 rounded-lg mx-auto" />
                )}

                <p className="mt-2 font-medium">{actor.name}</p>

                <p className="text-sm text-gray-500">{actor.character}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* COLLECTION */}
      {movie.belongs_to_collection && (
        <section>
          <h2 className="text-2xl font-semibold mb-3">Collection</h2>

          <p>{movie.belongs_to_collection.name}</p>
        </section>
      )}

      {/* PRODUCTION INFO */}
      <section className="grid md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-2xl font-semibold mb-3">Production Companies</h2>

          <ul className="space-y-1">
            {movie.production_companies?.map((company: any) => (
              <li key={company.id}>{company.name}</li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-3">Production Countries</h2>

          <p>
            {movie.production_countries
              ?.map((country: any) => country.name)
              .join(", ")}
          </p>
        </div>
      </section>

      {/* LANGUAGES */}
      <section>
        <h2 className="text-2xl font-semibold mb-3">Spoken Languages</h2>

        <p>
          {movie.spoken_languages
            ?.map((lang: any) => lang.english_name)
            .join(", ")}
        </p>
      </section>

      {/* FINANCIALS */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Financials</h2>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="border rounded-lg p-4">
            <p className="font-semibold">Budget</p>
            <p>${movie.budget?.toLocaleString() || "Unknown"}</p>
          </div>

          <div className="border rounded-lg p-4">
            <p className="font-semibold">Revenue</p>
            <p>${movie.revenue?.toLocaleString() || "Unknown"}</p>
          </div>
        </div>
      </section>

      {/* RECOMMENDATIONS */}
      {recommendations.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold mb-4">Recommended Movies</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {recommendations.map((movie: any) => (
              <Link key={movie.id} href={`/movies/${movie.id}`}>
                <Image
                  src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                  alt={movie.title}
                  width={200}
                  height={300}
                  className="rounded-lg hover:scale-105 transition"
                />

                <p className="mt-2 text-sm">{movie.title}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* SIMILAR MOVIES */}
      {similarMovies.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold mb-4">Similar Movies</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {similarMovies.map((movie: any) => (
              <Link key={movie.id} href={`/movies/${movie.id}`}>
                <Image
                  src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                  alt={movie.title}
                  width={200}
                  height={300}
                  className="rounded-lg hover:scale-105 transition"
                />

                <p className="mt-2 text-sm">{movie.title}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* EXTERNAL LINKS */}
      <section className="space-y-2">
        {movie.homepage && (
          <a
            href={movie.homepage}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-blue-600 underline"
          >
            Official Website
          </a>
        )}

        {movie.imdb_id && (
          <a
            href={`https://www.imdb.com/title/${movie.imdb_id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-blue-600 underline"
          >
            View on IMDb
          </a>
        )}
      </section>
    </div>
  );
}
