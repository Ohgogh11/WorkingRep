const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const loginRouter = require('./routes/loginRouter');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200
};
app.use(cors(corsOptions));

app.use('/api/login', loginRouter);

const PORT = 5000;
app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`) });
