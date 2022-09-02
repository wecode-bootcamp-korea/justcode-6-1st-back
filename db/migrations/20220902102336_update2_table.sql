-- migrate:up
ALTER TABLE products ADD fixedPrice int NOT NULL;

-- migrate:down

