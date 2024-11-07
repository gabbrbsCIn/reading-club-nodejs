/*
  Warnings:

  - You are about to drop the `_UserClubs` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_UserClubs" DROP CONSTRAINT "_UserClubs_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserClubs" DROP CONSTRAINT "_UserClubs_B_fkey";

-- DropTable
DROP TABLE "_UserClubs";

-- CreateTable
CREATE TABLE "UserClub" (
    "userId" TEXT NOT NULL,
    "clubId" TEXT NOT NULL,

    CONSTRAINT "UserClub_pkey" PRIMARY KEY ("userId","clubId")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserClub_userId_clubId_key" ON "UserClub"("userId", "clubId");

-- AddForeignKey
ALTER TABLE "UserClub" ADD CONSTRAINT "UserClub_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserClub" ADD CONSTRAINT "UserClub_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "Club"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
