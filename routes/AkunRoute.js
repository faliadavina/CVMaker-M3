import express from "express";
import {
    createAkun,
    getAllAkun,
    updateAkun,
    deleteAkun,
    getAkunById
} from "../controllers/akunController.js";

const router = express.Router();
router.get('/akun', getAllAkun);
router.get('/akun/:id_akun', getAkunById);
router.post('/akun', createAkun);
router.patch('/akun/:id_akun', updateAkun);
router.delete('/akun/:id_akun', deleteAkun);

export default router;

