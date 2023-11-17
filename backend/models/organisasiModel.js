import { Sequelize } from 'sequelize';
import db from '../config/database.js';

const { DataTypes } = Sequelize;

const Organisasi = db.define('data_organisasi', {
    id_org: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_akun: {
        type: DataTypes.INTEGER,
        references: {
            model: 'data_akun', // Nama tabel yang direferensikan
            key: 'id_akun' // Kolom yang direferensikan
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
    periode_awal: {
        type: DataTypes.INTEGER, // Periode awal diubah menjadi integer sesuai tahun
        allowNull: false
    },
    periode_akhir: {
        type: DataTypes.STRING, // Ganti menjadi string jika memang harusnya string
        allowNull: true // Ubah ke true jika periode akhir bisa kosong
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

(async () => {
    await db.sync();
})();
