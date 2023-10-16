import express from "express";
import {
    deletePendidikan,
    getAllPendidikan,
    getPendidikanById,
    insertPendidikan,
    updatePendidikan
} from "../controllers/pendidikanController.js";

const router = express.Router();
router.post('/pendidikan/:id_akun', insertPendidikan);
router.get('/pendidikan/akun/:id_akun', getAllPendidikan);
router.get('/pendidikan/akun/:id_akun/pendidikan/:id_pend', getPendidikanById);
router.patch('/pendidikan/:id_pend', updatePendidikan);
router.delete('/pendidikan/:id_pend', deletePendidikan);

export default router;