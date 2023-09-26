import { Sequelize } from "sequelize";

const db = new Sequelize('cvmaker_db', 'postgres', 'falia123', {
    host: 'localhost',
    dialect: 'postgres'
});

export default db;