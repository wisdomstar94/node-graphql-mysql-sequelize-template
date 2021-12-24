#!/bin/bash

service mysql start
(echo "112233!@#"; echo "CREATE DATABASE test_database default CHARACTER SET=utf8 COLLATE=utf8_general_ci;"; echo "CREATE USER 'root'@'172.17.0.1' IDENTIFIED BY '112233!@#';"; echo "GRANT ALL PRIVILEGES ON *.* TO 'root'@'172.17.0.1' IDENTIFIED BY '112233!@#' WITH GRANT OPTION;"; echo "FLUSH PRIVILEGES;") | mysql -u root -p
