const { gql } = require('apollo-server-express');

const type = gql`
  scalar Date

  type TbProducts {
    id: Int!
    productName: String!
    productDescription: String!
    productPrice: Int!
    createdAt: String!
  }

  input TbProductInput {
    productName: String
    productDescription: String
    productPrice: Int
  }

  type TbProductInputResponse {
    id: Int
    productName: String!
    productDescription: String!
    productPrice: Int!
    createdAt: Date
  }

  extend type Mutation {
    createProduct(input: TbProductInput!): TbProductInputResponse
  }

  extend type Query {
    products(input: TbProductInput): [TbProducts]!
    product(id: Int!): TbProducts
  }
`;

module.exports = type;
