/*
  Warnings:

  - You are about to drop the `Company` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CompanyType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Gender` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Genre` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MoviesOnCompanies` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MoviesOnGenres` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MoviesOnStaffs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Occupation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Rating` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Staff` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `genderId` on the `Actor` table. All the data in the column will be lost.
  - You are about to drop the column `ratingId` on the `Movie` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[movieId]` on the table `OfficialSite` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "CompanyType.type_unique";

-- DropIndex
DROP INDEX "Gender.type_unique";

-- DropIndex
DROP INDEX "Genre.name_unique";

-- DropIndex
DROP INDEX "Occupation.name_unique";

-- DropIndex
DROP INDEX "OfficialSite.link_unique";

-- DropIndex
DROP INDEX "Rating.description_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Company";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "CompanyType";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Gender";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Genre";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "MoviesOnCompanies";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "MoviesOnGenres";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "MoviesOnStaffs";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Occupation";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Rating";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Staff";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Actor" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "birthday" DATETIME
);
INSERT INTO "new_Actor" ("birthday", "id", "name") SELECT "birthday", "id", "name" FROM "Actor";
DROP TABLE "Actor";
ALTER TABLE "new_Actor" RENAME TO "Actor";
CREATE TABLE "new_Movie" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "releaseDate" DATETIME NOT NULL,
    "runtime" INTEGER,
    "story" TEXT NOT NULL
);
INSERT INTO "new_Movie" ("id", "releaseDate", "runtime", "story", "title") SELECT "id", "releaseDate", "runtime", "story", "title" FROM "Movie";
DROP TABLE "Movie";
ALTER TABLE "new_Movie" RENAME TO "Movie";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "OfficialSite_movieId_unique" ON "OfficialSite"("movieId");
