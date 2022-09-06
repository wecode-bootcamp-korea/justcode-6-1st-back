-- migrate:up
CREATE TABLE products (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  category VARCHAR(200) NOT NULL,
  name VARCHAR(200) NOT NULL,
  description VARCHAR(200) NOT NULL,
  productor VARCHAR(200) NOT NULL,
  image_thumbnail VARCHAR(200) NOT NULL,
  view_count INT NULL,
  order_count INT NULL,
  fixedPrice INT NOT NULL,
  content VARCHAR(200) NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP
  );

-- migrate:down 
DROP TABLE products;