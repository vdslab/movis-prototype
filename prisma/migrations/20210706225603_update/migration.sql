/*
  Warnings:

  - You are about to drop the column `link` on the `OfficialSite` table. All the data in the column will be lost.
  - Added the required column `url` to the `OfficialSite` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_OfficialSite" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "movieId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    FOREIGN KEY ("movieId") REFERENCES "Movie" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_OfficialSite" ("id", "movieId") SELECT "id", "movieId" FROM "OfficialSite";
DROP TABLE "OfficialSite";
ALTER TABLE "new_OfficialSite" RENAME TO "OfficialSite";
CREATE UNIQUE INDEX "OfficialSite_movieId_unique" ON "OfficialSite"("movieId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
