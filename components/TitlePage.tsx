import { Clapperboard } from "lucide-react";
import Image from "next/image";

const TitlePage = () => {
  return (
    <div className="relative flex justify-center items-center h-[80vh]">
      <div className="z-10">
        <div className="flex justify-center items-center bg-red-500 w-10 h-10 rounded-lg">
          <Clapperboard className="h-7 w-7" />
        </div>
        <h1>Movie Matrix</h1>
        <p>Search the trending movies</p>
      </div>
      <div className="absolute inset-0 overflow-hidden">
        <div className="scroll-track">
          <div className="slide">
            <Image
              src="/images/background.jpg"
              alt=""
              fill
              className="object-cover"
              loading="eager"
            />
          </div>

          <div className="slide">
            <Image
              src="/images/background.jpg"
              alt=""
              fill
              className="object-cover"
              loading="eager"
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
