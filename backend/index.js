import express from "express";
import fileupload from "express-fileupload";
import cors from "cors";
import PortoRoutes from "./routes/PortoRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(fileupload());
app.use(express.static("public"));
app.use(PortoRoutes);

app.listen(5000, () => console.log('Server Up and Running..'));