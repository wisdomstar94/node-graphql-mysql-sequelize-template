# 우분투 OS로 지정
FROM ubuntu:20.04

# 라벨 지정
LABEL "MAINTAINER"="Shin Jae Hyeon"
LABEL "DESCRIPTION"="Node.js의 Express프레임워크를 기반으로 Mysql을 Sequelize와 GraphQL으로 연동, 구현한 프로젝트의 도커 이미지 입니다."

# apt-get update 진행
RUN apt-get update -y

# apt-get upgrade 진행
RUN apt-get upgrade -y

# 기본적인 패키지 설치 및 환경설정 진행
# echo 6 => ASIA 선택한다는 뜻
# ECHO 69 => Seoul 선택한다는 뜻
# 시간대가 Asia/Seoul 로 설정됨
RUN (echo 6 ; echo 69) | apt-get install net-tools cron systemd curl wget vim cmake gcc g++ -y

# 한글 UTF-8 언어팩 설치 및 적용
# 언어셋이 ko_KR.UTF-8 로 설정됨
RUN apt-get install language-pack-ko -y
RUN locale-gen ko_KR.UTF-8
RUN update-locale LANG=ko_KR.UTF-8 LC_MESSAGES=POSIX
RUN export LANG=ko_KR.UTF-8
RUN sed -i'' -r -e "/\#fi/a\export LANG=ko_KR.UTF-8" /root/.bashrc

# Mysql 5.7 설치하기 전 필요한 패키지 설치
RUN apt-get install -y lsb-release gnupg 

# Mysql 5.7 설치하기
WORKDIR /root
RUN wget https://dev.mysql.com/get/mysql-apt-config_0.8.12-1_all.deb
RUN (echo 7 ; echo 1 ; echo 1 ; echo 4) | dpkg -i mysql-apt-config_0.8.12-1_all.deb
RUN apt-get update
RUN apt-cache policy mysql-server
RUN DEBIAN_FRONTEND=noninteractive apt install -y -f mysql-client=5.7* mysql-community-server=5.7* mysql-server=5.7*
RUN sed -i'' -r -e "s/127.0.0.1/0.0.0.0/" /etc/mysql/mysql.conf.d/mysqld.cnf
RUN service mysql start

# Mysql 초기 설정
# RUN mysql -e "SET PASSWORD FOR root@localhost = PASSWORD('112233abc'); FLUSH PRIVILEGES;"
# RUN mysql -e "CREATE DATABASE test_database default CHARACTER SET=utf8 COLLATE=utf8_general_ci;"
# RUN mysql -e "CREATE USER 'root'@'172.17.0.1' IDENTIFIED BY '112233abc';"
# RUN mysql -e "GRANT ALL PRIVILEGES ON *.* TO 'root'@'172.17.0.1' IDENTIFIED BY '112233abc' WITH GRANT OPTION;"
# RUN mysql -e "FLUSH PRIVILEGES;"
COPY mysql_init /home/mysql_init
WORKDIR /home/mysql_init
RUN sed -i 's/\r$//' mysql_init.sh
# RUN sed -i 's/\r$//' mysql_init_data.sh
RUN sh mysql_init.sh 
# RUN sh mysql_init_data.sh 

# 컨테이너 실행시 Mysql 자동 시작되도록 설정
RUN sed -i'' -r -e "/export LANG=ko_KR.UTF-8/a\service mysql start" /root/.bashrc

# Node.js 16.x 설치
RUN curl -sL https://deb.nodesource.com/setup_16.x | bash -
RUN apt-get install -y nodejs

# 필요한 npm 패키지 전역 설치
RUN npm i -g pm2 sequelize-cli

# git 2.33.1 설치
RUN apt-get install libssl-dev libcurl4-gnutls-dev zlib1g-dev gettext -y
WORKDIR /usr/src
RUN wget https://www.kernel.org/pub/software/scm/git/git-2.33.1.tar.gz
RUN tar -xvzf git-2.33.1.tar.gz
WORKDIR /usr/src/git-2.33.1
RUN ./configure --prefix=/usr/local/git
RUN make && make install
RUN export PATH=$PATH:/usr/local/git/bin
RUN sed -i'' -r -e "/service mysql start/a\export PATH=\$PATH:/usr/local/git/bin\n\# t20211225123700" /root/.bashrc

# node-graphql-mysql-sequelize-template 레포지토리 clone 하기
WORKDIR /home
RUN /usr/local/git/bin/git clone https://github.com/wisdomstar94/node-graphql-mysql-sequelize-template.git
WORKDIR /home/node-graphql-mysql-sequelize-template
RUN npm i

# 컨테이너 실행시 sequelize migrate가 자동으로 실행되게 설정
RUN sed -i'' -r -e "/t20211225123700/a\pushd /home/node-graphql-mysql-sequelize-template\nnpx sequelize db:migrate\npopd" /root/.bashrc

# 컨테이너 실행시 node-graphql-mysql-sequelize-template 이 자동으로 실행되게 설정
RUN sed -i'' -r -e "/t20211225123700/a\pushd /home/node-graphql-mysql-sequelize-template\npm2 start pm2.config.js\npopd" /root/.bashrc

# 컨테이너가 LISTEN 할 포트 지정
EXPOSE 3306
EXPOSE 8040

# home 경로로 이동
WORKDIR /home

# 컨테이너가 시작될 때마다 실행할 명령어(커맨드) 설정
CMD ["/bin/bash"]

