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

  const ids = [
    "dc6fa841-ad21-432c-8a5d-76b449607d8b",
    "8d7360f7-3762-47ce-bf8d-5da0b2f1f9af",
    "e3701ba4-86be-4002-beb9-115be1751b62",
    "f7b956de-b735-444a-87bf-cc0bb8099622",

    "1146917d-224e-46ae-b22f-30319f9d63c9",
    "6f56af96-885c-4fe9-a476-5de56061b1c2",
    "e741721b-38eb-4dcb-adff-351d721b6302",
    "0033c4b6-f372-4ada-80d8-904942913db9",

    "8a23063f-a5a3-4495-85de-e3c16292551d",
    "00c1250b-1df5-4526-a8dc-c4255505bd54",
    "f7e08556-b0d9-4e38-ab58-ccedc44a9b34",
    "3dcd1eb8-4634-41fe-a2d5-cf4573c64175",
  ];

  const result = await prisma.actor.findMany({
    where: {
      id: {
        in: ids,
      },
    },
  });

  res.json(result);
};
