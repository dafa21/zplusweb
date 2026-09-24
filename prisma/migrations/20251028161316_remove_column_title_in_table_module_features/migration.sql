/*
  Warnings:

  - You are about to drop the column `title` on the `module_features` table. All the data in the column will be lost.
  - Made the column `image` on table `module_features` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `module_features` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `module_features` DROP COLUMN `title`,
    MODIFY `image` VARCHAR(255) NOT NULL,
    MODIFY `description` TEXT NOT NULL;
