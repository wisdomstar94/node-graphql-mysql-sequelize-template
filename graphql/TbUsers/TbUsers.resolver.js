const { TbUsers } = require('../../models');
const { Op } = require('sequelize');

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
      return await TbUsers.create({ 
        userId, 
        userAddr, 
        userAge, 
        createdAt: (new Date()).getTime(),
        /*
          DB 의 Default 값인 CURRENT_TIMESTAMP 로 현재 시간이 들어갈 경우 
          반환되는 정보에서 Datetime 값을 가지고 오지 못하는 현상이 발생하여
          코드에서 Timestamp 값을 넣어주도록 변경함.
        */
      });
    },
  },

  Query: {
    async users(root, args, context) {
      const where = {};
      if (typeof args?.input === 'object') {
        const keys = Object.keys(args?.input);
        for (const key of keys) {
          // 각 칼럼의 성격에 맞게 sequelize 조건 설정 가능
          switch (key) {
            case 'userId': where[key] = { [Op.substring]: args?.input[key] }; break;
            case 'userAddr': where[key] = { [Op.substring]: args?.input[key] }; break;
            case 'userAge': where[key] = args?.input[key]; break;
          }
        }
      }

      return await TbUsers.findAll({
        where,
      });
    },
    async user(root, args, context) {
      const id = args.id;
      return await TbUsers.findByPk(id);
    },
  },
};