module.exports = {
  "development": {
    "username": process.env.DB_username,
    "password": process.env.DB_password,
    "port": process.env.DB_port,
    "database": process.env.DB_name,
    "host": "localhost",
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