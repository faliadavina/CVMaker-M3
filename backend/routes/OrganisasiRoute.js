import express from "express";

import {
  insertOrganisasi,
  getOrganisasiById,
  updateOrganisasi,
  deleteOrganisasi,
  patchOrganisasi,
  getOrganisasiByAkunId, // Import fungsi getOrganisasiByAkunId
} from "../controllers/organisasiController.js";

const router = express.Router();

// Rute untuk menambahkan data organisasi
router.post("/organisasi", insertOrganisasi);

// Rute untuk mendapatkan data organisasi berdasarkan ID
router.get("/organisasi/:id_organisasi", getOrganisasiById);

// Rute untuk mengupdate data organisasi berdasarkan ID
router.put("/organisasi/:id_organisasi", updateOrganisasi);

// Rute untuk menghapus data organisasi berdasarkan ID
router.delete("/organisasi/:id_organisasi", deleteOrganisasi);

// Rute untuk melakukan patch (update sebagian) data organisasi berdasarkan ID
router.patch("/organisasi/:id_organisasi", patchOrganisasi);

// Rute baru untuk mengambil data organisasi berdasarkan id_akun
router.get("/organisasi-by-id-akun/:id_akun", getOrganisasiByAkunId);

export default router;
