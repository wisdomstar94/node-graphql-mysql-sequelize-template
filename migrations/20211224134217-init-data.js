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
