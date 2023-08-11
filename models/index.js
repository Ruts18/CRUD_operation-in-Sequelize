const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = new Sequelize("Student_data", "root", "MySQLRoot@123", {
  host: "localhost",
  dialect:
    "mysql" /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */,
});

try {
  sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Sync the both tables at once
db.sequelize.sync();
// Initialize User and Contact models and add them to the db object
db.User = require("./user")(sequelize, DataTypes, Model);
db.Contact = require("./contact")(sequelize, DataTypes, Model);

module.exports = db;
