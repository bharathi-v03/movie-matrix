"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

export default function PageHeader({ title }: { title: string }) {
  const router = useRouter();

  return (
    <div
      className="
        min-h-[61px]
        sticky top-0 z-50
        backdrop-blur-md
        bg-black/70
        border-b border-white/10
      "
    >
      <div className="mx-auto flex items-center gap-3 sm:gap-4 px-3 sm:px-6 py-3 sm:py-4">
        <button
          onClick={() => router.back()}
          className="
            group
            flex h-9 w-9 sm:h-10 sm:w-10
            items-center justify-center
            transition-all duration-300
            hover:text-red-500
            cursor-pointer
          "
        >
          <ChevronLeft
            size={20}
            className="
              sm:w-6 sm:h-6
              transition-transform
              group-hover:-translate-x-1
            "
          />
        </button>

        <div>
          <h1 className="text-xl sm:text-3xl font-bold text-white">{title}</h1>

          <div className="mt-1 h-1 w-12 sm:w-16 rounded-full bg-red-500" />
        </div>
      </div>
    </div>
  );
}
