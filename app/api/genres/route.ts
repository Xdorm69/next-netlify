import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const genres = await prisma.genre.findMany({
      orderBy: {
        name: "asc",
      },
    });

    return Response.json(genres);
  } catch (error) {
    return Response.json({ error: "Failed to fetch genres" }, { status: 500 });
  }
}
