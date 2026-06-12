import Link from "next/link";
import { ArrowLeft, ChevronLeft } from "lucide-react";

export default function PageHeader({ title }: { title: string }) {
  return (
    <div
      className="
        sticky top-0 z-50
        backdrop-blur-md
        bg-black/70
        border-b border-white/10
      "
    >
      <div className="mx-auto flex items-center gap-4 px-6 py-4">
        <Link
          href="/"
          className="
            group
            flex h-10 w-10 items-center justify-center
            transition-all
            duration-300
            hover:text-red-500
          "
        >
          <ChevronLeft
            size={24}
            strokeWidth={4}
            className="transition-transform group-hover:-translate-x-1"
          />
        </Link>

        <div>
          <h1 className="text-3xl font-bold text-white">{title}</h1>

          <div className="mt-1 h-1 w-16 rounded-full bg-red-500" />
        </div>
      </div>
    </div>
  );
}
