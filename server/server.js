const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const loginRouter = require('./routes/loginRouter');
const path = require('path');
const signupRouter = require('./routes/signUpRouter');

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
app.use('/api/images',express.static(path.join(__dirname,'images'))); 

app.use('/api/signup', signupRouter);
const PORT = 5000;
app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`) });
