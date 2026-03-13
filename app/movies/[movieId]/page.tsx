
import { getMovie } from "@/lib/data/movies";
import MoviePage from "@/components/movie/MoviePage";
import { MovieWithRelations } from "@/types/movie";

const page = async ({ params }: { params: Promise<{ movieId: string }> }) => {
  const p = await params;
  const movieId = p.movieId;
  const movieData: MovieWithRelations | null = await getMovie(movieId);
  return (
    <>
      <MoviePage movie={movieData} />
    </>
  );
};

export default page;
