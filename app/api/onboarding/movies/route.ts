import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const movies = await prisma.movie.findMany({
      where: {
        posterPath: {
          not: null,
        },
      },
      orderBy: {
        popularity: "desc",
      },
      take: 40,
      select: {
        id: true,
        title: true,
        posterPath: true,
      },
    });

    return Response.json(movies);
  } catch {
    return Response.json({ error: "Failed to fetch movies" }, { status: 500 });
  }
}
