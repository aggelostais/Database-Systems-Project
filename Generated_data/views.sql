-- sales per service view
CREATE VIEW sales_per_service(description, sales) AS
SELECT service.description, SUM(uses.amount)
FROM uses
JOIN service
ON service.service_id = uses.service_id
GROUP BY service.service_id;

-- customer records view
CREATE VIEW customer_records AS
SELECT A.nfc_id, A.first_name, A.last_name, A.birth_date,
 A.id_number, A.id_type, A.email_address,
 A.checkin_time, B.total_charge
FROM
(
SELECT customer.nfc_id, customer.first_name, customer.last_name, customer.birth_date,
 customer.id_number, customer.id_type, email.email_address,
 registered_in.registration_time AS checkin_time
FROM customer
JOIN email
ON customer.nfc_id = email.nfc_id
JOIN phone
ON customer.nfc_id = phone.nfc_id
JOIN registered_in
ON customer.nfc_id = registered_in.nfc_id
WHERE registered_in.service_id = 1
GROUP BY customer.nfc_id
) AS A
JOIN
(
SELECT customer.nfc_id, SUM(amount) AS total_charge
FROM customer
JOIN uses
ON customer.nfc_id = uses.nfc_id
GROUP BY customer.nfc_id
) AS B
ON A.nfc_id = B.nfc_id;