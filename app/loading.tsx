export default function Loading() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6">
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-red-500 border-t-transparent" />

      <div className="text-center">
        <h2 className="text-2xl font-bold">Loading Movie Matrix</h2>

        <p className="mt-2 text-santas-gray">
          Fetching movies from the archive...
        </p>
      </div>
    </main>
  );
}
