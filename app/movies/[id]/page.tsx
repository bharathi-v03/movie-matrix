import Image from "next/image";
import { getMovieDetails } from "@/services/tmdb";
import { IMAGE_BASE_URL } from "@/constants";

export default async function MovieDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const movie = await getMovieDetails(id);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-10">
      {/* HERO SECTION */}
      <div className="grid md:grid-cols-3 gap-8">
        <Image
          src={`${IMAGE_BASE_URL}${movie.poster_path}`}
          alt={movie.title}
          width={400}
          height={600}
          className="rounded-lg"
        />
        <Image
          src={`${IMAGE_BASE_URL}${movie.backdrop_path}`}
          alt={movie.title}
          width={400}
          height={600}
          className="rounded-lg"
        />
        <div className="md:col-span-2 space-y-3">
          <h1 className="text-4xl font-bold">{movie.title}</h1>

          <p className="text-gray-500 italic">
            {movie.tagline}
          </p>

          <p className="text-yellow-500 text-lg">
            ⭐ {movie.vote_average} / 10 ({movie.vote_count} votes)
          </p>

          <p>
            <b>Status:</b> {movie.status}
          </p>

          <p>
            <b>Release Date:</b> {movie.release_date}
          </p>

          <p>
            <b>Runtime:</b> {movie.runtime} minutes
          </p>

          <p>
            <b>Language:</b>{" "}
            {movie.original_language?.toUpperCase?.() ?? "N/A"}
          </p>

          <p>
            <b>Adult:</b> {movie.adult ? "Yes" : "No"}
          </p>

          <p>
            <b>Popularity:</b> {movie.popularity}
          </p>

          <p>
            <b>IMDB ID:</b> {movie.imdb_id}
          </p>

          <p>
            <b>Origin Country:</b>{" "}
            {movie.origin_country?.join(", ")}
          </p>
        </div>
      </div>

      {/* OVERVIEW */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">
          Overview
        </h2>
        <p className="text-gray-700 leading-relaxed">
          {movie.overview}
        </p>
      </section>

      {/* GENRES */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">
          Genres
        </h2>

        <div className="flex flex-wrap gap-2">
          {movie.genres?.map((g: any) => (
            <span
              key={g.id}
              className="px-3 py-1 bg-gray-200 rounded-full text-sm"
            >
              {g.name}
            </span>
          ))}
        </div>
      </section>

      {/* COLLECTION */}
      {movie.belongs_to_collection && (
        <section>
          <h2 className="text-2xl font-semibold mb-2">
            Collection
          </h2>

          <p>{movie.belongs_to_collection.name}</p>
        </section>
      )}

      {/* PRODUCTION COMPANIES */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">
          Production Companies
        </h2>

        <div className="flex flex-wrap gap-4">
          {movie.production_companies?.map((c: any) => (
            <div key={c.id} className="text-sm text-gray-600">
              {c.name}
            </div>
          ))}
        </div>
      </section>

      {/* PRODUCTION COUNTRIES */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">
          Production Countries
        </h2>

        <p>
          {movie.production_countries
            ?.map((c: any) => c.name)
            .join(", ")}
        </p>
      </section>

      {/* SPOKEN LANGUAGES */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">
          Spoken Languages
        </h2>

        <p>
          {movie.spoken_languages
            ?.map((l: any) => l.english_name)
            .join(", ")}
        </p>
      </section>

      {/* FINANCIALS */}
      <section className="grid md:grid-cols-2 gap-4">
        <div className="p-4 border rounded-lg">
          <p className="font-semibold">Budget</p>
          <p>${movie.budget?.toLocaleString()}</p>
        </div>

        <div className="p-4 border rounded-lg">
          <p className="font-semibold">Revenue</p>
          <p>${movie.revenue?.toLocaleString()}</p>
        </div>
      </section>

      {/* LINKS */}
      <section className="space-y-2">
        {movie.homepage && (
          <a
            href={movie.homepage}
            target="_blank"
            className="text-blue-600 underline"
          >
            Official Website
          </a>
        )}

        {movie.imdb_id && (
          <a
            href={`https://www.imdb.com/title/${movie.imdb_id}`}
            target="_blank"
            className="block text-blue-600 underline"
          >
            View on IMDb
          </a>
        )}
      </section>
    </div>
  );
}