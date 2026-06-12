"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h2 className="text-2xl font-bold">Something went wrong</h2>

      <p className="text-center text-gray-400">
        We couldn't load the requested content. Please try again.
      </p>

      <button
        onClick={() => reset()}
        className="cursor-pointer rounded bg-red-600 px-4 py-2"
      >
        Try Again
      </button>
    </div>
  );
}
