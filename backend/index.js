import express from "express";
import cors from "cors";
import UsersRoute from "./routes/UsersRoute.js";
import PendidikanRoute from "./routes/PendidikanRoute.js";
import OrganisaiRoute from "./routes/OrganisasiRoute.js";
import AkunRoute from "./routes/AkunRoute.js";
import SkillRoute from "./routes/SkillRoute.js";
import AuthRoute from "./routes/AuthRoute.js"; // Correct import with correct casing
import PortoRoute from "./routes/PortoRoutes.js";
import FileUpload from "express-fileupload";

const app = express();
//middlewares
app.use(cors());
app.use(express.json());
app.use(FileUpload());
app.use(express.static("public"));
app.use(UsersRoute);
app.use(PendidikanRoute);
app.use(OrganisaiRoute)
app.use(AkunRoute);
app.use(SkillRoute);
app.use(AuthRoute);
app.use(PortoRoute);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
