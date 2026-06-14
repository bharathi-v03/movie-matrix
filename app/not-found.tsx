import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 sm:px-6 text-center">
      <p className="mb-2 text-sm sm:text-base text-red-500 font-semibold">
        404 Error
      </p>

      <h1 className="mb-4 text-4xl sm:text-5xl md:text-7xl font-bold">
        Page Not Found
      </h1>

      <p className="mb-8 max-w-xs sm:max-w-md text-sm sm:text-base text-santas-gray">
        The page you're looking for doesn't exist or may have been removed.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
        <Link
          href="/"
          className="
            flex items-center justify-center gap-2
            rounded-full bg-red-600
            px-5 py-3 sm:px-6 sm:py-3
            font-medium
            transition hover:bg-red-700
            active:scale-95
            w-full sm:w-auto
          "
        >
          <Home size={18} />
          Back Home
        </Link>
      </div>
    </main>
  );
}
