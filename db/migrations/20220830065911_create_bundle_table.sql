-- migrate:up
CREATE TABLE `bundle` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `bundle_option` varchar(255),
  `price` int,
  `quantity` int,
  FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
);

-- migrate:down