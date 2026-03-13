import MaxWidthWrapper from "@/components/wrapper/MaxWidthWrapper";

export default function Loading() {
  return (
    <MaxWidthWrapper>
      <div className="w-full space-y-12 animate-pulse">
        {/* HERO CAROUSEL */}
        <div className="relative w-full h-[420px] rounded-xl overflow-hidden bg-gray-800">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800" />

          <div className="absolute bottom-8 left-8 space-y-4 w-1/3">
            <div className="h-10 bg-gray-600 rounded w-3/4" />
            <div className="space-y-2">
              <div className="h-4 bg-gray-600 rounded w-full" />
              <div className="h-4 bg-gray-600 rounded w-5/6" />
              <div className="h-4 bg-gray-600 rounded w-4/6" />
            </div>

            <div className="flex gap-3 pt-2">
              <div className="h-10 w-28 bg-gray-600 rounded" />
              <div className="h-10 w-10 bg-gray-600 rounded-full" />
              <div className="h-10 w-10 bg-gray-600 rounded-full" />
            </div>
          </div>
        </div>

        {/* MOVIE ROWS */}
        {[1, 2, 3].map((row) => (
          <div key={row} className="space-y-4">
            <div className="h-6 bg-gray-600 rounded w-40" />

            <div className="flex gap-4 overflow-hidden">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="min-w-[180px] h-[270px] rounded-lg bg-gray-700"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </MaxWidthWrapper>
  );
}
