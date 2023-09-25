import AkunDB from "../models/akunModels.js";

// Create user
export const createAkun = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        const newAkun = await AkunDB.create({
            username,
            email,
            password,
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


// Fungsi untuk memperbarui data pengguna berdasarkan user_id
export const updateAkun = async (req, res) => {
    try {
        const { id_akun } = req.params;
        const { username, email, password, role } = req.body;

        const akun = await AkunDB.findOne({
            where: { id_akun }
        });

        if (!akun) {
            return res.json({ error: 'Akun Pengguna tidak ditemukan' });
        }

        // Memperbarui data pengguna
        akun.username = username;
        akun.email = email;
        akun.password = password;
        akun.role = role;

        // Menyimpan perubahan ke database
        await akun.save();

        res.json(akun);
    } catch (error) {
        console.error(error.message);
        res.json({ error: 'Internal server error' });
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
