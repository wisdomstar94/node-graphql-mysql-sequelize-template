const { gql } = require('apollo-server-express');

const type = gql`
  scalar Date

  type TbLikes {
    id: Int!
    tbusers_id: Int!    
    tbproducts_id: Int!
    createdAt: String!
  }

  input TbLikeInput {
    tbusers_id: Int  
    tbproducts_id: Int
  }

  type TbLikeInputResponse {
    tbusers_id: Int!    
    tbproducts_id: Int!
    createdAt: Date!
  }

  extend type Mutation {
    createLike(input: TbLikeInput!): TbLikeInputResponse
  }

  extend type Query {
    likes(input: TbLikeInput): [TbLikes]!
    like(id: Int!): TbLikes
  }
`;

module.exports = type;
