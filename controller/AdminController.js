const { findUserByName, getAllUser, deleteUser, updateUserToAdmin } = require('../service/user');
const { comparePassword } = require('../util/hash');
const { generateAccessToken, generateRefreshToken } = require('../util/jwt');

const AuthAdminController = {
    get: (req, res) => {
        const err = req.session?.err;
        res.render('admin/login', { title: 'Auth', path: '/admin', csrfToken: req.csrfToken(), error: err });
    },
    post: async (req, res) => {
        const { username, password, _csrf } = req.body;
        console.log(req.body);
        const user = await findUserByName(username);

        if (user) {
            const isMatch = await comparePassword(password, user.password);
            if (isMatch && user.role === '1') {
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
                return res.redirect('/admin/user');
            } else if (isMatch && user.role !== '1') {
                console.log('User is not admin');
                req.session.err = 'You are not allow';
                return res.redirect('/admin/login');
            } else {
                console.log('Wrong password');
                req.session.err = 'Wrong password';
                return res.redirect('/admin/login');
            }
        } else {
            console.log('User not found');
            req.session.err = 'User not found';
            return res.redirect('/admin/login');
        }
    },
};

const AnalyticsController = (req, res) => {
    res.render('admin/index', { title: 'Analytics', path: '/admin' });
};
const ManageUserController = {
    getAll: async (req, res) => {
        const myId = req.session.user?.id;
        const user = await getAllUser();
        const users = user.filter((u) => u.id !== myId);
        res.render('admin/user', {
            title: 'Manage Users',
            path: '/admin/user/all',
            users: users,
            csrfToken: req.csrfToken(),
        });
    },
    delete: async (req, res) => {
        console.log("delete id: ", req.body.id);
        const userD = await deleteUser(req.body.id);
        if (userD) {
            return res.status(200).json({message: 'ok'})
        }
    },
    promote: async (req, res) => {
        const userD = await updateUserToAdmin(req.body.id);
        if (userD) {
            return res.status(200).json({message: 'ok'})
        }
    },
};
module.exports = {
    AnalyticsController,
    ManageUserController,
    AuthAdminController,
};
