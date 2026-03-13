import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

const headers = {
  accept: "application/json",
  Authorization: `Bearer ${process.env.TMDB_BEARER_TOKEN}`,
};

async function fetchTMDB(url: string, retries = 3) {
  try {
    const res = await fetch(url, { headers });

    if (!res.ok) {
      throw new Error(`TMDB error ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    if (retries > 0) {
      console.log("Retrying:", url);
      await new Promise((r) => setTimeout(r, 1500));
      return fetchTMDB(url, retries - 1);
    }

    console.error("Failed:", url);
    throw err;
  }
}

async function seedGenres() {
  const data = await fetchTMDB("https://api.themoviedb.org/3/genre/movie/list");

  for (const g of data.genres) {
    await prisma.genre.upsert({
      where: { id: g.id },
      update: {},
      create: {
        id: g.id,
        name: g.name,
      },
    });
  }

  console.log("Genres seeded");
}

async function seedMovie(movie: any) {
  const movieId = movie.id.toString();

  await prisma.movie.upsert({
    where: { id: movieId },
    update: {},
    create: {
      id: movieId,
      title: movie.title,
      overview: movie.overview,
      posterPath: movie.poster_path,
      backdropPath: movie.backdrop_path,
      popularity: movie.popularity,
      releaseDate: movie.release_date ? new Date(movie.release_date) : null,
    },
  });

  for (const genreId of movie.genre_ids) {
    await prisma.movieGenre.upsert({
      where: {
        movieId_genreId: {
          movieId,
          genreId,
        },
      },
      update: {},
      create: {
        movieId,
        genreId,
      },
    });
  }

  await seedCredits(movieId);
  await seedKeywords(movieId);
  await seedSimilar(movieId);
}

async function seedCredits(movieId: string) {
  const data = await fetchTMDB(
    `https://api.themoviedb.org/3/movie/${movieId}/credits`,
  );

  for (const actor of data.cast.slice(0, 10)) {
    await prisma.actor.upsert({
      where: { id: actor.id },
      update: {},
      create: {
        id: actor.id,
        name: actor.name,
      },
    });

    await prisma.movieActor.upsert({
      where: {
        movieId_actorId: {
          movieId,
          actorId: actor.id,
        },
      },
      update: {},
      create: {
        movieId,
        actorId: actor.id,
      },
    });
  }
}

async function seedKeywords(movieId: string) {
  const data = await fetchTMDB(
    `https://api.themoviedb.org/3/movie/${movieId}/keywords`,
  );

  for (const k of data.keywords) {
    await prisma.keyword.upsert({
      where: { id: k.id },
      update: {},
      create: {
        id: k.id,
        name: k.name,
      },
    });

    await prisma.movieKeyword.upsert({
      where: {
        movieId_keywordId: {
          movieId,
          keywordId: k.id,
        },
      },
      update: {},
      create: {
        movieId,
        keywordId: k.id,
      },
    });
  }
}

async function seedSimilar(movieId: string) {
  const data = await fetchTMDB(
    `https://api.themoviedb.org/3/movie/${movieId}/similar`,
  );

  for (const m of data.results.slice(0, 5)) {
    const similarId = m.id.toString();

    await prisma.similarMovie.upsert({
      where: {
        movieId_similarId: {
          movieId,
          similarId,
        },
      },
      update: {},
      create: {
        movieId,
        similarId,
        score: m.popularity,
      },
    });
  }
}

//make st 16
async function seedMovies(endpoint: string, st = 16, pages = 40) {
  for (let page = st; page <= pages; page++) {
    console.log(`${endpoint} page ${page}`);

    const data = await fetchTMDB(
      `https://api.themoviedb.org/3${endpoint}?page=${page}`,
    );

    for (const movie of data.results) {
      try {
        await seedMovie(movie);
      } catch (err) {
        console.log("Skipping movie:", movie.id);
      }
    }

    await new Promise((r) => setTimeout(r, 500));
  }
}

export async function main() {
  await seedGenres();

  await seedMovies("/movie/popular", 30);
  await seedMovies("/movie/top_rated", 30);
  await seedMovies("/discover/movie", 50);

  console.log("Seeding complete");

  await prisma.$disconnect();
}

main();
