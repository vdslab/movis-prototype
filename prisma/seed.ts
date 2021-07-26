import { PrismaClient } from "@prisma/client";
import seedData from "./seed-data/seedData.json";
const prisma = new PrismaClient();

const main = async () => {
  // create category map
  // const categories = seedData["categories"] as string[];
  // const categoryMap = {};

  // for (const category of categories) {
  //   const c = await prisma.category.create({
  //     data: {
  //       name: category,
  //     },
  //   });
  //   categoryMap[c.name] = c.id;
  // }

  for (const data of seedData as any) {
    const title = data["title"];
    const releaseDate = data["releaseDate"]
      ? new Date(data["releaseDate"])
      : null;
    const actors = data["cast"] as { name: string; id: string | null }[];
    const officialSite = data["officialSite"] as string | null;
    const _companies = data["company"] as string[];
    const companies = [] as { name: string; uuid: string }[];
    const image = data["image"] as {
      url: string;
      caption: string | null;
    } | null;
    const runtime = data["runtime"] ? data["runtime"] : null;
    const staffs = data["staff"] as {
      name: string;
      id: string | null;
      occupation: string;
    }[];
    const revenueScale = 10 ** 9;
    const revenue = data["revenue"] ? data["revenue"] * revenueScale : null;
    const awards = data["award"] as string[];

    for (const actor of actors) {
      let uuid;
      const a = actor.id
        ? await prisma.actor.findFirst({
            where: {
              jfdbId: actor.id,
            },
          })
        : await prisma.actor.findFirst({
            where: {
              name: actor.name,
            },
          });

      if (a) {
        uuid = a.id;
      } else {
        const newActor = await prisma.actor.create({
          data: {
            name: actor.name,
            jfdbId: actor.id,
          },
        });
        uuid = newActor.id;
      }

      actor["uuid"] = uuid;
    }

    for (const staff of staffs) {
      let uuid;

      const s = staff.id
        ? await prisma.staff.findFirst({
            where: {
              jfdbId: staff.id,
            },
            include: {
              Occupation: true,
            },
          })
        : await prisma.staff.findFirst({
            where: {
              name: staff.name,
            },
            include: {
              Occupation: true,
            },
          });

      if (s) {
        uuid = s.id;
        const included = s.Occupation.filter(
          (o) => o.name === staff.occupation
        );

        if (included.length === 0) {
          const so = await prisma.occupation.findFirst({
            where: { name: staff.occupation },
          });
          if (so) {
            const uso = await prisma.staff.update({
              where: {
                id: uuid,
              },
              data: {
                Occupation: {
                  connect: {
                    id: so.id,
                  },
                },
              },
            });
          } else {
            const nso = await prisma.occupation.create({
              data: {
                name: staff.occupation,
                Staff: {
                  connect: {
                    id: uuid,
                  },
                },
              },
            });
          }
        }
      } else {
        const ns = await prisma.staff.create({
          data: {
            name: staff.name,
            jfdbId: staff.id,
            Occupation: {
              connectOrCreate: {
                where: {
                  name: staff.occupation,
                },
                create: {
                  name: staff.occupation,
                },
              },
            },
          },
        });
        uuid = ns.id;
      }
      staff["uuid"] = uuid;
    }

    for (const company of _companies) {
      let uuid;
      const c = await prisma.company.findFirst({
        where: {
          name: company,
        },
      });
      if (c) {
        uuid = c.id;
      } else {
        const nc = await prisma.company.create({
          data: {
            name: company,
          },
        });
        uuid = nc;
      }
      companies.push({ name: company, uuid });
    }

    const movie = await prisma.movie.create({
      data: {
        title,
        releaseDate,
        Actor: {
          connect: actors.map((actor) => ({ id: actor["uuid"] })),
        },
        OfficialSite: {
          create: officialSite
            ? {
                url: officialSite,
              }
            : undefined,
        },
        Staff: {
          connect: staffs.map((staff) => ({ id: staff["uuid"] })),
        },
        runtime: runtime,
        Award: {
          create: awards.map((award) => ({ title: award })),
        },
        revenue,
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
