const dotenv = require('dotenv');
const path = require('path');

dotenv.config({path: path.resolve(__dirname, `${process.env.NODE_ENV}.env`)});
module.exports = {
    NODE_ENV : 'development',
    DB_USERNAME : process.env.DB_USERNAME,
    DB_PASSWORD : process.env.DB_PASSWORD,
    HOST : 'localhost',
    PORT : 3000
}