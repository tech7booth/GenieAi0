const express = require("express");
const cors = require('cors');
const cookieParser = require('cookie-parser');


const v1Routes = require('./routes/v1.route');
const v2Routes = require('./routes/v2.route');
const {decodeToken} = require("./middlewares/auth.middleware");

const app = express();


app.use(express.json());
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(cookieParser())

app.use(cors({
    origin: ['http://localhost:3000', process.env.FRONTEND_URL, 'https://genie-ai0.vercel.app'], 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true // Allow cookies to be sent from the frontend
}))


app.use('/api/v1', v1Routes);
app.use('/api/v2', decodeToken, v2Routes);


module.exports = app;