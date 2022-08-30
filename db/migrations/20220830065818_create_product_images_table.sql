-- migrate:up
CREATE TABLE `product_images` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `image` varchar(255),
  FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
);

-- migrate:down
TRUNCATE product_images;