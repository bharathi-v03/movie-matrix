import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="mb-2 text-red-500 font-semibold">404 Error</p>

      <h1 className="mb-4 text-5xl font-bold md:text-7xl">
        Page Not Found
      </h1>

      <p className="mb-8 max-w-md text-santas-gray">
        The page you're looking for doesn't exist or may have been removed.
      </p>

      <div className="flex flex-col gap-4 sm:flex-row">
        <Link
          href="/"
          className="flex items-center justify-center gap-2 rounded-full bg-red-600 px-6 py-3 font-medium transition hover:bg-red-700"
        >
          <Home size={18} />
          Back Home
        </Link>
      </div>
    </main>
  );
}