-- DropForeignKey
ALTER TABLE "UserClub" DROP CONSTRAINT "UserClub_clubId_fkey";

-- DropForeignKey
ALTER TABLE "UserClub" DROP CONSTRAINT "UserClub_userId_fkey";

-- AddForeignKey
ALTER TABLE "UserClub" ADD CONSTRAINT "UserClub_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserClub" ADD CONSTRAINT "UserClub_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "Club"("id") ON DELETE CASCADE ON UPDATE CASCADE;
