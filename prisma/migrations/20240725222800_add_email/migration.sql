/*
  Warnings:

  - You are about to drop the `Genre` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `email` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `Genre`;

-- AddForeignKey
ALTER TABLE `PlanGenre` ADD CONSTRAINT `PlanGenre_plan_id_fkey` FOREIGN KEY (`plan_id`) REFERENCES `Plan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
