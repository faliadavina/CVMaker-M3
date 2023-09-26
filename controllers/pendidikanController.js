import Pendidikan from "../models/pendidikanModel.js";

// Fungsi untuk memasukkan data pendidikan
export const insertPendidikan = async (req, res) => {
    try {
        const { id_user, jenjang, nama_sekolah, jurusan, tahun_masuk, tahun_lulus } = req.body;

        // Membuat data pendidikan baru dalam objek
        const newPendidikan =  await Pendidikan.create ({
            id_user,
            jenjang,
            nama_sekolah,
            jurusan,
            tahun_masuk,
            tahun_lulus
        });

        res.json(newPendidikan);
    } catch (err) {
        console.error(err);
        res.json({ error: "Internal server error" });
    }
};

export const getAllPendidikan = async (req, res) => {
    try {
        const allPendidikan = await Pendidikan.findAll();

        res.json(allPendidikan);
    } catch (err) {
        console.error(err);
        res.json({ error: "Internal server error" });
    }
};

export const getPendidikanById = async(req, res)=>{
    try {
    
        const pendidikan = await Pendidikan.findOne({
            where:{
                id_pend : req.params.id_pend
            }
        })

        res.json(pendidikan);
    } catch (error) {
        console.log(error.message);
    }
}

export const updatePendidikan = async (req, res) => {
    try {
        const { id_pend } = req.params;
        const { jenjang, nama_sekolah, jurusan, tahun_masuk, tahun_lulus } = req.body;

        const pendidikan = await Pendidikan.findOne({
            where: { id_pend }
        });

        if (!pendidikan) {
            return res.json({ error: 'Data tidak ditemukan' });
        }

        // Memperbarui data pendidikan
        pendidikan.jenjang = jenjang;
        pendidikan.nama_sekolah = nama_sekolah;
        pendidikan.jurusan = jurusan;
        pendidikan.tahun_masuk = tahun_masuk;
        pendidikan.tahun_lulus = tahun_lulus;

        // Menyimpan perubahan ke database
        await pendidikan.save();

        res.json(pendidikan);
    } catch (error) {
        console.error(error.message);
        res.json({ error: 'Internal server error' });
    }
};

export const deletePendidikan = async(req, res)=>{
    const pendidikan = await Pendidikan.findOne({
        where:{
            id_pend : req.params.id_pend
        }
    });
    if(!pendidikan) {
        res.json({error : "No Data Found"})
    }

    try {
        await Pendidikan.destroy({
            where:{
                id_pend : req.params.id_pend
            }
        });
        res.json({msg : "Deleted Successfuly"});

    } catch (error) {
        console.log(error.message);
    }
}
