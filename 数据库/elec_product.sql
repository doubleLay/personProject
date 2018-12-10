USE elec;
CREATE TABLE elec_product (
nid INT(3) PRIMARY KEY AUTO_INCREMENT,
pid INT(3), 
pname VARCHAR(32),
new_price DECIMAL(8,2),
old_price DECIMAL(8,2),
details VARCHAR(128),
stock INT(8),
descripted VARCHAR(128),
img_url VARCHAR(32)
);
INSERT INTO elec_product VALUES
(null,1,"联想拯救者Y7000","6000.00","6600.00","联想拯救者Y7000游戏本系列
采用三面窄边框设计，配备15.6英寸1080P屏幕，
屏占比84%，可选高色域版；搭载酷睿八代标压处理器，
英伟达GTX1050系列显卡","1212",
"这么高颜值的联想拯救者Y7000(i5-8300H/8GB/2TB+128GB/GTX1050Ti)不论
是外观设计还是性能表现均可圈可点。颜色搭配与材质选择一改之前传统的设计风格，
沉稳机身+澎湃性能真正做到性能与颜值齐飞，可以说是联想(Lenovo)出手的“王炸”了",
"img/lenovo01.jpg"),
(null,1,"联想小新潮7000-13","5000.00","5500.00","酷睿8代处理器，MX150 2G独显，
背光键盘，窄边框屏幕","1223",
"性能级独立显卡,NVIDIA Geforce MX150 锂聚合物电池",
"img/lenovo02.jpg"),
(null,1,"联想小新Air15","5000.00","5400.00","酷睿8代处理器，MX150显卡，
背光键盘，轻薄微边框","1234",
"性能级独立显卡,NVIDIA Geforce MX150",
"img/lenovo03.jpg"),
(null,1,"联想Ideapad 330C-15","4800.00","5100.00","酷睿8代处理器，超大双硬盘存储，
2G独显，丰富接口","1244",
"性能级独立显卡,NVIDIA Geforce MX150 3芯锂电池",
"img/lonovo04.jpg"),
(null,1,"联想扬天V330-14","3800.00","4000.00","轻薄便携，防窥摄像头，180°翻转，
接口丰富","1235",
"性能级独立显卡,性价比高",
"img/lenove05.jpg"),
(null,1,"联想YOGA Book 2","10600.00","11000.00","核心显卡，可翻转,i5 7代，
背光键盘，窄边框屏幕","1500",
"性能级独立显卡,NVIDIA Geforce MX150 锂聚合物电池",
"img/leveno06.jpg"),
(null,1,"联想扬天V330-15","3766.00","4000.00","i5 8250U/4GB/500GB/2G独显，
背光键盘，窄边框屏幕","1266",
"性能级独立显卡,NVIDIA Geforce MX150 锂聚合物电池",
"img/lenovo07.jpg");