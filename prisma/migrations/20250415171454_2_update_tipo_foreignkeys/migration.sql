-- DropForeignKey
ALTER TABLE `Evento` DROP FOREIGN KEY `Evento_id_fkey`;

-- AddForeignKey
ALTER TABLE `Evento` ADD CONSTRAINT `Evento_tipoId_fkey` FOREIGN KEY (`tipoId`) REFERENCES `Tipo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
