/*
  Warnings:

  - You are about to drop the `testimonials` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `testimonials`;

-- CreateTable
CREATE TABLE `testimonies` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `logo` VARCHAR(255) NULL,
    `name` VARCHAR(255) NOT NULL,
    `description` TEXT NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
