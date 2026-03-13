import Link from "next/link";
import MovieCard from "./MovieCard";
import { Movie } from "@prisma/client";

interface Props {
  title: string;
  data: Movie[];
  href: string;
}

export default function MovieRow({ title, data, href }: Props) {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold mb-3">{title}</h2>
        <Link className="px-2 py-1" href={href}>
          See More
        </Link>
      </div>

      <div className="flex gap-5 overflow-x-auto scrollbar-hide">
        {data.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
