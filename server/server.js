import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import router from './routes/router.js'; // Assuming router.js is your router file


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200
};
app.use(cors(corsOptions));

app.use('/', router);

const PORT = 5000;
app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`) });
