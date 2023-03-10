const getRegister = (req, res) => {
    res.render('register', {
        title: 'Register',
        csrfToken: req.csrfToken(),
        err: req.session?.err,
    });
};

const getLogin = (req, res) => {
    res.render('login', {
        title: 'Login',
        csrfToken: req.csrfToken(),
        error: req.session?.err,
    });
};
const getMainPage = (req, res) => {
    res.render('page/index', { title: 'Image Gallery' });
};

const getUserPage = (req, res) => {
    res.render('page/user', { title: 'User' });
};
module.exports = {
    getRegister,
    getLogin,
    getMainPage,
    getUserPage,
};
