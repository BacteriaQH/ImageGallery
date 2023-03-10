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

module.exports = {
    getRegister,
    getLogin,
};
