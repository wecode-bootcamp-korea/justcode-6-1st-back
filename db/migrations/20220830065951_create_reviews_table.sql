-- migrate:up
CREATE TABLE `reviews` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `product_id` int NOT NULL,
  `content` varchar(255) NOT NULL,
  `rating` int NOT NULL,
  `created_at` timestamp DEFAULT (CURRENT_TIMESTAMP),
  `review_comment_id` int,
  FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  FOREIGN KEY (`review_comment_id`) REFERENCES `reviews` (`id`)
);

-- migrate:down
TRUNCATE reviews;
