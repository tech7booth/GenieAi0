const express = require("express");
const cors = require('cors');
const cookieParser = require('cookie-parser');

const v1Routes = require('./routes/v1.route');
const v2Routes = require('./routes/v2.route');
const { decodeToken } = require("./middlewares/auth.middleware");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

const allowedOrigins = ['http://localhost:3000', 'https://genie-ai0.vercel.app'];

app.use(cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use('/api/v1', v1Routes);
app.use('/api/v2', decodeToken, v2Routes);

module.exports = app;
