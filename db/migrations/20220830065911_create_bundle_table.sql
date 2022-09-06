-- migrate:up
CREATE TABLE bundle (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  product_id INT NOT NULL,
  bundle_option VARCHAR(50) NOT NULL,
  price INT NOT NULL,
  quantity INT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT bundle_product_id_fk FOREIGN KEY (product_id) REFERENCES products(id)
  );

-- migrate:down
DROP TABLE bundle;