// npm packages
const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
require('dotenv').config();

// middlewares
const errorHandler = require('./middlewares/errorHandler');

// sequelize
const sequelize = require('./models').sequelize;
sequelize.sync();

// express
const app = express();

// api routers 


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
