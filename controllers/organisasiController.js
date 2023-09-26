import Organisasi from "../models/organisasiModel.js";

// Fungsi untuk memasukkan data organisasi
export const insertOrganisasi = async (req, res) => {
  try {
    const { id_user, nama_organisasi, jabatan, periode, deskripsi_jabatan } = req.body;

    const newOrganisasi = await Organisasi.create({
      id_user,
      nama_organisasi,
      jabatan,
      periode,
      deskripsi_jabatan
    });

    res.json(newOrganisasi);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Fungsi untuk mengambil data organisasi berdasarkan ID
export const getOrganisasiById = async (req, res) => {
  try {
    const { id_organisasi } = req.params;

    const organisasi = await Organisasi.findByPk(id_organisasi);

    if (!organisasi) {
      return res.status(404).json({ error: 'Organisasi not found' });
    }

    res.json(organisasi);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Fungsi untuk mengupdate data organisasi
export const updateOrganisasi = async (req, res) => {
  try {
    const { id_organisasi } = req.params;
    const fieldsToUpdate = req.body;

    const organisasi = await Organisasi.findByPk(id_organisasi);

    if (!organisasi) {
      return res.status(404).json({ error: 'Organisasi not found' });
    }

    for (const field in fieldsToUpdate) {
      if (Object.prototype.hasOwnProperty.call(fieldsToUpdate, field)) {
        organisasi[field] = fieldsToUpdate[field];
      }
    }

    await organisasi.save();

    res.json(organisasi);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Fungsi untuk menghapus data organisasi
export const deleteOrganisasi = async (req, res) => {
  try {
    const { id_organisasi } = req.params;

    const organisasi = await Organisasi.findByPk(id_organisasi);

    if (!organisasi) {
      return res.status(404).json({ error: 'Organisasi not found' });
    }

    await organisasi.destroy();

    res.json({ message: 'Organisasi deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Patch (Update) Organisasi by ID
export const patchOrganisasi = async (req, res) => {
    try {
      const { id_organisasi } = req.params;
      const fieldsToUpdate = req.body;
  
      const organisasi = await Organisasi.findByPk(id_organisasi);
  
      if (!organisasi) {
        return res.status(404).json({ error: 'Organisasi not found' });
      }
  
      for (const field in fieldsToUpdate) {
        if (Object.prototype.hasOwnProperty.call(fieldsToUpdate, field)) {
          organisasi[field] = fieldsToUpdate[field];
        }
      }
  
      await organisasi.save();
  
      res.json(organisasi);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  