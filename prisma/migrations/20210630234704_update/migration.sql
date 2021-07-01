-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Movie" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "releaseDate" DATETIME,
    "runtime" INTEGER,
    "story" TEXT
);
INSERT INTO "new_Movie" ("id", "releaseDate", "runtime", "story", "title") SELECT "id", "releaseDate", "runtime", "story", "title" FROM "Movie";
DROP TABLE "Movie";
ALTER TABLE "new_Movie" RENAME TO "Movie";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
