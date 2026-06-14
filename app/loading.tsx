export default function Loading() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 sm:gap-6 px-4 sm:px-0">
      <div className="h-12 w-12 sm:h-16 sm:w-16 animate-spin rounded-full border-4 border-red-500 border-t-transparent" />

      <div className="text-center">
        <h2 className="text-xl sm:text-2xl font-bold">Loading Movie Matrix</h2>

        <p className="mt-2 text-sm sm:text-base text-santas-gray">
          Fetching movies from the archive...
        </p>
      </div>
    </main>
  );
}
