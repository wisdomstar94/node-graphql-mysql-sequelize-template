'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class TbUsers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  TbUsers.init({
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      comment: 'pk 값',
    },
    userId: {
      type: DataTypes.STRING(50),
      unique: true,
      allowNull: false,
      comment: '회원 ID',
    },
    userAddr: {
      type: DataTypes.STRING(100),
      allowNull: false,
      comment: '회원 주소',
    },
    userAge: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      comment: '회원 나이',
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      comment: '생성일',
    },
  }, {
    sequelize,
    modelName: 'TbUsers',
    tableName: 'TbUsers',
    updatedAt: false,
    createdAt: false,
    comment: '회원 테이블',
  });
  return TbUsers;
};