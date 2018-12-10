SET NAMES UTF8;
USE elec;
CREATE TABLE elec_similar_product(
    nid INT(3)  PRIMARY KEY AUTO_INCREMENT,
    pid INT(3),
    pname VARCHAR(32),
    title VARCHAR(32),
    new_price DECIMAL(8,2),
    old_price DECIMAL(8,2),
    img_url VARCHAR(128)
);
INSERT INTO elec_similar_product VALUES
(null,3,"戴尔笔记本电脑","戴尔Inspiron灵越","6000.00","6600.00","img/dellsi1.jpg"),
(null,3,"戴尔笔记本电脑","燃700 PRO","5699.00","6000.00","img/dellsi2.jpg"),
(null,4,"宏基笔记本电脑","蜂鸟Swift3","4699.00","5000.00","img/acer02.jpg"),
(null,6,"小米笔记本电脑","小米Pro","5999.00","6600.00","img/mi02.jpg"),
(null,5,"华硕笔记本电脑","灵耀S 2代","5799.00","6200.00","img/asus.jpg"),
(null,5,"华硕笔记本电脑","华硕 adol","7699.00","7800.00","img/asus03.jpg"),
(null,3,"戴尔笔记本电脑","XPS","7799.00","7900.00","img/dell03.jpg"),
(null,2,"苹果笔记本电脑","Apple MacBook Pro ","13488.00","14000.00","img/applsi.jpg"),
(null,10,"微软笔记本电脑","微软Surface Book","12388.00","13000.00","img/applsi2.jpg");