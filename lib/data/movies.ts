import prisma from "../prisma";

export async function getTrendingMovies({
  take = 20,
  skip = 0,
}: {
  take?: number;
  skip?: number;
}) {
  return prisma.movie.findMany({
    take: take,
    skip: skip,
    orderBy: {
      popularity: "desc",
    },
  });
}

export async function getLatestMovies({
  take = 20,
  skip = 0,
}: {
  take?: number;
  skip?: number;
}) {
  return prisma.movie.findMany({
    take: take,
    skip: skip,
    where: {
      backdropPath: {
        not: null,
      },
    },
    orderBy: {
      releaseDate: "desc",
    },
  });
}
export async function getLatestByGenre(genreName: string) {
  return prisma.movie.findMany({
    where: {
      genres: {
        some: {
          genre: {
            name: genreName,
          },
        },
      },
    },
    orderBy: {
      releaseDate: "desc",
    },
    take: 20,
  });
}

export async function getMovie(id: string) {
  try {
    return await prisma.movie.findUnique({
      where: {
        id: id,
      },
      include: {
        genres: {
          include: {
            genre: true,
          },
        },
        movieActor: {
          include: {
            actor: true,
          },
        },
        similarTarget: {
          include: {
            similar: true,
          },
        },
      },
    });
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function searchMovies(query: string) {
  return prisma.movie.findMany({
    where: {
      title: {
        contains: query,
        mode: "insensitive",
      },
    },
    take: 30,
    orderBy: {
      popularity: "desc",
    },
  });
}

export async function getTrendingByGenre(genreName: string) {
  return prisma.movie.findMany({
    where: {
      genres: {
        some: {
          genre: {
            name: genreName,
          },
        },
      },
    },
    orderBy: {
      popularity: "desc",
    },
    take: 20,
  });
}
