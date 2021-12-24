// npm packages
const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const { ApolloServer } = require('apollo-server-express');
require('dotenv').config();

// graphql files
// const typeDefs = require('./graphql/schemas');
// const resolvers = require('./graphql/resolvers');
// const context = require('./graphql/context');

const graphqls = require('./graphql/index');
const context = require('./graphql/context');

// middlewares
const errorHandler = require('./middlewares/errorHandler');

// sequelize
const sequelize = require('./models').sequelize;
sequelize.sync();

(async() => {
  // express
  const app = express();
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ extended: false, limit: '50mb' }));
  app.use(express.raw());
  app.use(express.text());
  app.use(cookieParser());

  // apollo server
  const apolloServer = new ApolloServer({
    typeDefs: graphqls.typeDefs,
    resolvers: graphqls.resolvers,
    context,
    introspection: true,
    playground: {
      settings: {
        'schema.polling.enable': false,
      },
    },
    formatError: (err) => {
      if (err.message.startsWith('Database Error: ')) {
        return new Error('Internal server error');
      }
      console.error('err', err);
      console.error('err.extensions', err.extensions);
      err.message = undefined; // 테이블명 노출 되지 않도록 처리
      err.extensions.exception = undefined; // 파일 경로 및 에러 stack 이 노출 되지 않도록 처리
      return err;
    },
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ 
    app, 
    path: '/api', 
  });

  // rest api routers 
  // ...

  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    next(createError(404));
  });

  // catch error handler
  app.use(errorHandler);

  // listen
  app.listen(process.env.PORT, function(){
    console.log(`${process.env.PORT}번 포트에서 대기중...`);
  });
})();
