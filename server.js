const express = require('express');
const dotenv = require('dotenv');
require('colors');
const morgan = require('morgan');
const connectDb = require('./config/db')
const path = require('path');

dotenv.config({path: './config/config.env'});

const app = express();

app.use(express.json());

connectDb();


if(process.env.NODE_ENV === 'development'){
  app.use(morgan('dev'));
}

const transactions = require('./routes/transactions');

app.use('/api/v1/transactions', transactions);

if(process.env.NODE_ENV == 'production'){
  app.use(express.static('client/build'));
  app.get('*', (req, res) => re.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
}

const PORT = process.env.PORT || 3000;

app.listen(PORT, _=> console.log(`Server listening on port ${PORT} in ${process.env.NODE_ENV} mode`.yellow.bold));