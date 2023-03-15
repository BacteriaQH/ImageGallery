const { v4: uuidv4 } = require('uuid');

const { createUser, findUserByName } = require('../service/user');
const { hashPassword, comparePassword } = require('../util/hash');
const { generateAccessToken, generateRefreshToken } = require('../util/jwt');

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
const LoginController = async (req, res) => {
    const { name, password } = req.body;
    const user = await findUserByName(name);

    if (user) {
        const isMatch = await comparePassword(password, user.password);
        if (isMatch) {
            console.log('Login success');
            const accessToken = generateAccessToken(user);
            const refreshToken = generateRefreshToken(user);
            res.cookie('refresh_token', refreshToken, {
                httpOnly: true,
                secure: false,
                sameSite: 'strict',
            });
            const { password, ...userWithoutPassword } = user;
            return res.status(200).json({ code: 200, user: userWithoutPassword, accessToken });
        } else {
            return res.status(200).json({ code: 400, message: 'Password is incorrect' });
        }
    } else {
        return res.status(200).json({ code: 403, message: 'Username not found' });
    }
};
module.exports = {
    RegisterController,
    LoginController,
};
