const { v4: uuidv4 } = require('uuid');

const { createUser, findUserByName } = require('../service/user');
const { hashPassword } = require('../util/hash');

const RegisterController = async (req, res) => {
    const { username, password } = req.body;
    const user = await findUserByName(username);
    if (user) {
        req.session.err = 'Username already exists';
        return res.redirect('/register');
    } else {
        const id = uuidv4().toString().replaceAll('-', '');
        const hashPass = await hashPassword(password);
        const userS = await createUser({ id, username, password: hashPass, role: '2' });
        if (userS) {
            return res.redirect('/login');
        }
    }
};

module.exports = {
    RegisterController,
};
