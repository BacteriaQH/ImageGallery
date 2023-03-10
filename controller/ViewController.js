const getRegister = (req, res) => {
    res.render('register', {
        title: 'Register',
        csrfToken: req.csrfToken(),
    });
};

const getLogin = (req, res) => {
    res.render('login', {
        title: 'Login',
        csrfToken: req.csrfToken(),
        error: '',
    });
};

module.exports = {
    getRegister,
    getLogin,
};
