import { Prisma, PrismaClient } from "@prisma/client";

export const cleanup = async (prisma: PrismaClient) => {
  const modelNames = Prisma.dmmf.datamodel.models.map((model) => model.name);

  return await Promise.all(
    modelNames.map((modelName) =>
      prisma[
        modelName.charAt(0).toLowerCase() + modelName.slice(1, modelName.length)
      ].deleteMany({})
    )
  );
};
