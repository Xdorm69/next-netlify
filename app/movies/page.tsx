import { searchMovies } from "@/lib/data/movies";
import MovieCard from "@/components/movie/MovieCard";
import MaxWidthWrapper from "@/components/wrapper/MaxWidthWrapper";
import { Movie } from "@prisma/client";

interface Props {
  searchParams: Promise<{
    q?: string;
  }>;
}

export default async function Page({ searchParams }: Props) {
  const params = await searchParams;
  const query = params.q ?? "";

  const movies = query ? await searchMovies(query) : [];

  return (
    <MaxWidthWrapper>
      <div className="space-y-8">
        <h1 className="text-2xl font-semibold">
          {query ? `Search results for "${query}"` : "Search Movies"}
        </h1>

        {movies.length === 0 ? (
          <p className="text-gray-400">No movies found.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {movies.map((movie: Movie) => (
              <MovieCard expand={false} key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </MaxWidthWrapper>
  );
}
