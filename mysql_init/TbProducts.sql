CREATE TABLE `TbProducts` (
	`id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'pk 값',
	`productName` VARCHAR(100) NOT NULL COMMENT '상품명' COLLATE 'utf8_general_ci',
	`productDescription` TEXT NULL DEFAULT NULL COMMENT '상품 설명' COLLATE 'utf8_general_ci',
	`productPrice` INT(10) UNSIGNED NOT NULL COMMENT '상품 가격',
	`createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '생성일',
	PRIMARY KEY (`id`) USING BTREE
)
COMMENT='상품 테이블'
COLLATE='utf8_general_ci'
ENGINE=InnoDB
;