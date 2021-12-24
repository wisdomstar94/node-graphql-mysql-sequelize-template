const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const { gql } = require('apollo-server-express');
const typeDefs = [];
const resolvers = [];

// 최상단 Query 와 Mutation 선언
const rootType = gql`
  type Query {
    root: String
  }
  type Mutation {
    root: String
  }
`;
typeDefs.push(rootType);

fs
  .readdirSync(__dirname, { withFileTypes: true })
  .filter(file => {
    if (file.isDirectory()) {
      fs
        .readdirSync(path.join(__dirname, file.name))
        .filter(file2 => {
          return (file2.indexOf('.') !== 0) && (file2 !== basename) && (file2.slice(-3) === '.js');    
        })
        .forEach(file2 => {
          if (file2.includes('.schema.js')) {
            const typeDef = require(path.join(__dirname, file.name, file2));
            typeDefs.push(typeDef);
          } else if (file2.includes('.resolver.js')) {
            const resolver = require(path.join(__dirname, file.name, file2));
            resolvers.push(resolver);
          }
        });
    } else {
      return (file.name.indexOf('.') !== 0) && (file.name !== basename) && (file.name.slice(-3) === '.js');
    }  
  })
  .forEach(file => {
    if (file.name.includes('.schema.js')) {
      const typeDef = require(path.join(__dirname, file.name));
      typeDefs.push(typeDef);
    } else if (file.name.includes('.resolver.js')) {
      const resolver = require(path.join(__dirname, file.name));
      resolvers.push(resolver);
    }
  });

module.exports = {
  typeDefs: typeDefs,
  resolvers: resolvers,
};
