const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const cors = require('cors');
const helmet = require('helmet');
const csrf = require('tiny-csrf');
const dotenv = require('dotenv').config();

const conn = require('./config/db');

const view = require('./routes/ViewRoute');

conn();

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

//change http header to secure:
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", 'https://cdnjs.cloudflare.com', 'https://cdn.jsdelivr.net'], //accept script from self and cdnjs
            fontSrc: [
                "'self'",
                'https://fonts.googleapis.com',
                'https://fonts.gstatic.com',
                'https://cdnjs.cloudflare.com',
                'https://fonts.gstatic.com', //accept font from self, google and cdnjs
            ],
            scriptSrcAttr: ["'self'", 'https://cdnjs.cloudflare.com'],
            imgSrc: [
                "'self'",
                'https://preview.colorlib.com',
                'https://i.pinimg.com/',
                'https://encrypted-tbn0.gstatic.com',
                'https://i0.wp.com',
            ],
            connectSrc: ["'self'"],
        },
    }),
);

app.use(
    cors({
        origin: 'http://localhost:3001',
        credentials: true,
    }),
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SECRET_KEY));
app.use(express.static('public'));
// xss protected
app.use(
    session({
        secret: process.env.SECRET_KEY,
        cookie: {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 7,
            //covert to true if deploy
            secure: false,
        },
        resave: true,
        saveUninitialized: true,
    }),
);
// csrf protected
app.use(csrf('csrfarelikesnowbeautifulbutdead1', ['POST']));

app.use('/', view);

app.use((req, res, next) => {
    res.render('404', { pageTitle: 'Page Not Found' });
});
app.listen(8000, () => {
    console.log('Server is running on port 8000');
});
