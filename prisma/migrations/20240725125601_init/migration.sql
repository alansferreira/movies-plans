-- CreateTable
CREATE TABLE `User` (
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NULL,
    `recover_code` VARCHAR(191) NULL,

    UNIQUE INDEX `User_recover_code_key`(`recover_code`),
    PRIMARY KEY (`username`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Plan` (
    `name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `version` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`name`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Subscription` (
    `id` VARCHAR(36) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `plan_name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Subscription_username_plan_name_key`(`username`, `plan_name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Genre` (
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`name`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PlanGenre` (
    `id` VARCHAR(36) NOT NULL,
    `genre_name` VARCHAR(191) NOT NULL,
    `plan_name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `PlanGenre_genre_name_plan_name_key`(`genre_name`, `plan_name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
