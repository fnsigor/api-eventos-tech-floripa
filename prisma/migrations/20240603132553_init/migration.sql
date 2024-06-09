/*
  Warnings:

  - Made the column `updatedAt` on table `Event` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "User_email_key";

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Event" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idUser" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "local" TEXT NOT NULL,
    "firstDay" DATETIME NOT NULL,
    "startTime" TEXT NOT NULL,
    "lastDay" DATETIME NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "deletedAt" DATETIME,
    CONSTRAINT "Event_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Event" ("createdAt", "deletedAt", "description", "firstDay", "id", "idUser", "imageUrl", "lastDay", "local", "name", "startTime", "updatedAt") SELECT "createdAt", "deletedAt", "description", "firstDay", "id", "idUser", "imageUrl", "lastDay", "local", "name", "startTime", "updatedAt" FROM "Event";
DROP TABLE "Event";
ALTER TABLE "new_Event" RENAME TO "Event";
PRAGMA foreign_key_check("Event");
PRAGMA foreign_keys=ON;
