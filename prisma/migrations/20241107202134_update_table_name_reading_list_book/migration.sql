/*
  Warnings:

  - You are about to drop the `reading_list_books` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "reading_list_books" DROP CONSTRAINT "reading_list_books_bookId_fkey";

-- DropForeignKey
ALTER TABLE "reading_list_books" DROP CONSTRAINT "reading_list_books_readingListId_fkey";

-- DropTable
DROP TABLE "reading_list_books";

-- CreateTable
CREATE TABLE "ReadingListBook" (
    "readingListId" TEXT NOT NULL,
    "bookId" TEXT NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "ReadingListBook_pkey" PRIMARY KEY ("readingListId","bookId")
);

-- AddForeignKey
ALTER TABLE "ReadingListBook" ADD CONSTRAINT "ReadingListBook_readingListId_fkey" FOREIGN KEY ("readingListId") REFERENCES "ReadingList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReadingListBook" ADD CONSTRAINT "ReadingListBook_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
