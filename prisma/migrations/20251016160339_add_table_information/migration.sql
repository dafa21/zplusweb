-- CreateTable
CREATE TABLE `information` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `information` VARCHAR(50) NOT NULL,
    `vision` TEXT NOT NULL,
    `mission` TEXT NOT NULL,
    `history` TEXT NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `information_information_key`(`information`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
