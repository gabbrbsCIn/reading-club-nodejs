/*
  Warnings:

  - You are about to drop the `_ReadingListBooks` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ReadingListBooks" DROP CONSTRAINT "_ReadingListBooks_A_fkey";

-- DropForeignKey
ALTER TABLE "_ReadingListBooks" DROP CONSTRAINT "_ReadingListBooks_B_fkey";

-- DropTable
DROP TABLE "_ReadingListBooks";

-- CreateTable
CREATE TABLE "reading_list_books" (
    "readingListId" TEXT NOT NULL,
    "bookId" TEXT NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "reading_list_books_pkey" PRIMARY KEY ("readingListId","bookId")
);

-- AddForeignKey
ALTER TABLE "reading_list_books" ADD CONSTRAINT "reading_list_books_readingListId_fkey" FOREIGN KEY ("readingListId") REFERENCES "ReadingList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reading_list_books" ADD CONSTRAINT "reading_list_books_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
