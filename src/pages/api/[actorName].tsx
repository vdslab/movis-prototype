import prisma from "~/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const actorName = String(req.query.actorName);

  // const result = await prisma.moviesOnActors.findMany({
  //   where: {
  //     cast: {
  //       name: { contains: actorName },
  //     },
  //   },
  //   include: { cast: true },
  // });
  const result = await prisma.movie.findMany({
    where: {
      MoviesOnActors: {
        every: {
          cast: {
            name: { contains: actorName },
          },
        },
      },
    },
    include: {
      MoviesOnActors: {
        where: {
          cast: {
            name: { contains: actorName },
          },
        },
      },
    },
  });
  console.log(result);
  res.json(result);
};
