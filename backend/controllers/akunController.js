import AkunDB from "../models/akunModels.js";
import md5 from "md5";
//const md5 = require('md5');

// Create Akun
export const createAkun = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;
        const hashed_pass = md5(password);

        const newAkun = await AkunDB.create({
            username,
            email,
            password: hashed_pass,
            role
        });

        res.json(newAkun);
    } catch (err) {
        console.error(err);
        res.json({ error: "Internal server error" });
    }
}


export const getAllAkun = async (req, res) => {
    try {
        const allAkun = await AkunDB.findAll();

        res.json(allAkun);
    } catch (err) {
        console.error(err);
        res.json({ error: "Internal server error" });
    }
};


export const getAkunById = async(req, res)=>{
    try {
    
        const akunById = await AkunDB.findOne({
            where:{
                id_akun : req.params.id_akun
            }
        })

        res.json(akunById);
    } catch (error) {
        console.log(error.message);
    }
}

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

// Fungsi untuk memperbarui data pengguna berdasarkan user_id
// export const updateAkun = async (req, res) => {
//     try {
//         const { id_akun } = req.params;
//         const { username, email, password, role } = req.body;

//         const akun = await AkunDB.findOne({
//             where: { id_akun }
//         });

//         if (!akun) {
//             return res.json({ error: 'Akun Pengguna tidak ditemukan' });
//         }

//         // Memperbarui data pengguna
//         akun.username = username;
//         akun.email = email;
//         akun.password = password;
//         akun.role = role;

//         // Menyimpan perubahan ke database
//         await akun.save();

//         res.json(akun);
//     } catch (error) {
//         console.error(error.message);
//         res.json({ error: 'Internal server error' });
//     }
// };


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
