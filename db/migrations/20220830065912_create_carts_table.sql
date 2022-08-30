-- migrate:up
CREATE TABLE `carts` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `bundle_id` int NOT NULL,
  `quantity` int NOT NULL,
  FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  FOREIGN KEY (`bundle_id`) REFERENCES `bundle` (`id`)
);

-- migrate:down
TRUNCATE carts;