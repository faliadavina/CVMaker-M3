import express from "express";
import {
    createAkun,
    getAllAkun,
    updateAkun,
    deleteAkun,
    getAkunById
} from "../controllers/akunController.js";

import { validationMiddleware} from '../middlewares/validationMiddleware.js';
import { passport} from '../middlewares/passportMiddleware.js';

const router = express.Router();
router.get('/akun', passport.authenticate('jwt', { session: false }), getAllAkun);
router.get('/akun/:id_akun', passport.authenticate('jwt', { session: false }), getAkunById);
router.post('/akun', validationMiddleware, createAkun);
router.patch('/akun/:id_akun', passport.authenticate('jwt', { session: false }), updateAkun);
router.delete('/akun/:id_akun',passport.authenticate('jwt', { session: false }),  deleteAkun);

export default router;

