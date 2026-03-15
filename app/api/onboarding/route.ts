import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { name, img, movies } = body;

    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name,
        img: "/user.png",
        onboardingCompleted: true,
      },
    });

    const interactions = movies.map((movieId: string) => ({
      userId: session.user.id,
      movieId,
      rating: 5,
      liked: true,
      watched: false,
    }));

    await prisma.interaction.createMany({
      data: interactions,
      skipDuplicates: true,
    });

    return Response.json({ success: true });
  } catch {
    return Response.json({ error: "Onboarding failed" }, { status: 500 });
  }
}
