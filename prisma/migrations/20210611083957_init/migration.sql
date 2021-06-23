-- CreateTable
CREATE TABLE "Movie" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "releaseDate" DATETIME NOT NULL,
    "runtime" INTEGER NOT NULL,
    "story" TEXT NOT NULL,
    "ratingId" INTEGER NOT NULL,
    FOREIGN KEY ("ratingId") REFERENCES "Rating" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Rating" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "description" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "MoviesOnActors" (
    "MoviesOnActorsId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "castId" TEXT NOT NULL,
    "movieId" TEXT NOT NULL,
    FOREIGN KEY ("castId") REFERENCES "Actor" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("movieId") REFERENCES "Movie" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Actor" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "birthday" DATETIME NOT NULL,
    "genderId" INTEGER NOT NULL,
    FOREIGN KEY ("genderId") REFERENCES "Gender" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Gender" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Occupation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "staffId" TEXT,
    FOREIGN KEY ("staffId") REFERENCES "Staff" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Staff" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "MoviesOnStaffs" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "movieId" TEXT NOT NULL,
    "staffId" TEXT NOT NULL,
    FOREIGN KEY ("movieId") REFERENCES "Movie" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("staffId") REFERENCES "Staff" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CompanyType" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "typeId" INTEGER NOT NULL,
    FOREIGN KEY ("typeId") REFERENCES "CompanyType" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "MoviesOnCompanies" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "movieId" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    FOREIGN KEY ("movieId") REFERENCES "Movie" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("companyId") REFERENCES "Company" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "OfficialSite" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "movieId" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    FOREIGN KEY ("movieId") REFERENCES "Movie" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Genre" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "MoviesOnGenres" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "movieId" TEXT NOT NULL,
    "genreId" INTEGER NOT NULL,
    FOREIGN KEY ("movieId") REFERENCES "Movie" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("genreId") REFERENCES "Genre" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Rating.description_unique" ON "Rating"("description");

-- CreateIndex
CREATE UNIQUE INDEX "Gender.type_unique" ON "Gender"("type");

-- CreateIndex
CREATE UNIQUE INDEX "Occupation.name_unique" ON "Occupation"("name");

-- CreateIndex
CREATE UNIQUE INDEX "CompanyType.type_unique" ON "CompanyType"("type");

-- CreateIndex
CREATE UNIQUE INDEX "OfficialSite.link_unique" ON "OfficialSite"("link");

-- CreateIndex
CREATE UNIQUE INDEX "Genre.name_unique" ON "Genre"("name");
