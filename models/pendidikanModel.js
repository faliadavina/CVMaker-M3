import { Sequelize } from 'sequelize';
import db from '../config/database.js'; 

const {DataTypes} = Sequelize;

const Pendidikan = db.define('data_pendidikan', {
    id_pend: {
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
    jenjang: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nama_sekolah: {
        type: DataTypes.STRING,
        allowNull: false
    },
    jurusan: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tahun_masuk: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    tahun_lulus: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, 
{
    timestamps: false,
    freezeTableName: true 
});

export default Pendidikan;

(async () => {
    await db.sync();
})();