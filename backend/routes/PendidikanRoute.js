import express from "express";
import { insertPendidikan } from "../controllers/pendidikanController.js";

const router = express.Router();
router.post("/pendidikan", insertPendidikan);

export default router;
