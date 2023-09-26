import express, { Router } from "express";
import {
    getPorto,
    getPortoById,
    savePorto,
    updatePorto,
    deletePorto
} from "../controllers/PortoController.js";

const router = express.Router();

router.get('/porto', getPorto);
router.get('/porto/:id_porto', getPortoById);
router.post('/porto/:id_akun', savePorto);
router.patch('/porto/:id_porto', updatePorto);
router.delete('/porto/:id_porto', deletePorto);

export default router;