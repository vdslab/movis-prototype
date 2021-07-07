import prisma from "~/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const movieId = String(req.query.movieId);

  const result = await prisma.movie.findFirst({
    where: {
      id: movieId,
    },
    include: {
      Actor: true,
      Category: true,
      Company: true,
      OfficialSite: true,
      Staff: true,
    },
  });
  console.log(result);
  res.json(result);
};
