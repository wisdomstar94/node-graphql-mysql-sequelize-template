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
      return await TbLikes.create({ 
        tbusers_id, 
        tbproducts_id, 
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
    async likes(root, args, context) {
      const where = {};
      if (typeof args?.input === 'object') {
        const keys = Object.keys(args?.input);
        for (const key of keys) {
          // 각 칼럼의 성격에 맞게 sequelize 조건 설정 가능
          switch (key) {
            case 'tbusers_id': where[key] = args?.input[key]; break;
            case 'tbproducts_id': where[key] = args?.input[key]; break;
          }
        }
      }

      return await TbLikes.findAll({
        where,
      });
    },
    async like(root, args, context) {
      const id = args.id;
      return await TbLikes.findByPk(id);
    },
  },
};