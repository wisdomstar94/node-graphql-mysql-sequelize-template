const { gql } = require('apollo-server-express');

const type = gql`
  type TbLikes {
    id: Int!
    tbusers_id: Int!    
    tbproducts_id: Int!
    createdAt: String!
  }

  input TbLikeInput {
    tbusers_id: Int!    
    tbproducts_id: Int!
  }

  type TbLikeInputResponse {
    tbusers_id: Int!    
    tbproducts_id: Int!
    createdAt: String!
  }

  extend type Mutation {
    createLike(input: TbLikeInput!): TbLikeInputResponse
  }

  extend type Query {
    getAllLikes: [TbLikes]!
    getSingleLike(id: Int!): TbLikes
  }
`;

module.exports = type;
