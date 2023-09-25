import UserDB from "../models/usersModel.js";
import AkunDB from "../models/akunModels.js";

// Create user
export const createUser = async (req, res) => {
    try {
        const { nama, tempat_lahir, tanggal_lahir, alamat, status, telp, sosial_media, linkedin } = req.body;
        const { id_akun } = req.params;
        const userAccountById = await AkunDB.findOne({
            where:{
                id_akun : id_akun
            }
        })
        const email = userAccountById.email;

        const newUser = await UserDB.create({
            id_akun,
            nama,
            tempat_lahir,
            tanggal_lahir,
            alamat,
            status,
            telp,
            email,
            sosial_media,
            linkedin
        });

        res.json(newUser);
    } catch (err) {
        console.error(err);
        res.json({ error: "Internal server error" });
    }
}


export const getAllUsers = async (req, res) => {
    try {
        const allUsers = await UserDB.findAll();

        res.json(allUsers);
    } catch (err) {
        console.error(err);
        res.json({ error: "Internal server error" });
    }
};

export const getUserById = async(req, res)=>{
    try {
    
        const userById = await UserDB.findOne({
            where:{
                id_user : req.params.id_user
            }
        })

        res.json(userById);
    } catch (error) {
        console.log(error.message);
    }
}


// Fungsi untuk memperbarui data pengguna berdasarkan user_id
export const updateUser = async (req, res) => {
    try {
        const { id_user } = req.params;
        const { nama, tempat_lahir, tanggal_lahir, alamat, status, telp, email, sosial_media, linkedin } = req.body;

        const user = await UserDB.findOne({
            where: { id_user }
        });

        if (!user) {
            return res.json({ error: 'Pengguna tidak ditemukan' });
        }

        // Memperbarui data pengguna
        user.nama = nama;
        user.tempat_lahir = tempat_lahir;
        user.tanggal_lahir = tanggal_lahir;
        user.alamat = alamat;
        user.status = status;
        user.telp = telp;
        user.email = email;
        user.sosial_media = sosial_media;
        user.linkedin = linkedin;

        // Menyimpan perubahan ke database
        await user.save();

        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.json({ error: 'Internal server error' });
    }
};


export const deleteUser = async(req, res)=>{
    const user = await UserDB.findOne({
        where:{
            id_user : req.params.id_user
        }
    });
    if(!user) {
        res.json({error : "No Data Found"})
    }

    try {
        await UserDB.destroy({
            where:{
                id_user : req.params.id_user
            }
        });
        res.json({msg : "User Deleted Successfuly"});

    } catch (error) {
        console.log(error.message);
    }
}
