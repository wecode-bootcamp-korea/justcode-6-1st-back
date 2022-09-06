-- migrate:up
CREATE TABLE reviews (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  product_id INT NOT NULL,
  content VARCHAR(200) NOT NULL,
  rating INT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT reviews_user_id_fk FOREIGN KEY (user_id) REFERENCES users(id),
  CONSTRAINT reviews_product_id_fk FOREIGN KEY (product_id) REFERENCES products(id)
  );

-- migrate:down
DROP TABLE reviews;