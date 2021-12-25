#!/bin/bash

service mysql start
mysql -u root -p test_database < /home/mysql_init/TbUsers.sql
mysql -u root -p test_database < /home/mysql_init/TbProducts.sql
mysql -u root -p test_database < /home/mysql_init/TbLikes.sql