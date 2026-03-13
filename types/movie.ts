import { Prisma } from "@prisma/client";

export type MovieWithRelations = Prisma.MovieGetPayload<{
  include: {
    genres: {
      include: { genre: true };
    };
    movieActor: {
      include: { actor: true };
    };
    similarTarget: {
      include: { similar: true };
    };
  };
}>;
