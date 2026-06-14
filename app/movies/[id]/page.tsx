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

      <div className="relative h-[calc(100vh-61px)] sm:h-[75vh] overflow-hidden">
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
          <div className="mx-auto flex h-full max-w-7xl items-end px-4 sm:px-6 pb-8 sm:pb-12">
            <div className="flex flex-col gap-5 md:flex-row md:items-end md:gap-8 items-center md:items-end">
              <Image
                src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                alt={movie.title}
                width={180}
                height={270}
                sizes="(max-width: 768px) 180px, 280px"
                className="
                    w-[180px] h-[270px]
                    md:w-[280px] md:h-[420px]
                    rounded-xl sm:rounded-2xl
                    border border-white/10
                    shadow-[0_20px_80px_rgba(0,0,0,0.7)]
                    object-cover
                  "
              />

              <div className="max-w-3xl space-y-4 sm:space-y-5 text-center md:text-left">
                <div>
                  <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
                    {movie.title}
                  </h1>

                  {movie.tagline && (
                    <p className="mt-2 text-sm sm:text-lg italic text-gray-400">
                      {movie.tagline}
                    </p>
                  )}
                </div>

                <div className="flex flex-wrap gap-2 sm:gap-3 justify-center sm:justify-start">
                  <div className="flex items-center gap-2 rounded-full bg-red-500 px-3 sm:px-4 py-1.5 sm:py-2 font-semibold text-sm sm:text-base">
                    <Star
                      size={14}
                      fill="currentColor"
                      className="text-yellow-300"
                    />
                    {movie.vote_average.toFixed(1)}
                  </div>

                  <div className="rounded-full bg-white/10 px-3 sm:px-4 py-1.5 sm:py-2 backdrop-blur-sm text-sm">
                    {movie.runtime} min
                  </div>

                  <div className="rounded-full bg-white/10 px-3 sm:px-4 py-1.5 sm:py-2 backdrop-blur-sm text-sm">
                    {movie.release_date}
                  </div>

                  <div className="rounded-full bg-white/10 px-3 sm:px-4 py-1.5 sm:py-2 backdrop-blur-sm text-sm">
                    {movie.status}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                  {movie.genres?.map((genre: any) => (
                    <span
                      key={genre.id}
                      className="
                        rounded-full
                        border border-red-500/30
                        bg-red-500/10
                        px-3 sm:px-4 py-1.5 sm:py-2
                        text-xs sm:text-sm
                        text-red-300
                        backdrop-blur-sm
                      "
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>

                <p className="max-w-2xl text-sm sm:text-base text-gray-300 line-clamp-4">
                  {movie.overview}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full sm:max-w-7xl sm:mx-auto p-3 sm:px-6 space-y-12 py-6">
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

            <div className="flex gap-1 sm:gap-4 overflow-x-auto pb-4 [&::-webkit-scrollbar]:hidden">
              {cast.map((actor: any) => (
                <div
                  key={actor.id}
                  className="w-20 sm:w-32 flex-shrink-0 text-center"
                >
                  <div className="relative mx-auto w-16 sm:w-28">
                    {actor.profile_path ? (
                      <Image
                        src={`${IMAGE_BASE_URL}${actor.profile_path}`}
                        alt={actor.name}
                        width={110}
                        height={165}
                        className="
                          rounded-xl
                          object-cover
                          shadow-md
                        "
                      />
                    ) : (
                      <div className="w-16 sm:w-28 h-24 sm:h-36 bg-white/10 rounded-xl mx-auto" />
                    )}
                  </div>

                  <p className="mt-2 text-xs sm:text-sm font-semibold text-white line-clamp-1">
                    {actor.name}
                  </p>

                  <p className="text-[10px] sm:text-xs text-gray-400 line-clamp-1">
                    {actor.character}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        <section>
          <TitleComponent title="Movie Information" />

          <div className="space-y-3 sm:space-y-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-4">
            <div className="flex sm:flex-col sm:items-start items-center justify-between gap-2 sm:gap-1 border-b sm:border-b-0 border-white/10 pb-3 sm:rounded-2xl sm:border sm:bg-white/5 sm:p-6">
              <span className="text-xs sm:text-sm text-gray-400">
                Production Company
              </span>
              <span className="text-sm sm:text-base font-medium text-white sm:mt-2 sm:text-left text-right max-w-[60%] sm:max-w-full truncate">
                {productionCompany}
              </span>
            </div>

            <div className="flex sm:flex-col sm:items-start items-center justify-between gap-2 sm:gap-1 border-b sm:border-b-0 border-white/10 pb-3 sm:rounded-2xl sm:border sm:bg-white/5 sm:p-6">
              <span className="text-xs sm:text-sm text-gray-400">
                Production Country
              </span>
              <span className="text-sm sm:text-base font-medium text-white sm:mt-2 sm:text-left text-right max-w-[60%] sm:max-w-full truncate">
                {productionCountries}
              </span>
            </div>

            {hasBudget && (
              <div className="flex sm:flex-col sm:items-start items-center justify-between gap-2 sm:gap-1 border-b sm:border-b-0 border-white/10 pb-3 sm:rounded-2xl sm:border sm:bg-white/5 sm:p-6">
                <span className="text-xs sm:text-sm text-gray-400">Budget</span>
                <span className="text-sm sm:text-base font-medium text-white sm:mt-2">
                  {formatMoney(movie.budget)}
                </span>
              </div>
            )}

            {hasRevenue && (
              <div className="flex sm:flex-col sm:items-start items-center justify-between gap-2 sm:gap-1 border-b sm:border-b-0 border-white/10 pb-3 sm:rounded-2xl sm:border sm:bg-white/5 sm:p-6">
                <span className="text-xs sm:text-sm text-gray-400">
                  Revenue
                </span>
                <span className="text-sm sm:text-base font-medium text-white sm:mt-2">
                  {formatMoney(movie.revenue)}
                </span>
              </div>
            )}
          </div>
        </section>

        <section>
          <div className="mb-4 sm:mb-6 flex items-center gap-3">
            <div className="h-6 sm:h-8 w-1 rounded-full bg-red-500" />
            <h2 className="text-2xl sm:text-3xl font-bold">Links</h2>
          </div>

          <div className="flex flex-wrap gap-3 sm:gap-4">
            {movie.homepage && (
              <a
                href={movie.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group flex items-center gap-3
                  rounded-2xl border border-white/10
                  bg-white/5 px-4 sm:px-5 py-2.5 sm:py-3
                  text-sm sm:text-base
                  backdrop-blur-sm
                  transition-all
                  hover:border-red-500/50 hover:bg-red-500
                "
              >
                Official Website
                <ExternalLink size={16} />
              </a>
            )}

            {movie.imdb_id && (
              <a
                href={`https://www.imdb.com/title/${movie.imdb_id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group flex items-center gap-3
                  rounded-2xl border border-white/10
                  bg-white/5 px-4 sm:px-5 py-2.5 sm:py-3
                  text-sm sm:text-base
                  backdrop-blur-sm
                  transition-all
                  hover:border-yellow-500/50 hover:bg-yellow-500 hover:text-black
                "
              >
                View on IMDb
                <ExternalLink size={16} />
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
