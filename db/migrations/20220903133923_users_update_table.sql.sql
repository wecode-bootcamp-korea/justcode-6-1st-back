-- migrate:up
ALTER TABLE users ADD isConsent BOOLEAN NULL;
ALTER TABLE address ADD address1 varchar(255) NOT NULL;
ALTER TABLE address ADD postalCode varchar(255) NOT NULL;

-- migrate:down
ALTER TABLE users DROP isConsent;
ALTER TABLE address DROP address1;
ALTER TABLE address DROP postalCode;

