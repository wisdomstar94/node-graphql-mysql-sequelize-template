CREATE TABLE `TbLikes` (
	`id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'pk 값',
	`tbusers_id` INT(10) UNSIGNED NULL DEFAULT NULL COMMENT 'TbUsers 테이블의 pk 값',
	`tbproducts_id` INT(10) UNSIGNED NULL DEFAULT NULL COMMENT 'TbProducts 테이블의 pk 값',
	`createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '생성일',
	PRIMARY KEY (`id`) USING BTREE,
	INDEX `tbusers_id` (`tbusers_id`) USING BTREE,
	INDEX `tbproducts_id` (`tbproducts_id`) USING BTREE,
	CONSTRAINT `TbLikes_ibfk_1` FOREIGN KEY (`tbusers_id`) REFERENCES `test_database`.`TbUsers` (`id`) ON UPDATE CASCADE ON DELETE CASCADE,
	CONSTRAINT `TbLikes_ibfk_2` FOREIGN KEY (`tbproducts_id`) REFERENCES `test_database`.`TbProducts` (`id`) ON UPDATE CASCADE ON DELETE CASCADE
)
COMMENT='좋아요 정보 테이블'
COLLATE='utf8_general_ci'
ENGINE=InnoDB
;