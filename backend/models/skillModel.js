import { Sequelize } from 'sequelize';
import db from '../config/database.js'; 

const {DataTypes} = Sequelize;

const Skill = db.define('data_skill', {
  id_skill: {
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
  kategori_skill: {
    type: 'kategori',
    allowNull: false,
  },
  nama_skill: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  level: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

},
{
    timestamps: false,
    freezeTableName: true 
});

export default Skill;

(async () => {
    await db.sync();
})();