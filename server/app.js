const express = require('express');
const cors = require('cors');
const createError = require('http-errors');
const morgan = require('morgan');
require('dotenv').config();

const app = express();

app.use(cors({ origin: "https://hungry-swartz-c7a0a3.netlify.app" }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.get('/', async(req, res, next) => {
    res.send({ message: 'Awesome it works 🐻' });
});

app.use('/api', require('./routes/api.route'));

app.use((req, res, next) => {
    next(createError.NotFound());
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        status: err.status || 500,
        message: err.message,
    });
});

//Production ready for heroku
// if (process.env.NODE_ENV === "production") {
//     app.use(express.static('client/build'));
//     const path = require('path');
//     app.get('*', (req, res) => {
//         res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
//     })
// }

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`server is starting at port - ${PORT}`));