'use strict';
const db = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    if (!(await db.isExistTable('TbUsers'))) {
      await queryInterface.createTable('TbUsers', {
        id: {
          type: Sequelize.INTEGER.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
          comment: 'pk 값',
        },
        userId: {
          type: Sequelize.STRING(50),
          unique: true,
          allowNull: false,
          comment: '회원 ID',
        },
        userAddr: {
          type: Sequelize.STRING(100),
          allowNull: false,
          comment: '회원 주소',
        },
        userAge: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
          comment: '회원 나이',
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
          comment: '생성일',
        },
      }, {
        Sequelize,
        modelName: 'TbUsers',
        tableName: 'TbUsers',
        updatedAt: false,
        createdAt: false,
        comment: '회원 테이블',
      });
    }

    if (!(await db.isExistTable('TbProducts'))) {
      await queryInterface.createTable('TbProducts', {
        id: {
          type: Sequelize.INTEGER.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
          comment: 'pk 값',
        },
        productName: {
          type: Sequelize.STRING(100),
          allowNull: false,
          comment: '상품명',
        },
        productDescription: {
          type: Sequelize.TEXT,
          allowNull: true,
          comment: '상품 설명',
        },
        productPrice: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
          comment: '상품 가격',
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
          comment: '생성일',
        },
      }, {
        Sequelize,
        modelName: 'TbProducts',
        tableName: 'TbProducts',
        updatedAt: false,
        createdAt: false,
        comment: '상품 테이블',
      });
    }

    if (!(await db.isExistTable('TbLikes'))) {
      await queryInterface.createTable('TbLikes',{
        id: {
          type: Sequelize.INTEGER.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
          comment: 'pk 값',
        },
        tbusers_id: {
          type: Sequelize.INTEGER.UNSIGNED,
          comment: 'TbUsers 테이블의 pk 값',
        },
        tbproducts_id: {
          type: Sequelize.INTEGER.UNSIGNED,
          comment: 'TbProducts 테이블의 pk 값',
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
          comment: '생성일',
        },
      }, {
        Sequelize,
        modelName: 'TbLikes',
        tableName: 'TbLikes',
        updatedAt: false,
        createdAt: false,
        comment: '좋아요 정보 테이블',
      });
    }

    await db.TbUsers.bulkCreate([
      { userId: 'test1', userAddr: '서울시 강남구', userAge: 23 }, // 1
      { userId: 'test2', userAddr: '청주시 상당구', userAge: 38 }, // 2
      { userId: 'test3', userAddr: '공주시 금성동', userAge: 44 }, // 3
      { userId: 'test4', userAddr: '경북 고령군', userAge: 17 }, // 4
    ]);

    await db.TbProducts.bulkCreate([
      { productName: '가방', productDescription: '최고급 가방', productPrice: 23000 }, // 1
      { productName: '모자', productDescription: '최고급 모자', productPrice: 17500 }, // 2
      { productName: '신발', productPrice: 55000 }, // 3
    ]);

    await db.TbLikes.bulkCreate([
      { tbusers_id: 1, tbproducts_id: 1 }, // 1
      { tbusers_id: 1, tbproducts_id: 2 }, // 2
      { tbusers_id: 1, tbproducts_id: 3 }, // 3
      { tbusers_id: 2, tbproducts_id: 2 }, // 4
      { tbusers_id: 2, tbproducts_id: 3 }, // 5
      { tbusers_id: 3, tbproducts_id: 1 }, // 6
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
