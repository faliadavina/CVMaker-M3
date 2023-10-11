import { Sequelize } from 'sequelize';
import db from '../config/database.js'; 

const {DataTypes} = Sequelize;

const UserDB = db.define('data_diri', {
  id_user: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_akun: {
    type: DataTypes.INTEGER,
    references: {
        model: 'data_akun', // Nama tabel yang direferensikan
        key: 'id_akun' // Kolom yang direferensikan
    }
  },
  nama: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  tempat_lahir: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  tanggal_lahir: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  alamat: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  telp: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  sosial_media: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  linkedin: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  deskripsi: {
    type : DataTypes.TEXT,
    allowNull: false
  },
  profile_pict: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  profile_title: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  url: {
    type: DataTypes.STRING(255),
    allowNull: false,
  }
},
{
    timestamps: false,
    freezeTableName: true 
});

export default UserDB;

(async () => {
    await db.sync();
})();