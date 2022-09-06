-- migrate:up
INSERT INTO `carts` (`id`,`user_id`,`bundle_id`,`quantity`,`created_at`) VALUES (1,1,1,1,'2022-09-06 22:26:22');
INSERT INTO `carts` (`id`,`user_id`,`bundle_id`,`quantity`,`created_at`) VALUES (2,1,5,2,'2022-09-06 22:26:22');
INSERT INTO `carts` (`id`,`user_id`,`bundle_id`,`quantity`,`created_at`) VALUES (3,2,8,1,'2022-09-06 22:26:22');
INSERT INTO `carts` (`id`,`user_id`,`bundle_id`,`quantity`,`created_at`) VALUES (4,2,12,2,'2022-09-06 22:26:22');
INSERT INTO `carts` (`id`,`user_id`,`bundle_id`,`quantity`,`created_at`) VALUES (5,3,14,1,'2022-09-06 22:26:22');
INSERT INTO `carts` (`id`,`user_id`,`bundle_id`,`quantity`,`created_at`) VALUES (6,3,16,2,'2022-09-06 22:26:22');
INSERT INTO `carts` (`id`,`user_id`,`bundle_id`,`quantity`,`created_at`) VALUES (7,4,20,1,'2022-09-06 22:26:22');
INSERT INTO `carts` (`id`,`user_id`,`bundle_id`,`quantity`,`created_at`) VALUES (8,4,23,2,'2022-09-06 22:26:22');
INSERT INTO `carts` (`id`,`user_id`,`bundle_id`,`quantity`,`created_at`) VALUES (9,5,31,1,'2022-09-06 22:26:22');
INSERT INTO `carts` (`id`,`user_id`,`bundle_id`,`quantity`,`created_at`) VALUES (10,5,53,2,'2022-09-06 22:26:22');

-- migrate:down

