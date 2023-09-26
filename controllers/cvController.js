import DataOrganisasi from "../models/dataOrganisasiModel.js";
import DataPendidikan from "../models/dataPendidikanModel.js";
import DataAkun from "../models/dataAkunModel.js";
import DataSkill from "../models/dataSkillModel.js";
import DataDiri from "../models/dataDiriModel.js";

export const getData = async (req, res) => {
  try {
    // Dapatkan data dari berbagai tabel
    const dataOrganisasi = await DataOrganisasi.findAll();
    const dataPendidikan = await DataPendidikan.findAll();
    const dataAkun = await DataAkun.findAll();
    const dataSkill = await DataSkill.findAll();
    const dataDiri = await DataDiri.findAll();

    // Gabungkan data dari semua tabel ke dalam sebuah objek atau array jika sesuai
    const responseData = {
      dataOrganisasi,
      dataPendidikan,
      dataAkun,
      dataSkill,
      dataDiri,
    };

    res.json(responseData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
