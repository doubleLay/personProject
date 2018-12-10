USE elec;
CREATE TABLE elec_user (
eid INT(3) PRIMARY KEY AUTO_INCREMENT,
name VARCHAR(10),
gender VARCHAR(3),
phone VARCHAR(11),
addr VARCHAR(16),
password VARCHAR(16),
email VARCHAR(32),
money DECIMAL(8,2)
);
INSERT INTO elec_user VALUES
  (null,'卢云','M','12451258712','上海','123456','luyun@qq.com','3000.00'),
  (null,'秦仲海','M','14725896301','重庆','123456','qinzhonghai@qq.com','6000.00'),
  (null,'顾倩兮','F','14784562487','北京','123456','guqianxi@qq.com','7000.00'),
  (null,'杨肃观','M','14785464574','四川','123456','yangsuguan@qq.com','8000.00'),
  (null,'伍定远','M','14754542212','北京','123456','wudingyuan@qq.com','9000.00'),
  (null,'宁不凡','M','17845457856','浙江','123456','ningbufan@qq.com','6000.00'),
  (null,'曲艳婷','F','17845457812','武汉','123456','quyanting@qq.com','8000.00'),
  (null,'阿贾克斯','M','17845457822','浙江','123456','ajax@qq.com','5000.00'),
  (null,'dong','M','17845457822','北京','123456','dong@qq.com','7000.00')
;
SELECT * FROM elec_user;