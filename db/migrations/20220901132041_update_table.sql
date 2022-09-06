-- migrate:up
ALTER TABLE users ADD birth int NOT NULL;
ALTER TABLE users ADD gender varchar(50) NOT NULL;
ALTER TABLE point ADD created_at timestamp DEFAULT (CURRENT_TIMESTAMP);
ALTER TABLE point ADD description varchar(50) NULL;
ALTER TABLE bundle CHANGE bundle_name bundle_option varchar(50) ;

-- migrate:down

ALTER TABLE users DROP birth;
ALTER TABLE users DROP gender;
ALTER TABLE point DROP created_at;
ALTER TABLE point DROP description;
ALTER TABLE bundle DROP bundle_option;
