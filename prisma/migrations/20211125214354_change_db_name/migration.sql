/*
  Warnings:

  - You are about to drop the `Broa` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `Broa`;

-- CreateTable
CREATE TABLE `Broas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `wrongVersion` VARCHAR(255) NOT NULL,
    `rightVersion` VARCHAR(255) NOT NULL,
    `author` VARCHAR(100) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
