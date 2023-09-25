import express from "express";
import {
    deletePendidikan,
    getAllPendidikan,
    getPendidikanById,
    insertPendidikan
} from "../controllers/pendidikanController.js";

const router = express.Router();
router.post('/pendidikan', insertPendidikan);
router.get('/pendidikan', getAllPendidikan)
router.get('/pendidikan/:id_pend', getPendidikanById)
router.delete('/pendidikan/:id_pend', deletePendidikan)

export default router;

