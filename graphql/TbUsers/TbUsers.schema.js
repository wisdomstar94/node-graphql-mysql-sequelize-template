const { gql } = require('apollo-server-express');

/*
  Mutation 은 데이터를 생성, 수정, 삭제하는 기능
*/
const type = gql`
  scalar Date

  type TbUsers {
    id: Int!
    userId: String!
    userAddr: String!
    userAge: Int!
    createdAt: String!
  }

  input TbUserInput {
    userId: String
    userAddr: String
    userAge: Int
  }

  type TbUserInputResponse {
    userId: String!
    userAddr: String!
    userAge: Int!
    createdAt: Date
  }

  extend type Mutation {
    createUser(input: TbUserInput!): TbUserInputResponse
  }

  extend type Query {
    users(input: TbUserInput): [TbUsers]!
    user(id: Int!): TbUsers
  }
`;

module.exports = type;
