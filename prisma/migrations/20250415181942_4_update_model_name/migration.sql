/*
  Warnings:

  - You are about to drop the `AlunoRegistrado` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Chamada` DROP FOREIGN KEY `Chamada_alunoId_fkey`;

-- DropIndex
DROP INDEX `Chamada_alunoId_fkey` ON `Chamada`;

-- DropTable
DROP TABLE `AlunoRegistrado`;

-- CreateTable
CREATE TABLE `Aluno` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `matricula` VARCHAR(8) NOT NULL,
    `turma` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Chamada` ADD CONSTRAINT `Chamada_alunoId_fkey` FOREIGN KEY (`alunoId`) REFERENCES `Aluno`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
