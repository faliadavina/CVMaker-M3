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
