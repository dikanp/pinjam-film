const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    jwtPrivateKey: process.env.jwtPrivateKey
};