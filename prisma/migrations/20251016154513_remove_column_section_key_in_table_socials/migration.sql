/*
  Warnings:

  - You are about to drop the column `section_key` on the `socials` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `socials_section_key_key` ON `socials`;

-- AlterTable
ALTER TABLE `socials` DROP COLUMN `section_key`;
