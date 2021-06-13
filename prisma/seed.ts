import { PrismaClient } from "@prisma/client";
import { cleanup } from "./seed-cleanup";
import { init } from "./seed-init";
const prisma = new PrismaClient();

init(prisma)
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
