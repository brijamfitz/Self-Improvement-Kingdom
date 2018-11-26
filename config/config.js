module.exports = {
  "development": {
    "username": process.env.DB_username,
    "password": process.env.DB_password,
    "database": process.env.DB_name,
    "host": process.env.DB_host,
    "dialect": "mysql"
  },
  "test": { 
    "username": "root",
    "password": null,
    "port": 3306,
    "database": "project2db",
    "host": "localhost",
    "dialect": "mysql",
    "logging": false
  },
  "production": {
    "use_env_variable": "JAWSDB_URL",
    "dialect": "mysql"
    
  }
}