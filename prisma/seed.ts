import { PrismaClient } from "@prisma/client";
import seedData from "./seed-data/seedData.json";
const prisma = new PrismaClient();

const main = async () => {
  for (const data of seedData as any) {
    const title = data["title"];
    const releaseDate = data["releaseDate"]
      ? new Date(data["releaseDate"])
      : null;
    const actors = data["cast"] as { name: string; id: string | null }[];

    // create actor
    for (const actor of actors) {
      if (actor.id) {
        const a = await prisma.actor.findFirst({
          where: {
            jfdbId: actor.id,
          },
        });
        if (a) {
          actor["uuid"] = a.id;
        } else {
          const newActor = await prisma.actor.create({
            data: {
              name: actor.name,
              jfdbId: actor.id,
            },
          });
          actor["uuid"] = newActor.id;
        }
      } else {
        const a = await prisma.actor.findFirst({
          where: {
            name: actor.name,
          },
        });
        if (a) {
          actor["uuid"] = a.id;
        } else {
          const newActor = await prisma.actor.create({
            data: {
              name: actor.name,
              jfdbId: null,
            },
          });
          actor["uuid"] = newActor.id;
        }
      }
    }

    // create movie
    const movie = await prisma.movie.create({
      data: {
        title,
        releaseDate,
        Actor: {
          connect: actors.map((actor) => ({ id: actor["uuid"] })),
        },
      },
    });
    console.log(`moive created with id: ${movie.id}`);
  }
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
