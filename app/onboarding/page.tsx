"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

type Movie = {
  id: string;
  title: string;
  posterPath: string | null;
};

export default function OnboardingPage() {
  const router = useRouter();
  const { update } = useSession();

  const [movies, setMovies] = useState<Movie[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [img, setImg] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // fetch movies
  useEffect(() => {
    async function fetchMovies() {
      try {
        console.log("Fetching onboarding movies...");

        const res = await fetch("/api/onboarding/movies");

        console.log("Response status:", res.status);

        if (!res.ok) {
          const text = await res.text();
          throw new Error(`API Error: ${res.status} ${text}`);
        }

        const data = await res.json();

        console.log("Movies received:", data);

        if (!Array.isArray(data)) {
          throw new Error("API did not return an array");
        }

        setMovies(data);
      } catch (err: any) {
        console.error("Movie fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, []);

  function toggleMovie(id: string) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id],
    );
  }

  async function finishOnboarding() {
    try {
      console.log("Submitting onboarding...");

      const res = await fetch("/api/onboarding", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          img,
          movies: selected,
        }),
      });

      console.log("Submit status:", res.status);

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Onboarding failed: ${text}`);
      }
      // refresh session token
      await update();
      alert("Onboarding success");

      router.push("/");
    } catch (err) {
      console.error("Onboarding error:", err);
      alert("Onboarding failed. Check console.");
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Loading movies...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-10 py-16">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Choose movies you love</h1>

        <p className="text-gray-400 mb-10">
          Pick at least 5 so we can personalize recommendations
        </p>

        {/* name */}
        <div className="flex gap-4 mb-10">
          <input
            placeholder="Your name"
            className="p-3 bg-neutral-900 rounded w-60"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            placeholder="Profile image URL"
            className="p-3 bg-neutral-900 rounded w-80"
            value={img}
            onChange={(e) => setImg(e.target.value)}
          />
        </div>

        {/* movies grid */}
        {movies.length === 0 ? (
          <p className="text-gray-400">No movies returned from API.</p>
        ) : (
          <div className="grid grid-cols-6 gap-4">
            {movies.map((movie) => {
              const active = selected.includes(movie.id);

              return (
                <div
                  key={movie.id}
                  onClick={() => toggleMovie(movie.id)}
                  className={`cursor-pointer rounded overflow-hidden transition
                  ${
                    active ? "ring-4 ring-red-600 scale-105" : "hover:scale-105"
                  }`}
                >
                  {movie.posterPath ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
                      alt={movie.title}
                      className="w-full"
                    />
                  ) : (
                    <div className="bg-neutral-800 h-[250px] flex items-center justify-center text-xs">
                      No Poster
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        <button
          onClick={finishOnboarding}
          className="mt-12 px-8 py-3 bg-red-600 rounded font-semibold cursor-pointer"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
