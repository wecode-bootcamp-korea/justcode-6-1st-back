-- migrate:up
CREATE TABLE `point` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `point` int,
  FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
);

-- migrate:down