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
  const ids = [
    "84fb36b0-9d4a-45ee-b819-a924806fec0e",
    "5187024d-8a5b-4f08-b731-145a38d6cb73",
    "bfb50a95-d9ca-46d6-a333-bfa7847b5d1c",
    "72394c21-22d2-4270-b520-604c8d7fad50",
    "08876397-4471-44e4-b2bd-41ac81073fbb",
    "4c422ca6-9359-42d2-9d7b-09f7dc937ef4",
    "016bdb41-e73e-4daf-95d5-811e5dec3cce",
    "4926311c-3fd7-403d-9c22-512f360360b9",
    "73ed4a4d-9265-4843-aaea-d9c7610294b3",
    "a72fcd31-1a88-427d-a999-0f97100a12b3",
    "b7b59c34-9bc5-4750-a0e2-c2082e35b2c0",
    "310c1648-65bf-4ca7-8f43-e2214e544808",
    "20fd70e7-0273-4c2a-8079-c2cad442fd12",
    "ca0e0133-3b1a-45b8-952d-96ea3fe3b6b3",
    "4819da44-287d-4e9d-96e6-e78c501b3654",
    "e42597b9-e5ca-4afd-9c67-b9e67c37f1b5",
    "878f4d0d-cfe0-4860-b14e-7ad132a025ea",
    "3266df85-eb64-443a-abea-3b0ccf87aede",
    "809ee477-ec1e-4b1c-8f32-b1abb8259866",
    "ec6c800f-7954-42f2-ad2f-551cdc2c7a50",
    "a5343a9e-d32a-4ebe-905f-1c158b008521",
    "e3e8707e-8046-4cb9-8760-a807761eb6c7",
    "87218949-40d8-4d1e-8878-bd593bab0d17",
    "809f6a50-86ac-4232-8200-a3a0829f0e5d"

];//2000年代に有名な人

  const result = await prisma.actor.findMany({
    where: {
      id: {
        in: ids,
      },
    },
  });

  res.json(result);
};
