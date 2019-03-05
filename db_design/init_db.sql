use s_admin_auth;

create table admin(
	admin_id binary(16),
	primary key (`admin_id`)
); charset=utf8;


-- DELIMITER $$
-- CREATE FUNCTION `UUIDTOBIN`() RETURNS binary(16) 
-- BEGIN 
-- DECLARE my_uuid char(36); 
-- SET my_uuid = UUID(); 
-- RETURN CONCAT(UNHEX(LEFT(my_uuid,8)),UNHEX(MID(my_uuid,10,4)),UNHEX(MID(my_uuid,15,4)),UNHEX(MID(my_uuid,20,4)),UNHEX(RIGHT(my_uuid,12))); 
-- END $$

-- DELIMITER;

-- INSERT INTO admin(admin_id) VALUES(UUIDTOBIN()