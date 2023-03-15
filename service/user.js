const db = require('../models/index');
const createUser = async (user) => {
    try {
        const userS = await db.User.create(user);
        return userS;
    } catch (error) {
        console.log(error);
        return false;
    }
};

const findUserById = async (id) => {
    try {
        const userS = await db.User.findOne({ where: { id: id } });
        return userS;
    } catch (error) {
        console.log(error);
        return false;
    }
};
const findUserByName = async (username) => {
    try {
        const userS = await db.User.findOne({ where: { username: username } });
        return userS.dataValues;
    } catch (error) {
        console.log(error);
        return false;
    }
};
const getAllUser = async () => {
    try {
        const userS = await db.User.findAll();
        return userS;
    } catch (error) {
        console.log(error);
        return false;
    }
};
const deleteUser = async (id) => {
    try {
        const userS = await db.User.destroy({ where: { id: id } });
        return userS;
    } catch (error) {
        console.log(error);
        return false;
    }
};
module.exports = {
    createUser,
    findUserById,
    findUserByName,
    getAllUser,
    deleteUser,
};
