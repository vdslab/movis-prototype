-- AlterTable
ALTER TABLE "Movie" ADD COLUMN "revenue" REAL;

-- CreateTable
CREATE TABLE "Award" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "movieId" TEXT NOT NULL,
    FOREIGN KEY ("movieId") REFERENCES "Movie" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
