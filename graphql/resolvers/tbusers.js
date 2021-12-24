const { TbUsers } = require('../../models');

/*
  Mutation 이 생성,수정,삭제(CUD) 기능을 했다면,
  Query 는 읽기(R)에 해당하는 기능을 한다.
*/
module.exports = {
  Mutation: {
    async createUser(root, args, context) {
      const { 
        userId,
        userAddr,
        userAge 
      } = args.input;
      return await TbUsers.create({ userId, userAddr, userAge });
    },
  },

  Query: {
    async getAllUsers(root, args, context) {
      return await TbUsers.findAll();
    },
    async getSingleUser(root, args, context) {
      const id = args.id;
      return await TbUsers.findByPk(id);
    },
  },
};