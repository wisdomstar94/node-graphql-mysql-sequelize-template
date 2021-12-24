const { TbLikes } = require('../../models');

/*
  Mutation 이 생성,수정,삭제(CUD) 기능을 했다면,
  Query 는 읽기(R)에 해당하는 기능을 한다.
*/
module.exports = {
  Mutation: {
    async createLike(root, args, context) {
      const { 
        tbusers_id,
        tbproducts_id
      } = args.input;
      return await TbLikes.create({ tbusers_id, tbproducts_id });
    },
  },

  Query: {
    async getAllLikes(root, args, context) {
      return await TbLikes.findAll();
    },
    async getSingleLike(root, args, context) {
      const id = args.id;
      return await TbLikes.findByPk(id);
    },
  },
};