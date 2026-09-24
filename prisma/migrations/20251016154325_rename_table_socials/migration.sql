/*
  Warnings:

  - You are about to drop the `contacts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `contacts`;

-- CreateTable
CREATE TABLE `socials` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `section_key` VARCHAR(50) NOT NULL DEFAULT 'cta',
    `type` VARCHAR(255) NOT NULL,
    `value` VARCHAR(50) NOT NULL,
    `link` VARCHAR(50) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `socials_section_key_key`(`section_key`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
