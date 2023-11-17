import Organisasi from "../models/organisasiModel.js";
import User from "../models/usersModel.js";

// Fungsi untuk memasukkan data organisasi
export const insertOrganisasi = async (req, res) => {
  try {
    const id_akun = req.params.id_akun;

    const { nama_organisasi, jabatan, periode_awal, periode_akhir, deskripsi_jabatan } = req.body;

    const user = await User.findOne({
      where: {
        id_akun: id_akun,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Membuat data organisasi baru dalam objek
    const newOrganisasi = await Organisasi.create({
      id_akun,
      nama_organisasi,
      jabatan,
      periode_awal,
      periode_akhir,
      deskripsi_jabatan,
    });

    res.status(201).json(newOrganisasi);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllOrganisasi = async (req, res) => {
  try {
    const id_akun = req.params.id_akun;
    const organisasi = await Organisasi.findAll({
      where: {
        id_akun: id_akun,
      },
    });

    // Check if there are no organizations for the specified user
    if (organisasi.length === 0) {
      return res.status(404).json({ success: false, message: "No Organisasi found" });
    }
    return res.status(200).json({ organisasi: organisasi });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getOrganisasiById = async (req, res) => {
  try {
    const { id_akun, id_org } = req.params;

    const organisasi = await Organisasi.findOne({
      where: {
        id_org: id_org,
        id_akun: id_akun,
      },
    });
    return res.status(200).json({ organisasi: organisasi });
  } catch (error) {
    console.log(error.message);
    res.json({ error: "Internal server error" });
  }
};

export const updateOrganisasi = async (req, res) => {
  try {
    const { id_org } = req.params;
    const fieldsToUpdate = req.body;

    const organisasi = await Organisasi.findOne({
      where: {
        id_org: id_org,
      },
    });

    if (!organisasi) {
      return res.status(404).json({ error: "Organisasi not found" });
    }

    // Update the specified fields
    for (const field in fieldsToUpdate) {
      if (Object.prototype.hasOwnProperty.call(fieldsToUpdate, field)) {
        // Update each specified field
        organisasi[field] = fieldsToUpdate[field];
      }
    }

    // Save the updated organization to the database
    await organisasi.save();
    return res.json(organisasi);
  } catch (error) {
    console.error("Error in updateOrganisasi:", error.message); // Log the error message
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteOrganisasi = async (req, res) => {
  const { id_org } = req.params;

  try {
    const organisasi = await Organisasi.findOne({
      where: {
        id_org: id_org,
      },
    });

    if (!organisasi) {
      return res.status(404).json({ error: "Organisasi not found" });
    }

    await organisasi.destroy();
    return res.json({ msg: "Deleted Successfully" });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};
