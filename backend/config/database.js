import { Sequelize } from "sequelize";

const db = new Sequelize("cvmaker_db", "postgres", "1212", {
  host: "localhost",
  dialect: "postgres",
});

export default db;
