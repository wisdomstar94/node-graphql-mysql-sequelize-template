'use strict';

// npm 패키지 불러오기
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const { Sequelize, QueryTypes, Op } = require('sequelize');

// db용 config 파일 내용 불러오기
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];

// db 오브젝트 선언
const db = {};

// sequelize 에서 database에 연결
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// sequelize 모델 파일을 읽어 온 뒤 db 오브젝트에 삽입
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// db 오브젝트에 삽입된 sequelize 모델별로 associate 함수 호출
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// db 오브젝트에 db connection 정보가 담긴 sequelize 와 Sequelize 객체 삽입
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// 공통으로 사용할 함수 선언
db.isExistTable = async(tableName) => {
  const result = await sequelize.query(`
      SHOW TABLES IN ${process.env.MAIN_DB_DEFAULT_DATABASE} LIKE ${sequelize.escape(tableName)};
    `, { 
      type: QueryTypes.SELECT 
    }
  );

  if (result.length > 0) {
    return true;
  } else {
    return false;
  }
};

// db 오브젝트를 모듈로써 내보내기
module.exports = db;
