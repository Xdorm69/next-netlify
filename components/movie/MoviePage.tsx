"use client";
import { Movie } from "@prisma/client";
import Image from "next/image";
import { Play, Plus, ThumbsUp, ChevronLeft } from "lucide-react";
import { useState } from "react";
import { MovieWithRelations } from "@/types/movie";


interface Props {
  movie: MovieWithRelations | null;
}

export default function MoviePage({ movie }: Props) {
  if (!movie) return <h1>No Movie Found</h1>;

  const [isLiked, setIsLiked] = useState(false);

  const backdropUrl = movie.backdropPath
    ? `https://image.tmdb.org/t/p/original${movie.backdropPath}`
    : "/placeholder.jpg";

  const posterUrl = movie.posterPath
    ? `https://image.tmdb.org/t/p/w342${movie.posterPath}`
    : "/placeholder.jpg";

  const year = movie.releaseDate
    ? new Date(movie.releaseDate).getFullYear()
    : "";
  const rating = movie.popularity ? Math.round(movie.popularity * 10) / 10 : 0;


  return (
    <div className="min-h-screen bg-background text-white relative ">
      {/* HERO SECTION */}
      <div className="relative h-[70vh] min-h-[400px]">
        <Image
          src={backdropUrl}
          alt={movie.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent" />


        {/* HERO CONTENT */}
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex gap-8">
              <div className="w-48 h-72 relative rounded-lg overflow-hidden shadow-2xl">
                <Image
                  src={posterUrl}
                  alt={movie.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1">
                <h1 className="text-5xl font-bold mb-4">{movie.title}</h1>

                <div className="flex items-center gap-4 mb-4">
                  <span className="text-green-400 font-semibold">
                    ⭐ {rating}
                  </span>
                  <span>{year}</span>
                  <span className="text-gray-400">|</span>
                  <span className="text-gray-400">2h 15min</span>
                </div>

                <div className="flex gap-3 mb-6">
                  <button className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded font-semibold hover:bg-gray-200 transition">
                    <Play size={20} fill="black" />
                    Play
                  </button>

                  <button
                    onClick={() => setIsLiked(!isLiked)}
                    className={`p-3 rounded border ${isLiked ? "bg-white/20 border-white" : "border-white/60"} hover:bg-white/10 transition`}
                  >
                    <Plus size={20} />
                  </button>

                  <button className="p-3 rounded border border-white/60 hover:bg-white/10 transition">
                    <ThumbsUp size={20} />
                  </button>
                </div>

                <p className="text-lg max-w-3xl line-clamp-3">
                  {movie.overview || "No description available."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* DETAILS SECTION */}
      <div className="max-w-7xl mx-auto px-8 py-8">
        {/* GENRES */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Genres</h2>
          <div className="flex gap-3 flex-wrap">
            {movie.genres.map(({ genre }) => (
              <span
                key={genre.name}
                className="px-4 py-2 bg-gray-800 rounded-full text-sm"
              >
                {genre.name}
              </span>
            ))}
          </div>
        </div>

        {/* CAST */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Cast</h2>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {movie.movieActor.slice(0, 8).map(({ actor }) => (
              <div key={actor.name} className="flex-shrink-0 text-center">
                <div className="w-24 h-24 bg-gray-700 rounded-full mb-2 flex items-center justify-center">
                  <span className="text-gray-400 text-xs">No Photo</span>
                </div>
                <p className="text-sm truncate w-24">{actor.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* SIMILAR MOVIES */}
        {movie.similarTarget.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Similar Movies</h2>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {movie.similarTarget.map(({ similar }) => (
                <div key={similar.id} className="flex-shrink-0 w-40">
                  <div className="relative h-60 rounded-lg overflow-hidden mb-2">
                    <Image
                      src={
                        similar.posterPath
                          ? `https://image.tmdb.org/t/p/w342${similar.posterPath}`
                          : "/placeholder.jpg"
                      }
                      alt={similar.title}
                      fill
                      className="object-cover hover:scale-105 transition"
                    />
                  </div>
                  <p className="text-sm truncate">{similar.title}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ADDITIONAL INFO */}
        <div className="grid grid-cols-2 gap-8 text-sm text-gray-400">
          <div>
            <h3 className="text-white font-semibold mb-2">Release Date</h3>
            <p>
              {movie.releaseDate
                ? new Date(movie.releaseDate).toLocaleDateString()
                : "Unknown"}
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2">Popularity Score</h3>
            <p>{movie.popularity?.toFixed(1) || "N/A"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
