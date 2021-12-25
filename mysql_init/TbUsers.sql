CREATE TABLE `TbUsers` (
	`id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'pk 값',
	`userId` VARCHAR(50) NOT NULL COMMENT '회원 ID' COLLATE 'utf8_general_ci',
	`userAddr` VARCHAR(100) NOT NULL COMMENT '회원 주소' COLLATE 'utf8_general_ci',
	`userAge` INT(10) UNSIGNED NOT NULL COMMENT '회원 나이',
	`createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '생성일',
	PRIMARY KEY (`id`) USING BTREE,
	UNIQUE INDEX `userId` (`userId`) USING BTREE
)
COMMENT='회원 테이블'
COLLATE='utf8_general_ci'
ENGINE=InnoDB
;