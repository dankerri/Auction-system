-- select * from commodity where commodity_id=1;
-- select * from commodity_detail where commodity_id=1;

-- DELIMITER //

-- CREATE PROCEDURE editCard()
-- BEGIN
-- 	UPDATE `commodity` SET `commodity_name` = 'iphone6s' where commodity_id = 99999;
-- 	UPDATE `commodity_detail` SET `price` = '1602' where commodity_id = 1;
-- END //

-- DELIMITER ;

-- CALL editCard();
-- mysql_affected_rows()!=1

-- BEGIN;
-- 	UPDATE `commodity` SET `commodity_name` = 'iphone7s' where commodity_id = 99999;
-- 	UPDATE `commodity_detail` SET `price` = '1607' where commodity_id = 1;
-- COMMIT;

select * from commodity where commodity_id=1;
select * from commodity_detail where commodity_id=1;
