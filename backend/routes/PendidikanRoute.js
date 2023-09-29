import express from "express";
<<<<<<< HEAD
import { insertPendidikan } from "../controllers/pendidikanController.js";

const router = express.Router();
router.post("/pendidikan", insertPendidikan);

export default router;
=======
import {
    insertPendidikan
} from "../controllers/pendidikanController.js";

const router = express.Router();
router.post('/pendidikan', insertPendidikan);

export default router;

>>>>>>> aini
