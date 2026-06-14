"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3 sm:gap-4 px-4 sm:px-0">
      <h2 className="text-xl sm:text-2xl font-bold text-center">
        Something went wrong
      </h2>

      <p className="text-center text-sm sm:text-base text-gray-400 max-w-sm sm:max-w-none">
        We couldn't load the requested content. Please try again.
      </p>

      <button
        onClick={() => reset()}
        className="
          cursor-pointer
          rounded
          bg-red-600
          px-4 py-2 sm:px-4 sm:py-2
          text-sm sm:text-base
          active:scale-95
          transition
        "
      >
        Try Again
      </button>
    </div>
  );
}
