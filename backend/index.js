import express from 'express';
import cors from 'cors';
import UsersRoute from './routes/UsersRoute.js';
import PendidikanRoute from './routes/PendidikanRoute.js';
import AkunRoute from './routes/AkunRoute.js';

const app = express();
//middleware
app.use(cors());
app.use(express.json());
app.use(UsersRoute);
app.use(PendidikanRoute);
app.use(AkunRoute);

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});

