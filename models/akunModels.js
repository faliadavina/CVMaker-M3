import { Sequelize } from 'sequelize';
import db from '../config/database.js'; 

const {DataTypes} = Sequelize;

const AkunDB = db.define('data_akun', {
  id_akun: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  role: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
},
{
    timestamps: false,
    freezeTableName: true 
});

// Synchronize the model with the database
const syncDatabase = async () => {
  try {
    await db.sync({ alter: true }); // Use alter: true to apply any pending changes without dropping data
    console.log('Database synchronized successfully.');
  } catch (error) {
    console.error('Error synchronizing database:', error);
  }
};

syncDatabase();

export default AkunDB;

