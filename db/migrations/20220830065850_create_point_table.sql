-- migrate:up
CREATE TABLE points (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  point INT NOT NULL,
  history VARCHAR(200) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT points_user_id_fk FOREIGN KEY (user_id) REFERENCES users(id)
  );

-- migrate:down
DROP TABLE points;