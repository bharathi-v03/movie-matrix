import Image from "next/image";
import Link from "next/link";

import { getMovieDetails } from "@/services/tmdb";
import { IMAGE_BASE_URL } from "@/constants";
import PageHeader from "@/components/PageHeader";
import { Star, ExternalLink } from "lucide-react";
import LimitedMovieGrid from "@/components/LimitedMovieGrid";
import TitleComponent from "@/components/TitleComponent";

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

  const productionCompany = movie.production_companies?.[0]?.name || "Unknown";

  const productionCountries: string =
    Array.from(
      new Set(
        (movie.production_countries ?? []).map((country: any) => country.name),
      ),
    ).join(", ") || "Unknown";

  const hasBudget = movie.budget > 0;
  const hasRevenue = movie.revenue > 0;

  const formatMoney = (amount: number) => {
    if (!amount || amount <= 0) return "N/A";

    const format = (value: number, suffix: string) =>
      `$${Number(value.toFixed(1))}${suffix}`;

    if (amount >= 1_000_000_000) {
      return format(amount / 1_000_000_000, "B");
    }

    if (amount >= 1_000_000) {
      return format(amount / 1_000_000, "M");
    }

    if (amount >= 1_000) {
      return format(amount / 1_000, "K");
    }

    return `$${amount}`;
  };

  return (
    <>
      <PageHeader title={movie.title} />
      <div className="relative h-[75vh] overflow-hidden">
        <Image
          src={`${IMAGE_BASE_URL}${movie.backdrop_path}`}
          alt={movie.title}
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

        <div className="absolute inset-0">
          <div className="mx-auto flex h-full max-w-7xl items-end px-6 pb-12">
            <div className="flex flex-col gap-8 md:flex-row md:items-end">
              <Image
                src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                alt={movie.title}
                width={280}
                height={420}
                className="
                  rounded-2xl
                  border border-white/10
                  shadow-[0_20px_80px_rgba(0,0,0,0.7)]
                "
              />

              <div className="max-w-3xl space-y-5">
                <div>
                  <h1 className="text-5xl font-extrabold tracking-tight">
                    {movie.title}
                  </h1>

                  {movie.tagline && (
                    <p className="mt-2 text-lg italic text-gray-400">
                      {movie.tagline}
                    </p>
                  )}
                </div>

                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center gap-2 rounded-full bg-red-500 px-4 py-2 font-semibold">
                    <Star
                      size={16}
                      fill="currentColor"
                      className="text-yellow-300"
                    />
                    {movie.vote_average.toFixed(1)}
                  </div>

                  <div className="rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm">
                    {movie.runtime} min
                  </div>

                  <div className="rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm">
                    {movie.release_date}
                  </div>

                  <div className="rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm">
                    {movie.status}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {movie.genres?.map((genre: any) => (
                    <span
                      key={genre.id}
                      className="
                        rounded-full
                        border border-red-500/30
                        bg-red-500/10
                        px-4 py-2
                        text-sm
                        text-red-300
                        backdrop-blur-sm
                      "
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>

                <p className="max-w-2xl text-gray-300 line-clamp-4">
                  {movie.overview}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 space-y-12 py-6">
        {trailer && (
          <section>
            <TitleComponent title="Trailer" />

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

        {cast.length > 0 && (
          <section>
            <TitleComponent title="Cast" />

            <div
              className="
                flex gap-4 overflow-x-auto
                pb-4
                [&::-webkit-scrollbar]:hidden
              "
            >
              {cast.map((actor: any) => (
                <div key={actor.id} className="w-32 flex-shrink-0">
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

        <section>
          <TitleComponent title="Movie Information" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div
              className="
                rounded-2xl
                border border-white/10
                bg-white/5
                p-6
                backdrop-blur-sm
              "
            >
              <p className="text-sm text-gray-400">Production Company</p>

              <p className="mt-2 text-lg font-semibold">{productionCompany}</p>
            </div>

            <div
              className="
                rounded-2xl
                border border-white/10
                bg-white/5
                p-6
                backdrop-blur-sm
              "
            >
              <p className="text-sm text-gray-400">Production Country</p>

              <p className="mt-2 text-lg font-semibold">
                {productionCountries}
              </p>
            </div>

            {hasBudget && (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <p className="text-sm text-gray-400">Budget</p>

                <p className="mt-2 text-lg font-semibold">
                  {formatMoney(movie.budget)}
                </p>
              </div>
            )}

            {hasRevenue && (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <p className="text-sm text-gray-400">Revenue</p>

                <p className="mt-2 text-lg font-semibold">
                  {formatMoney(movie.revenue)}
                </p>
              </div>
            )}
          </div>
        </section>

        <section>
          <div className="mb-6 flex items-center gap-3">
            <div className="h-8 w-1 rounded-full bg-red-500" />
            <h2 className="text-3xl font-bold">Links</h2>
          </div>

          <div className="flex flex-wrap gap-4">
            {movie.homepage && (
              <a
                href={movie.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group
                  flex items-center gap-3
                  rounded-2xl
                  border border-white/10
                  bg-white/5
                  px-5 py-3
                  backdrop-blur-sm
                  transition-all
                  duration-300
                  hover:border-red-500/50
                  hover:bg-red-500
                "
              >
                <span className="font-medium">Official Website</span>

                <ExternalLink
                  size={16}
                  className="
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                    group-hover:-translate-y-1
                  "
                />
              </a>
            )}

            {movie.imdb_id && (
              <a
                href={`https://www.imdb.com/title/${movie.imdb_id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group
                  flex items-center gap-3
                  rounded-2xl
                  border border-white/10
                  bg-white/5
                  px-5 py-3
                  backdrop-blur-sm
                  transition-all
                  duration-300
                  hover:border-yellow-500/50
                  hover:bg-yellow-500
                  hover:text-black
                "
              >
                <span className="font-medium">View on IMDb</span>

                <ExternalLink
                  size={16}
                  className="
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                    group-hover:-translate-y-1
                  "
                />
              </a>
            )}
          </div>
        </section>

        {recommendations.length > 0 && (
          <section>
            <TitleComponent title="You may also like" />
            <LimitedMovieGrid initialMovies={recommendations} />
          </section>
        )}
      </div>
    </>
  );
}
