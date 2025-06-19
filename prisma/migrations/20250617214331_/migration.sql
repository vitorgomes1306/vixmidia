/*
  Warnings:

  - You are about to drop the column `user_id` on the `midias` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "midias_user_id_key";

-- AlterTable
ALTER TABLE "midias" DROP COLUMN "user_id";
