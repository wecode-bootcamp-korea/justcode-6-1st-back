-- migrate:up
INSERT INTO `orders` (`id`,`user_id`,`product_id`,`order_number`,`quantity`,`created_at`) VALUES (1,1,1,123680,2,'2022-09-06 22:31:57');
INSERT INTO `orders` (`id`,`user_id`,`product_id`,`order_number`,`quantity`,`created_at`) VALUES (2,1,2,124780,1,'2022-09-06 22:31:57');
INSERT INTO `orders` (`id`,`user_id`,`product_id`,`order_number`,`quantity`,`created_at`) VALUES (3,2,3,125709,1,'2022-09-06 22:31:57');
INSERT INTO `orders` (`id`,`user_id`,`product_id`,`order_number`,`quantity`,`created_at`) VALUES (4,2,4,126780,3,'2022-09-06 22:31:57');
INSERT INTO `orders` (`id`,`user_id`,`product_id`,`order_number`,`quantity`,`created_at`) VALUES (5,3,5,127349,1,'2022-09-06 22:31:57');
INSERT INTO `orders` (`id`,`user_id`,`product_id`,`order_number`,`quantity`,`created_at`) VALUES (6,4,6,128572,2,'2022-09-06 22:31:57');
INSERT INTO `orders` (`id`,`user_id`,`product_id`,`order_number`,`quantity`,`created_at`) VALUES (7,5,7,129561,3,'2022-09-06 22:31:57');

-- migrate:down

