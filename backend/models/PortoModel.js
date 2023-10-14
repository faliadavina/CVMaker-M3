import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Portofolio = db.define('data_portofolio', {
    id_porto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_akun: {
        type: DataTypes.INTEGER,
        references: {
            model: "data_akun",
            key: "id_akun"
        }
    },
    portofolio: {
        type: DataTypes.STRING,
        allowNull: false
    },
    deskripsi: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    freezeTableName: true,
    timestamps: false
});

export default Portofolio;

(async () => {
    await db.sync();
})();