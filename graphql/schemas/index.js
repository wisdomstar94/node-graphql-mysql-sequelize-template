const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const { gql } = require('apollo-server-express');
const types = [];

const rootType = gql`
  type Query {
    root: String
  }
  type Mutation {
    root: String
  }
`;

types.push(rootType);

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const type = require(path.join(__dirname, file));
    types.push(type);
  });

module.exports = types;
