const { getDBURL } = require('./utils')

const { NODE_ENV } = process.env

if (NODE_ENV !== 'production') {
  require('dotenv').config()
}

module.exports = {
  APP_PORT: process.env.APP_PORT || 9000,
  DB_DIALECT: process.env.DB_DIALECT || 'sqlite',
  DB_URL: getDBURL(),
  DB_SYNC: Boolean(Number(process.env.DB_SYNC || 1)),
}
