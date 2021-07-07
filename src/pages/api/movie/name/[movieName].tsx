import prisma from "~/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const movieName = String(req.query.movieName);

  const result = await prisma.actor.findMany({
    where: {
      name: {
        contains: movieName,
      },
    },
  });
  console.log(result);
  res.json(result);
};
