-- migrate:up
CREATE TABLE orders (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  product_id INT NOT NULL,
  order_number INT NOT NULL,
  quantity INT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT orders_user_id_fk FOREIGN KEY (user_id) REFERENCES users(id),
  CONSTRAINT orders_product_id_fk FOREIGN KEY (product_id) REFERENCES products(id)
  );

-- migrate:down
DROP TABLE orders;