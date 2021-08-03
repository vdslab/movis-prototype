import prisma from "~/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const page = req.query.page;
  const name = req.query.name ? String(req.query.name) : "";
  const perPage = 20;
  const skip =
    ((Number.isInteger(Number(page)) ? Number(page) : 1) - 1) * perPage;

  const where = name ? { name: { contains: name } } : {};

  // const result = await prisma.actor.findMany({
  //   skip,
  //   take: perPage,
  //   where,
  // });

  // 佐藤健が入っている
  const ids = ["bfb50a95-d9ca-46d6-a333-bfa7847b5d1c"];

  const result = await prisma.actor.findMany({
    where: {
      id: {
        in: ids,
      },
    },
    skip,
    take: perPage,
  });

  res.json(result);
};
