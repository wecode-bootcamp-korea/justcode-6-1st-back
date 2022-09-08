-- migrate:up
CREATE TABLE address (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  postal_code INT NOT NULL,
  address VARCHAR(200) NOT NULL,
  address1 VARCHAR(200) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT address_user_id_fk FOREIGN KEY (user_id) REFERENCES users(id)
  );

-- migrate:down
DROP TABLE address;