-- migrate:up
CREATE TABLE `address` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `address` varchar(255) NOT NULL,
  FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
);

-- migrate:down

TRUNCATE address;