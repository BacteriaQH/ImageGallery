const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        console.log(token);
        jwt.verify(token, process.env.JWT_PASSWORD, (err, user) => {
            if (err) {
                res.render('404', { title: 'Error', error: 'Error when access. Please login again', type: 403 });
            }
            req.user = user;
            next();
        });
    } else {
        res.redirect('/login');
    }
};

module.exports = verifyToken;
