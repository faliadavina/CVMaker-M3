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
router.get('/users/:id_user', getUserById);
router.post('/users/:id_akun', createUser);
router.patch('/users/:id_user', updateUser);
router.delete('/users/:id_user', deleteUser);

export default router;

