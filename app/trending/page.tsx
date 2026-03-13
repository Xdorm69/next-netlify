import TrendingCarousel from "@/components/home/TrendingCarousel";
import MovieRow from "@/components/movie/MovieRow";
import MaxWidthWrapper from "@/components/wrapper/MaxWidthWrapper";
import { getTrendingMovies, getTrendingByGenre } from "@/lib/data/movies";

export default async function Page() {
  const [heroMovies, trending, action, adventure, horror] = await Promise.all([
    getTrendingMovies({ take: 5 }),
    getTrendingMovies({ skip: 5 }),
    getTrendingByGenre("Action"),
    getTrendingByGenre("Adventure"),
    getTrendingByGenre("Horror"),
  ]);

  const rows = [
    { title: "Trending Now", data: trending },
    { title: "Trending in Action", data: action },
    { title: "Trending in Adventure", data: adventure },
    { title: "Trending in Horror", data: horror },
  ];

  return (
    <MaxWidthWrapper>
      <div className="space-y-12">
        {/* HERO */}
        <div className="h-[450px] relative rounded-xl overflow-hidden">
          <TrendingCarousel movies={heroMovies} />
        </div>

        {/* ROWS */}
        <div className="space-y-10">
          {rows.map((row) => (
            <MovieRow
              key={row.title}
              title={row.title}
              data={row.data}
              href="/trending"
            />
          ))}
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
