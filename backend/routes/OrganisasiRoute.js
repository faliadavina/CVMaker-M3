import express from "express";
import {
    deleteOrganisasi,
    getAllOrganisasi,
    getOrganisasiById,
    insertOrganisasi,
    updateOrganisasi
} from "../controllers/organisasiController.js";

const router = express.Router();

router.post('/organisasi/:id_akun', insertOrganisasi);
router.get('/organisasi/akun/:id_akun', getAllOrganisasi);
router.get('/organisasi/akun/:id_akun/organisasi/:id_org', getOrganisasiById);
router.put('/organisasi/:id_org', updateOrganisasi);
router.delete('/organisasi/:id_org', deleteOrganisasi);

export default router;
