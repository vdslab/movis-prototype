import { PrismaClient } from "@prisma/client";
import seed from "./seed-data/jfdb_after2003.json";

const prisma = new PrismaClient();

export const main = async () => {
  const { data } = seed as any;

  for (const d of data) {
    const movie = await prisma.movie.create({
      data: {
        title: d.タイトル,
        releaseDate: new Date(d.公開年月日),
        story: d.説明,
        MoviesOnActors: {
          create: d.出演者.map((c) => {
            return {
              data: {
                name: c.名前,
              },
            };
          }),
        },
      },
    });
    if (d.公式サイト.length !== 0) {
      const officialsite = await prisma.officialSite.create({
        data: {
          movieId: movie.id,
          link: d.公式サイト,
        },
      });
    }
  }
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
