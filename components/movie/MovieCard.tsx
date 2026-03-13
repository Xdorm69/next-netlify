"use client";
import { cn } from "@/lib/utils";
import { Movie } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Props {
  movie: Movie;
  expand?: boolean;
}

export default function MovieCard({ movie, expand = true }: Props) {
  const poster = movie.posterPath
    ? `https://image.tmdb.org/t/p/w342${movie.posterPath}`
    : "/placeholder.jpg";

  const year = movie.releaseDate
    ? new Date(movie.releaseDate).getFullYear()
    : "";

  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/movies/${movie.id}`)}
      className={cn(
        "group relative min-w-[12rem] h-[18rem] rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300",
        expand ? "hover:min-w-[24rem]" : "hover:min-w-[12rem]",
      )}
    >
      {/* POSTER */}
      <Image src={poster} alt={movie.title} fill className="object-cover" />

      {/* HOVER OVERLAY */}
      <div
        className="absolute inset-0 bg-linear-to-t from-black to-transparent opacity-0
        group-hover:opacity-100 transition flex flex-col
        justify-end p-3"
      >
        <h3 className="text-sm font-semibold">{movie.title}</h3>

        <p className="text-xs text-muted-foreground">{year}</p>

        {movie.popularity && (
          <p className="text-xs mt-1">⭐ {movie.popularity.toFixed(1)}</p>
        )}
      </div>
    </div>
  );
}
