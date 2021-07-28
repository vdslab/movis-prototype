import { Actor, Movie } from "@prisma/client";

export const getActorAndMoviesWithAppearedActors = async (actorId: string) => {
  const res = await fetch(`/api/actor/${actorId}/relation`);
  const data: Actor & {
    Movie: (Movie & {
      Actor: Actor[];
    })[];
  } = await res.json();

  return data;
};
