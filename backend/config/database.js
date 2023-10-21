import { Sequelize } from "sequelize";

const db = new Sequelize("cvmaker_db", "postgres", "121212", {
  host: "localhost",
  dialect: "postgres",
});

export default db;
