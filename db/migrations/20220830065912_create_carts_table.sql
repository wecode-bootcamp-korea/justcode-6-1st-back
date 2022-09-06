-- migrate:up
CREATE TABLE carts (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  bundle_id INT NOT NULL,
  quantity INT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT carts_user_id_fk FOREIGN KEY (user_id) REFERENCES users(id),
  CONSTRAINT carts_bundle_id_fk FOREIGN KEY (bundle_id) REFERENCES bundle(id)
  );

-- migrate:down
DROP TABLE carts;