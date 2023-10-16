import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import UsersRoute from "./routes/UsersRoute.js";
import PendidikanRoute from "./routes/PendidikanRoute.js";
import OrganisaiRoute from "./routes/OrganisasiRoute.js";
import AkunRoute from "./routes/AkunRoute.js";
import SkillRoute from "./routes/SkillRoute.js";
import PortoRoute from "./routes/PortoRoutes.js";
import AuthRoute from "./routes/AuthRoute.js"; // Correct import with correct casing

const app = express();
//middlewares
app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000'
}));

app.use(express.json());
app.use(fileUpload());
app.use(express.static("public"));
app.use(UsersRoute);
app.use(PendidikanRoute);
app.use(OrganisaiRoute)
app.use(AkunRoute);
app.use(SkillRoute);
app.use(PortoRoute);
app.use(AuthRoute);

// Menyajikan file statis dari folder 'public'
app.use('/profilePict', express.static('public/profilePict'));

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
