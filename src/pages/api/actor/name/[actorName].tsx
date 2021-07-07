import prisma from "~/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const actorName = String(req.query.actorName);

  const result = await prisma.actor.findMany({
    where: {
      name: { contains: actorName },
    },
  });
  console.log(result);
  res.json(result);
};
