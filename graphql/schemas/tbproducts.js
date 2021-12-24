const { gql } = require('apollo-server-express');

const type = gql`
  type TbProducts {
    id: Int!
    productName: String!
    productDescription: String!
    productPrice: Int!
    createdAt: String!
  }

  input TbProductInput {
    productName: String!
    productDescription: String!
    productPrice: Int!
  }

  type TbProductInputResponse {
    productName: String!
    productDescription: String!
    productPrice: Int!
    createdAt: String!
  }

  extend type Mutation {
    createProduct(input: TbProductInput!): TbProductInputResponse
  }

  extend type Query {
    getAllProducts: [TbProducts]!
    getSingleProduct(id: Int!): TbProducts
  }
`;

module.exports = type;
