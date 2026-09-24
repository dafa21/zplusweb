/*
  Warnings:

  - You are about to drop the column `information` on the `information` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[section_key]` on the table `information` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `section_key` to the `information` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `information_information_key` ON `information`;

-- AlterTable
ALTER TABLE `information` DROP COLUMN `information`,
    ADD COLUMN `section_key` VARCHAR(50) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `information_section_key_key` ON `information`(`section_key`);
