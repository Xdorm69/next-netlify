import TrendingCarousel from "@/components/home/TrendingCarousel";
import MovieRow from "@/components/movie/MovieRow";
import MaxWidthWrapper from "@/components/wrapper/MaxWidthWrapper";
import {
  getLatestByGenre,
  getLatestMovies,
  getTrendingByGenre,
  getTrendingMovies,
} from "@/lib/data/movies";

export default function Page() {
  return <HomePage />;
}

async function HomePage() {
  const [
    carouselMovies,
    trendingMovies,
    latestMovies,
    actionMovies,
    adventureMovies,
    horrorMovies,
  ] = await Promise.all([
    getTrendingMovies({ take: 5 }),
    getTrendingMovies({ skip: 5 }),
    getLatestMovies({ take: 20 }),
    getTrendingByGenre("Action"),
    getLatestByGenre("Adventure"),
    getLatestByGenre("Horror"),
  ]);

  const rowsData = [
    { title: "Trending Now", data: trendingMovies ?? [], href: "/trending" },
    { title: "Latest Movies", data: latestMovies ?? [], href: "/latest" },
    { title: "Top Action", data: actionMovies ?? [], href: "/latest" },
    { title: "Latest Adventure", data: adventureMovies ?? [], href: "/latest" },
    { title: "Latest Horror", data: horrorMovies ?? [], href: "/latest" },
  ];

  return (
    <MaxWidthWrapper>
      <div className="space-y-10 pb-10">
        <div className="w-full h-[450px] rounded border border-gray-600 relative overflow-hidden">
          <TrendingCarousel movies={carouselMovies} />
        </div>

        {rowsData.map((row) => (
          <MovieRow
            key={row.title}
            title={row.title}
            data={row.data}
            href={row.href}
          />
        ))}
      </div>
    </MaxWidthWrapper>
  );
}
