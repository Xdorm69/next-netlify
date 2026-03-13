import TrendingCarousel from "@/components/home/TrendingCarousel";
import MovieRow from "@/components/movie/MovieRow";
import MaxWidthWrapper from "@/components/wrapper/MaxWidthWrapper";
import { getLatestMovies, getLatestByGenre } from "@/lib/data/movies";

export default async function Page() {
  const [heroMovies, latest, action, horror, scifi] = await Promise.all([
    getLatestMovies({ take: 5 }),
    getLatestMovies({ skip: 5 }),
    getLatestByGenre("Action"),
    getLatestByGenre("Horror"),
    getLatestByGenre("Science Fiction"),
  ]);

  const rows = [
    { title: "Recently Released", data: latest },
    { title: "Latest Action Movies", data: action },
    { title: "Latest Horror Movies", data: horror },
    { title: "Latest Sci-Fi Movies", data: scifi },
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
              href="/latest"
            />
          ))}
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
