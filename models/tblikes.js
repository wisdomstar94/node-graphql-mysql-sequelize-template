'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class TbLikes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
      // TbLikes 테이블의 tbusers_id 칼럼이, TbUsers 테이블의 id 칼럼을 참조하는 외래키로 설정된다.
      models.TbUsers.hasMany(models.TbLikes, { foreignKey: 'tbusers_id', sourceKey: 'id' });

      // TbLikes 테이블의 tbproducts_id 칼럼이, TbProducts 테이블의 id 칼럼을 참조하는 외래키로 설정된다.
      models.TbProducts.hasMany(models.TbLikes, { foreignKey: 'tbproducts_id', sourceKey: 'id' });
    }
  };
  TbLikes.init({
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      comment: 'pk 값',
    },
    tbusers_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      comment: 'TbUsers 테이블의 pk 값',
    },
    tbproducts_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      comment: 'TbProducts 테이블의 pk 값',
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      comment: '생성일',
    },
  }, {
    sequelize,
    modelName: 'TbLikes',
    tableName: 'TbLikes',
    updatedAt: false,
    createdAt: false,
    comment: '좋아요 정보 테이블',
  });
  return TbLikes;
};