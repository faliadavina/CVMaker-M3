import { Sequelize } from "sequelize";

<<<<<<< HEAD
const db = new Sequelize('cvmaker_db', 'postgres', '121212', {
  host: 'localhost',
  dialect: 'postgres',
=======
const db = new Sequelize("cvmaker_db", "postgres", "dea", {
  host: "localhost",
  dialect: "postgres",
>>>>>>> 3f0229e59ceca61db848de2c5b1005e017bed303
});

export default db;
