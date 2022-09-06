-- migrate:up
CREATE TABLE product_images (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  product_id INT NOT NULL,
  image VARCHAR(200) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT product_images_product_id_fk FOREIGN KEY (product_id) REFERENCES products(id)
  );

-- migrate:down
DROP TABLE product_images