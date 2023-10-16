import { Sequelize } from "sequelize";

const db = new Sequelize("cvmaker_db", "postgres", "Sun26042001", {
  host: "localhost",
  dialect: "postgres",
});

export default db;
