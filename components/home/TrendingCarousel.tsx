"use client";

import { Movie } from "@prisma/client";
import { Play, Download } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function TrendingCarousel({ movies }: { movies: Movie[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % movies.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [movies.length]);

  const currentMovie = movies[currentIndex];

  const poster = currentMovie.backdropPath
    ? `https://image.tmdb.org/t/p/original${currentMovie.backdropPath}`
    : "/placeholder.jpg";

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* BACKDROP IMAGE ANIMATION */}
      <AnimatePresence mode="wait">
        <motion.div
          key={poster}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <Image
            src={poster}
            alt={currentMovie.title}
            fill
            priority
            className="object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-linear-to-r from-purple-900/40 to-transparent" />

      {/* CONTENT */}
      <div className="p-6 flex flex-col justify-between h-full relative z-10">
        <motion.p
          key={`tag-${currentIndex}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-white px-4 py-1 bg-white/20 rounded-full w-fit text-xs"
        >
          🔥 Now Trending
        </motion.p>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentMovie.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.6 }}
            className="w-1/3"
          >
            <h1 className="text-4xl font-bold text-white">
              {currentMovie.title}
            </h1>

            <p className="text-sm text-white/70 mt-3 line-clamp-4">
              {currentMovie.overview}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* BUTTONS + DOTS */}
        <div className="flex justify-between items-end">
          <motion.div
            className="flex gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <button className="flex items-center gap-2 px-5 py-2 rounded bg-purple-400 text-black font-semibold hover:scale-105 transition">
              <Play size={18} />
              Watch Now
            </button>

            <button className="p-2 bg-white/20 rounded hover:bg-white/30 transition">
              <Download size={18} />
            </button>
          </motion.div>

          {/* INDICATORS */}
          <div className="flex gap-2">
            {movies.map((_, index) => (
              <motion.div
                key={index}
                animate={{
                  scale: index === currentIndex ? 1.6 : 1,
                  backgroundColor:
                    index === currentIndex ? "#a855f7" : "#ffffff",
                }}
                transition={{ duration: 0.3 }}
                className="w-2 h-2 rounded-full"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
