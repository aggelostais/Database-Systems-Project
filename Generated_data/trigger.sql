DELIMITER $$
CREATE TRIGGER prevent_overlapping_visits
BEFORE INSERT
ON visits 
FOR EACH ROW
BEGIN
    DECLARE rowcount INT;
    
    SELECT COUNT(*) 
    INTO rowcount
    FROM visits 
    WHERE visits.nfc_id = new.nfc_id AND ( (new._from > visits._from AND new._from < visits._to) OR (new._to > visits._from AND new._to < visits._to) );
    
    IF rowcount > 0 THEN
        signal sqlstate '45000';
    END IF; 

END $$
DELIMITER ;