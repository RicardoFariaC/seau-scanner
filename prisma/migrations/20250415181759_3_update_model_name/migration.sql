/*
  Warnings:

  - You are about to drop the `Presença` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Presença` DROP FOREIGN KEY `Presença_alunoId_fkey`;

-- DropForeignKey
ALTER TABLE `Presença` DROP FOREIGN KEY `Presença_eventoId_fkey`;

-- DropTable
DROP TABLE `Presença`;

-- CreateTable
CREATE TABLE `Chamada` (
    `eventoId` INTEGER NOT NULL,
    `alunoId` INTEGER NOT NULL,

    PRIMARY KEY (`eventoId`, `alunoId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Chamada` ADD CONSTRAINT `Chamada_eventoId_fkey` FOREIGN KEY (`eventoId`) REFERENCES `Evento`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Chamada` ADD CONSTRAINT `Chamada_alunoId_fkey` FOREIGN KEY (`alunoId`) REFERENCES `AlunoRegistrado`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
