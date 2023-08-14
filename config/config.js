const dotenv = require('dotenv')

result = dotenv.config()
if(result.error){
  throw result.error
}

module.exports = {
  "node":{
    "node_env": process.env.NODE_ENV,
    "secret": process.env.SECRET,
    "port": process.env.PORT,
    "host": process.env.HOST
  },
  "development": {
    "username": null,
    "password": null,
    "database": "sqlite:///db.sqlite",
    "host": "db.sqlite",
    "dialect": "sqlite"
  },
  "test": {
    "username": null,
    "password": null,
    "database": "sqlite:///:memory:",
    "host": null,
    "dialect": "sqlite"
  },
  "production": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PWD,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "dialect": process.env.DIALECT
  }
}
