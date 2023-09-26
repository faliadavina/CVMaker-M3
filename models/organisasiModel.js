import { Sequelize } from 'sequelize';
import db from '../config/database.js';

const { DataTypes } = Sequelize;

const Organisasi = db.define('data_organisasi', {
    id_org: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_user: {
        type: DataTypes.INTEGER,
        references: {
            model: 'data_diri', // Nama tabel yang direferensikan
            key: 'id_user' // Kolom yang direferensikan
        }
    },
    nama_organisasi: {
        type: DataTypes.STRING,
        allowNull: false
    },
    jabatan: {
        type: DataTypes.STRING,
        allowNull: false
    },
    periode: {
        type: DataTypes.STRING,
        allowNull: false
    },
    deskripsi_jabatan: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, 
{
    timestamps: false,
    freezeTableName: true
});

export default Organisasi;
