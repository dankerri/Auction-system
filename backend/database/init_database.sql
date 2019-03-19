drop database s_admin_auth;
drop database s_user_auth;
drop database s_content;

-- create admin table
create database s_admin_auth;
use s_admin_auth;

create table admin(
    id int(20) AUTO_INCREMENT,
    username varchar(20),
    password varchar(20),
    primary key (id)
) engine=InnoDB default charset=utf8;

INSERT INTO admin () VALUES
(1, "root", "123456"),
(2, "001", "123456");

create table admin_profile(
    id int(20) AUTO_INCREMENT,
    user_id int(20),
    level int(2) default 1,
    neckname varchar(10),
    phone varchar(20),
    primary key (id)
) engine=InnoDB default charset=utf8;

INSERT INTO admin_profile() VALUES
(1, 1, 0, 'boss', '15920555414'),
(2, 2, 1, 'MR.001', '13902684933');

-- create user table
create database s_user_auth;
use s_user_auth;
create table user(
    id int(20) AUTO_INCREMENT,
    username varchar(20),
    password varchar(20),
    primary key (id)
) engine=InnoDB default charset=utf8;

INSERT INTO user ( ) VALUES
(1, "danker@qq.com", "123456"),
(2, "saber@qq.com", "123456"),
(3, "archer@qq.com", "654321");

create table user_profile(
    id int(20) AUTO_INCREMENT,
    user_id int(20),
    level int(2) default -1,
    neckname varchar(100),
    phone varchar(25),
    primary key (id)
) engine=InnoDB default charset=utf8;

INSERT INTO user_profile() VALUES
(1, 1, -1, 'MR.danker', '15920555144'),
(2, 2, -1, 'MRS.saber', '15920555144'),
(3, 3, 1, 'KingOfLight', '15920555144');

create database s_content;
use s_content;
-- Debugging
create table commodity(
    commodity_id INT(20) AUTO_INCREMENT,
    seller_id INT(20),
    commodity_name VARCHAR(200),
    -- 1 means living, 0 means freezed, -1 means expired 
    status int(1) default 1,
    PRIMARY KEY (commodity_id)
) engine=InnoDB default charset=utf8;

INSERT INTO commodity(seller_id, commodity_name, status) VALUES
(1, 'iphone', -1),
(1, 'macbook', 0),
(2, 'surface', 1),
(2, 'ipad pro', 1);

create table commodity_detail (
    detail_id INT(20) AUTO_INCREMENT,
    commodity_id INT(20), 
    price DECIMAL(10, 2), 
    post_time DATETIME,
    commodity_des VARCHAR(400),
    -- number of picture relate to a commodity
    pic_num INT(2) DEFAULT 1,
    category INT(2) DEFAULT 0,
    PRIMARY KEY (detail_id)
) engine=InnoDB default charset=utf8;

INSERT INTO commodity_detail(commodity_id, price, post_time, commodity_des) VALUES
(1, 1600.00, '2019-01-01 10:20:00', '二手iphone7成新,可小刀'),
(2, 10000.00, '2019-02-21 20:30:00', '九成新macbook, 红色'),
(3, 9000.00, '2019-10-01 10:05:00', '全新surface, 买多了一个算便宜一点出手了'),
(4, 1600.00, '2019-01-01 10:20:00', '二手ipad pro, 7成新,可小刀, 因为不好用');
