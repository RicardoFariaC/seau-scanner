-- CreateTable
CREATE TABLE `Tipo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AlunoRegistrado` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `matricula` VARCHAR(8) NOT NULL,
    `turma` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Evento` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(255) NOT NULL,
    `capacidade` INTEGER NULL,
    `data_periodo` DATETIME(6) NOT NULL,
    `login` VARCHAR(4) NOT NULL,
    `senha` VARCHAR(191) NOT NULL,
    `tipoId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Presença` (
    `eventoId` INTEGER NOT NULL,
    `alunoId` INTEGER NOT NULL,

    PRIMARY KEY (`eventoId`, `alunoId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Evento` ADD CONSTRAINT `Evento_id_fkey` FOREIGN KEY (`id`) REFERENCES `Tipo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Presença` ADD CONSTRAINT `Presença_eventoId_fkey` FOREIGN KEY (`eventoId`) REFERENCES `Evento`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Presença` ADD CONSTRAINT `Presença_alunoId_fkey` FOREIGN KEY (`alunoId`) REFERENCES `AlunoRegistrado`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

