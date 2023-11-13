import AkunDB from "../models/akunModels.js";
import bcrypt from 'bcryptjs';
//const md5 = require('md5');

// Create Akun
export const createAkun = async (req, res) => {
  const { username, email, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  
  try {
    // Mengonversi username yang dimasukkan ke huruf kecil
    const lowercaseUsername = username.toLowerCase();

    // Cek apakah username (dalam format huruf kecil) sudah ada dalam database
    const existingAkun = await AkunDB.findOne({
      where: {
        username: lowercaseUsername,
      },
    });

    if (existingAkun) {
      return res.status(400).json({ msg: "Username sudah terdaftar" });
    }

    // Jika username belum ada, buat akun baru
    await AkunDB.create({
      username: lowercaseUsername, // Simpan dalam format huruf kecil
      email,
      password: hashedPassword,
      role,
    });
    res.status(201).json({
      msg: 'Add user Berhasil',
      akun: {
        username: lowercaseUsername, // Simpan dalam format huruf kecil
        email,
        role
      }
    });
  } catch (error) {
    res.status(400).json({ msg: "Email sudah terdaftar" });
  }
}



export const getAllAkun = async (req, res) => {
  try {
    const allAkun = await AkunDB.findAll({
      where: {
        role: 2,
      },
    });

    return res.status(200).json({
      success: true,
      allAkun,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      error: error.message,
    });
  }
};


export const getAkunById = async (req, res) => {
    try {
        const akunById = await AkunDB.findOne({
            where: {
                id_akun: req.params.id_akun
            }
        });

        if (!akunById) {
            return res.status(404).json({
                success: false,
                message: 'Account not found for the given ID.'
            });
        }

        return res.status(200).json({
            success: true,
            akunById
        });
    } catch (error) {
        console.error('Error:', error.message);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};


export const updateAkun = async (req, res) => {
    try {
      const { id_akun } = req.params;
      const fieldsToUpdate = req.body;
  
      const akun = await AkunDB.findOne({
        where: {
          id_akun: id_akun
        }
      });
  
      if (!akun) {
        return res.status(404).json({ error: 'Account not found' });
      }
  
      // Update the specified fields
      for (const field in fieldsToUpdate) {
        if (Object.prototype.hasOwnProperty.call(fieldsToUpdate, field)) {
          // Update each specified field
          akun[field] = fieldsToUpdate[field];
        }
      }
  
      // Save the updated account to the database
      await akun.save();
      return res.json(akun);
    } catch (error) {
      console.error('Error in updateAccount:', error.message);  // Log the error message
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };


export const deleteAkun = async(req, res)=>{
    const akun = await AkunDB.findOne({
        where:{
            id_akun : req.params.id_akun
        }
    });
    if(!akun) {
        res.json({error : "Akun Pengguna tidak ditemukan"})
    }

    try {
        await AkunDB.destroy({
            where:{
                id_akun : req.params.id_akun
            }
        });
        res.json({msg : "User Deleted Successfuly"});

    } catch (error) {
        console.log(error.message);
    }
}
