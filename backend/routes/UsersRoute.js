import express from "express";
import {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
} from "../controllers/usersController.js";

const router = express.Router();
router.get('/users', getAllUsers);
router.get('/users/:id_akun', getUserById);
router.post('/users/:id_akun', createUser);
router.patch('/users/:id_akun', updateUser);
router.delete('/users/:id_akun', deleteUser);

export default router;

