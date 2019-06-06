drop database s_admin_auth;
drop database s_user_auth;
drop database s_content;

-- create admin tables
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

-- create user tables
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


-- create commodity tables
create table commodity(
    commodity_id INT(20) AUTO_INCREMENT,
    pic_num INT(2) DEFAULT 1,
    price DECIMAL(10,2),
    post_time DATETIME,
    commodity_name VARCHAR(200),
    commodity_desc VARCHAR(400),
    -- 1表示还未拍卖, 2表示正在拍卖, 3表示拍卖结束 
    status int(1) default 1,
    -- 1表示展示在首页上
    active int(1) default 0,
    buyer varchar(40),
    PRIMARY KEY (commodity_id)
) engine=InnoDB default charset=utf8;

INSERT INTO 
commodity(price, post_time, commodity_name, commodity_desc, status, active) 
VALUES
('22', '2019-06-06 07:58:00', 'cup', "This cup was uesd by Mea, It's very precious.", 2, 1);
('100', '2019-06-06 07:58:00', 'joe的拳套', "这是joe使用过的拳套, It's very precious.", 2, 1);
