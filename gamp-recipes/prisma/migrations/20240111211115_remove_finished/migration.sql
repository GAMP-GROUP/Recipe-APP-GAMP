/*
  Warnings:

  - You are about to drop the column `finished` on the `Favorite_Recipes` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id,recipe_id]` on the table `Finished_Recipes` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Favorite_Recipes` DROP COLUMN `finished`;

-- CreateIndex
CREATE UNIQUE INDEX `Finished_Recipes_user_id_recipe_id_key` ON `Finished_Recipes`(`user_id`, `recipe_id`);
