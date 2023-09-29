import Pendidikan from "../models/pendidikanModel.js";

// Fungsi untuk memasukkan data pendidikan
export const insertPendidikan = async (req, res) => {
    try {
        const { id_akun, jenjang, nama_sekolah, jurusan, tahun_masuk, tahun_lulus } = req.body;

        // Membuat data pendidikan baru dalam objek
        const pendidikan =  await Pendidikan.create ({
            id_akun,
            jenjang,
            nama_sekolah,
            jurusan,
            tahun_masuk,
            tahun_lulus
        });

        res.json(pendidikan);
    } catch (err) {
        console.error(err);
        res.json({ error: "Internal server error" });
    }
};

export const getAllPendidikan = async (req, res) => {
    try {
        const pendidikan = await Pendidikan.findAll();

        res.json({pendidikan});
    } catch (err) {
        console.error(err);
        res.json({ error: "Internal server error" });
    }
};

export const getPendidikanById = async(req, res)=>{
    const { id_pend } = req.params;

    try {
        const pendidikan = await Pendidikan.findOne({
            where:{
                id_pend : id_pend
            }
        })

        res.json({pendidikan});
    } catch (error) {
        console.log(error.message);
        res.json({ error: "Internal server error" });
    }
}

export const updatePendidikan = async (req, res) => {
    try {
      const { id_pend } = req.params;
      const fieldsToUpdate = req.body;
  
      const pendidikan = await Pendidikan.findOne({
        where: {
            id_pend: id_pend
        }
      });
  
      if (!pendidikan) {
        return res.status(404).json({ error: 'Pendidikan not found' });
      }
  
      // Update the specified fields
      for (const field in fieldsToUpdate) {
        if (Object.prototype.hasOwnProperty.call(fieldsToUpdate, field)) {
          // Update each specified field
          pendidikan[field] = fieldsToUpdate[field];
        }
      }
  
      // Save the updated skill to the database
      await pendidikan.save();
      return res.json(pendidikan);

    } catch (error) {
      console.error('Error in updatePendidikan:', error.message);  // Log the error message
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };

export const deletePendidikan = async (req, res) => {
  const { id_pend } = req.params;

  try {
    const pendidikan = await Pendidikan.findOne({
      where: {
        id_pend: id_pend,
      }
    });

    if (!pendidikan) {
      return res.status(404).json({ error: 'Pendidikan not found' });
    }

    await pendidikan.destroy();
    return res.json({ msg: 'Deleted Successfully' });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
};