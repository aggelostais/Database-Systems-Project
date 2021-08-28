CREATE INDEX from_index ON visits (_from);

CREATE INDEX to_index ON visits (_to);

CREATE INDEX customer_id_number ON customer (id_number);

CREATE INDEX charge_time_index ON uses (charge_time);