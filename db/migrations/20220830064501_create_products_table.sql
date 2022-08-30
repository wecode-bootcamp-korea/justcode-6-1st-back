-- migrate:up
CREATE TABLE `products` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `category` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255),
  `productor` varchar(255),
  `image_thumbnail` varchar(255),
  `view_count` int,
  `order_count` int,
  `created_at` timestamp DEFAULT (CURRENT_TIMESTAMP)
);

-- migrate:down

TRUNCATE products;

