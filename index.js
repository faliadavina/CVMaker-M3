import express from 'express';
import cors from 'cors';
import UsersRoute from './routes/UsersRoute.js';
import PendidikanRoute from './routes/PendidikanRoute.js';

const app = express();
//middlewares
app.use(cors());
app.use(express.json());
app.use(UsersRoute);
app.use(PendidikanRoute);

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});

