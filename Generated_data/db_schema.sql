CREATE TABLE customer (
    nfc_id INT AUTO_INCREMENT,
    first_name VARCHAR(40) NOT NULL,
    last_name VARCHAR(40) NOT NULL,
    birth_date DATE NOT NULL,
    id_type VARCHAR(20) NOT NULL,
    id_number VARCHAR(20) NOT NULL,
    id_authority VARCHAR(60) NOT NULL,
    PRIMARY KEY (nfc_id)
);

CREATE TABLE email (
    nfc_id INT,
    email_address VARCHAR(50) NOT NULL,
    PRIMARY KEY (nfc_id, email_address),
    FOREIGN KEY(nfc_id) REFERENCES customer(nfc_id) ON DELETE CASCADE
);

CREATE TABLE phone (
    nfc_id INT,
    phone_number VARCHAR(50) NOT NULL,
    PRIMARY KEY (nfc_id, phone_number),
    FOREIGN KEY(nfc_id) REFERENCES customer(nfc_id) ON DELETE CASCADE
);

CREATE TABLE service (
    service_id INT AUTO_INCREMENT,
    description VARCHAR(40) NOT NULL,
    requires_registration BIT(1) NOT NULL,
    PRIMARY KEY (service_id)
);

CREATE TABLE area (
    area_id INT AUTO_INCREMENT,
    beds INT NOT NULL CHECK (beds >= 0 AND beds < 5),
    area_name VARCHAR(40) NOT NULL,
    area_description VARCHAR(60) NOT NULL,
    service_id INT,
    PRIMARY KEY (area_id),
    FOREIGN KEY(service_id) REFERENCES service(service_id)
);

CREATE TABLE visits (
    nfc_id INT,
    area_id INT,
    _from TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    _to TIMESTAMP NULL,
    PRIMARY KEY (nfc_id, area_id, _from),
    FOREIGN KEY(nfc_id) REFERENCES customer(nfc_id) ON DELETE CASCADE,
    FOREIGN KEY(area_id) REFERENCES area(area_id) ON DELETE CASCADE
);

CREATE TABLE has_access (
    nfc_id INT,
    area_id INT,
    _start TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    _end TIMESTAMP NULL,
    PRIMARY KEY (nfc_id, area_id, _start),
    FOREIGN KEY(nfc_id) REFERENCES customer(nfc_id) ON DELETE CASCADE,
    FOREIGN KEY(area_id) REFERENCES area(area_id) ON DELETE CASCADE
);

CREATE TABLE uses (
    nfc_id INT,
    service_id INT,
    charge_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    amount DECIMAL(10, 2) NOT NULL,
    charge_description VARCHAR(50) NOT NULL,
    PRIMARY KEY (nfc_id, service_id, charge_time),
    FOREIGN KEY(nfc_id) REFERENCES customer(nfc_id) ON DELETE CASCADE,
    FOREIGN KEY(service_id) REFERENCES service(service_id) ON DELETE CASCADE
);

CREATE TABLE registered_in (
    nfc_id INT,
    service_id INT,
    registration_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (nfc_id, service_id, registration_time),
    FOREIGN KEY(nfc_id) REFERENCES customer(nfc_id) ON DELETE CASCADE,
    FOREIGN KEY(service_id) REFERENCES service(service_id) ON DELETE CASCADE
);