import express from 'express';
import { login, protectedRoute, logout } from '../controllers/authController.js';
import { passport} from '../middlewares/passportMiddleware.js';

const router = express.Router();

// router.get('/akun', passport.authenticate('jwt', { session: false }), getAkun);
// router.post('/register', validationMiddleware, register);
router.post('/login', login);
router.get('/protected', passport.authenticate('jwt', { session: false }), protectedRoute);
router.get('/logout', passport.authenticate('jwt', { session: false }), logout);

  

export default router;
