const { TbProducts } = require('../../models');

/*
  Mutation 이 생성,수정,삭제(CUD) 기능을 했다면,
  Query 는 읽기(R)에 해당하는 기능을 한다.
*/
module.exports = {
  Mutation: {
    async createProduct(root, args, context) {
      const { 
        productName,
        productDescription,
        productPrice 
      } = args.input;
      return await TbProducts.create({ productName, productDescription, productPrice });
    },
  },

  Query: {
    async getAllProducts(root, args, context) {
      return await TbProducts.findAll();
    },
    async getSingleUser(root, args, context) {
      const id = args.id;
      return await TbProducts.findByPk(id);
    },
  },
};