import express from 'express';
import cors from 'cors';
import UsersRoute from './routes/UsersRoute.js';
import PendidikanRoute from './routes/PendidikanRoute.js';
import AkunRoute from './routes/AkunRoute.js';
import AuthRoute from './routes/AuthRoute.js';  // Correct import with correct casing
import Organisasi from './routes/OrganisasiRoute.js';

const app = express();
//middlewares
app.use(cors());
app.use(express.json());
app.use(UsersRoute);
app.use(PendidikanRoute);
app.use(AkunRoute);
app.use(AuthRoute);
app.use(Organisasi);

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});

