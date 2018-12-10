USE elec;
CREATE TABLE elec_cart(
sid INT(3) PRIMARY KEY AUTO_INCREMENT,
eid INT(3),
nid INT(3),
count INT(8)
);
INSERT INTO elec_cart VALUES
 (null,6,1,2),
 (null,2,3,1),
 (null,3,1,1),
 (null,4,6,1),
 (null,2,9,1),
 (null,5,7,1);