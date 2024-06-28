/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Post` table. All the data in the column will be lost.
  - Made the column `content` on table `Post` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "createdAt",
ADD COLUMN     "published" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "content" SET NOT NULL;
