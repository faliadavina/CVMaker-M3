import { Sequelize } from "sequelize";

const db = new Sequelize("cvmaker_db", "postgres", "dea", {
  host: "localhost",
  dialect: "postgres",
});

export default db;
