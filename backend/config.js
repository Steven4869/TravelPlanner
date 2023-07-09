require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  database: {
    uri: 'mongodb://127.0.0.1:27017/travelplanner',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    }
  },
  jwtSecret: 'helloworld',
  accessTokenExpiry: process.env.JWT_ACCESS_TOKEN_EXPIRY || '15m',
  refreshTokenExpiry: process.env.JWT_REFRESH_TOKEN_EXPIRY || '7d',
  mailtrapUsername: '39cedffe1b0afd',
  mailtrapPassword: '898f5f593621e0',
};
