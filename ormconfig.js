module.exports = {
  "type": "mysql",
  "host": "localhost",
  "port": 3306,
  "username": "root",
  "password": process.env.DB_PASSWORD,
  "database": "school",
  "synchronize": true,
  "entities": ["src/entity/*.ts"],
  "cli": {
    "entitiesDir": "src/entity"
  }
}
