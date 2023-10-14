import express from "express";
import {
    getAllPorto,
    getPortoById,
    savePorto,
    updatePorto,
    deletePorto
} from "../controllers/PortoController.js";

const router = express.Router();

router.get('/porto', getAllPorto);
router.get('/porto/:id_akun', getPortoById);
router.post('/porto/:id_akun', savePorto);
router.patch('/porto/:id_porto', updatePorto);
router.delete('/porto/:id_porto', deletePorto);

export default router;