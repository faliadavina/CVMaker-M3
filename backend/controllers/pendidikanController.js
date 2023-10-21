import Pendidikan from "../models/pendidikanModel.js";
import User from "../models/usersModel.js";

// Fungsi untuk memasukkan data pendidikan
export const insertPendidikan = async (req, res) => {
  try {
    const id_akun = req.params.id_akun;

    const { jenjang, nama_sekolah, jurusan, tahun_masuk, tahun_lulus } =
      req.body;

    const user = await User.findOne({
      where: {
        id_akun: id_akun,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Membuat data pendidikan baru dalam objek
    const newPendidikan = await Pendidikan.create({
      id_akun,
      jenjang,
      nama_sekolah,
      jurusan,
      tahun_masuk,
      tahun_lulus,
    });

    res.status(201).json(newPendidikan);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllPendidikan = async (req, res) => {
  try {
    const id_akun = req.params.id_akun;
    const pendidikan = await Pendidikan.findAll({
      where: {
        id_akun: id_akun,
      },
    });

    // Check if there are no skills for the specified user
    if (pendidikan.length === 0) {
      return res.status(404).json({ success: false, message: "No Pendidikan found" });
    }
    return res.status(200).json({ pendidikan: pendidikan });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getPendidikanById = async (req, res) => {
  try {
    const { id_akun, id_pend } = req.params;

    const pendidikan = await Pendidikan.findOne({
      where: {
        id_pend: id_pend,
        id_akun: id_akun,
      },
    });
    return res.status(200).json({ pendidikan: pendidikan });
  } catch (error) {
    console.log(error.message);
    res.json({ error: "Internal server error" });
  }
};

export const updatePendidikan = async (req, res) => {
  try {
    const { id_pend } = req.params;
    const fieldsToUpdate = req.body;

    const pendidikan = await Pendidikan.findOne({
      where: {
        id_pend: id_pend,
      },
    });

    if (!pendidikan) {
      return res.status(404).json({ error: "Pendidikan not found" });
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
    console.error("Error in updatePendidikan:", error.message); // Log the error message
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deletePendidikan = async (req, res) => {
  const { id_pend } = req.params;

  try {
    const pendidikan = await Pendidikan.findOne({
      where: {
        id_pend: id_pend,
      },
    });

    if (!pendidikan) {
      return res.status(404).json({ error: "Pendidikan not found" });
    }

    await pendidikan.destroy();
    return res.json({ msg: "Deleted Successfully" });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};
