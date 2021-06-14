import prisma from "~/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { page } = req.query;
  const perPage = 20;
  const skip = Number(page) * perPage;

  const result = await prisma.actor.findMany({
    skip,
    take: perPage,
  });
  res.json(result);
};
