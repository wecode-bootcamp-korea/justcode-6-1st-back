-- migrate:up
CREATE TABLE `order` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `cart_id` int NOT NULL,
  `address_id` int NOT NULL,
  `created_at` timestamp DEFAULT (CURRENT_TIMESTAMP),
  FOREIGN KEY (`address_id`) REFERENCES `address` (`id`),
  FOREIGN KEY (`cart_id`) REFERENCES `carts` (`id`),
  FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
);

-- migrate:down