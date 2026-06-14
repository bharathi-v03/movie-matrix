import { Clapperboard } from "lucide-react";
import Image from "next/image";

const TitlePage = () => {
  return (
    <div className="relative flex items-center justify-center h-[calc(100dvh-80px)] sm:h-[85vh] overflow-hidden">
      <div className="relative z-10 flex flex-col items-center text-center px-4 sm:px-6 max-w-3xl">
        <div className="mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3 rounded-full border border-white/10 bg-white/5 px-3 sm:px-4 py-2 backdrop-blur-md">
          <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-red-500 shadow-lg shadow-red-500/30">
            <Clapperboard className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
          </div>

          <span className="text-xs sm:text-sm font-medium text-santas-gray">
            Discover • Search • Explore
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight">
          Movie{" "}
          <span className="bg-gradient-to-r from-red-500 via-red-400 to-red-600 bg-clip-text text-transparent">
            Matrix
          </span>
        </h1>

        <p className="mt-4 sm:mt-6 max-w-xl text-sm sm:text-lg md:text-xl text-santas-gray leading-relaxed px-2 sm:px-0">
          Explore trending movies, discover hidden gems, and dive into detailed
          ratings, cast information, and recommendations.
        </p>

        <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          <div className="rounded-full border border-white/10 bg-white/5 px-3 sm:px-4 py-2 text-xs sm:text-sm text-white/80">
            🎬 20,000+ Movies
          </div>

          <div className="rounded-full border border-white/10 bg-white/5 px-3 sm:px-4 py-2 text-xs sm:text-sm text-white/80">
            ⭐ Real-time Data
          </div>
        </div>
      </div>

      <div className="absolute inset-0 overflow-hidden">
        <div className="scroll-track">
          <div className="slide">
            <Image
              src="/images/background.jpg"
              alt=""
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="slide">
            <Image
              src="/images/background.jpg"
              alt=""
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-tl from-black/90 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-b from-transparent via-[#0e0e11]/70 to-[#0e0e11]" />
      </div>
    </div>
  );
};

export default TitlePage;
