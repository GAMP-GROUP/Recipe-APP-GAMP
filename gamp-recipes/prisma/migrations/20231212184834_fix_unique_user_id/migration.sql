-- DropForeignKey
ALTER TABLE `Ingredients_Recipes` DROP FOREIGN KEY `Ingredients_Recipes_ingredient_id_fkey`;

-- DropForeignKey
ALTER TABLE `Ingredients_Recipes` DROP FOREIGN KEY `Ingredients_Recipes_recipe_id_fkey`;

-- AlterTable
ALTER TABLE `Ingredients_Recipes` MODIFY `recipe_id` INTEGER NULL;

-- CreateTable
CREATE TABLE `Finished_Recipes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `recipe_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Finished_Recipes_user_id_recipe_id_key`(`user_id`, `recipe_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Ingredients_Recipes` ADD CONSTRAINT `Ingredients_Recipes_recipe_id_fkey` FOREIGN KEY (`recipe_id`) REFERENCES `Recipes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ingredients_Recipes` ADD CONSTRAINT `Ingredients_Recipes_ingredient_id_fkey` FOREIGN KEY (`ingredient_id`) REFERENCES `Ingredients`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Finished_Recipes` ADD CONSTRAINT `Finished_Recipes_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Finished_Recipes` ADD CONSTRAINT `Finished_Recipes_recipe_id_fkey` FOREIGN KEY (`recipe_id`) REFERENCES `Recipes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
