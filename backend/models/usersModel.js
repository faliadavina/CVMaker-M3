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
    type: DataTypes.STRING,
    allowNull: false,
  },
  profesi: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tempat_lahir: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tanggal_lahir: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  alamat: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  telp: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  sosial_media: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  twitter: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  linkedin: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  link_sosmed: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  link_twitter: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  deskripsi: {
    type : DataTypes.TEXT,
    allowNull: false
  },
  profile_pict: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  profile_title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  url: {
    type: DataTypes.STRING,
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