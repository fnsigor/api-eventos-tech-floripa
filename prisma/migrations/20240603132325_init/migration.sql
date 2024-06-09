-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "idUserLevel" INTEGER NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "deletedAt" DATETIME,
    CONSTRAINT "User_idUserLevel_fkey" FOREIGN KEY ("idUserLevel") REFERENCES "UserLevel" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_User" ("createdAt", "deletedAt", "email", "id", "idUserLevel", "password", "updatedAt", "username") SELECT "createdAt", "deletedAt", "email", "id", "idUserLevel", "password", "updatedAt", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
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
    "updatedAt" DATETIME,
    "deletedAt" DATETIME,
    CONSTRAINT "Event_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Event" ("createdAt", "deletedAt", "description", "firstDay", "id", "idUser", "imageUrl", "lastDay", "local", "name", "startTime", "updatedAt") SELECT "createdAt", "deletedAt", "description", "firstDay", "id", "idUser", "imageUrl", "lastDay", "local", "name", "startTime", "updatedAt" FROM "Event";
DROP TABLE "Event";
ALTER TABLE "new_Event" RENAME TO "Event";
PRAGMA foreign_key_check("User");
PRAGMA foreign_key_check("Event");
PRAGMA foreign_keys=ON;
