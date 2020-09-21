const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
//ROUTE FILES
const bootcamps = require('./routes/bootcamps');
//load env files
dotenv.config({ path: './config/config.env' });

const app = express();

//dev morgan logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//mount routers
app.use('/api/v1/bootcamps', bootcamps);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
