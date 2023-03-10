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
    const { username, password } = req.body;
    const user = await findUserByName(username);

    if (user) {
        const isMatch = await comparePassword(password, user.password);
        if (isMatch) {
            console.log('Login success');
            const accessToken = generateAccessToken(user);
            const refreshToken = generateRefreshToken(user);
            res.cookie('refresh_token', refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
            });
            req.session.user = {
                id: user.id,
                username: user.username,
                role: user.role,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
                accessToken,
            };
            req.session.save();
            return res.redirect('/');
        } else {
            console.log('Wrong password');
            req.session.err = 'Wrong password';
            return res.redirect('/login');
        }
    } else {
        console.log('User not found');
        req.session.err = 'User not found';
        return res.redirect('/login');
    }
};
module.exports = {
    RegisterController,
    LoginController,
};
