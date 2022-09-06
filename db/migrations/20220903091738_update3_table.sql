-- migrate:up
ALTER TABLE products ADD content varchar(200) NULL;

-- migrate:down