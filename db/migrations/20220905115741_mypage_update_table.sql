-- migrate:up
CREATE TABLE `orders` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `product_id` int NOT NULL,
  `orderNumber` int NOT NULL,
  `quantity` int NOT NULL,
  `created_at` timestamp DEFAULT (CURRENT_TIMESTAMP),
  FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  FOREIGN KEY (`products_id`) REFERENCES `products` (`id`)
);

ALTER TABLE users ADD profilePicture varchar(255) NULL;

ALTER TABLE `coding-restaurant`.`point`
CHANGE COLUMN `description` `history` VARCHAR(255) NOT NULL AFTER `point`;

DROP TABLE `coding-restaurant`.`order`;

-- migrate:down

