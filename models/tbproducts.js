'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class TbProducts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  TbProducts.init({
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      comment: 'pk 값',
    },
    productName: {
      type: DataTypes.STRING(100),
      allowNull: false,
      comment: '상품명',
    },
    productDescription: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: '상품 설명',
    },
    productPrice: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      comment: '상품 가격',
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      comment: '생성일',
    },
  }, {
    sequelize,
    modelName: 'TbProducts',
    tableName: 'TbProducts',
    updatedAt: false,
    createdAt: false,
    comment: '상품 테이블',
  });
  return TbProducts;
};