const bcrypt = require('bcrypt');

const salt = bcrypt.genSaltSync(10);

const hashPassword = async (pass) => {
    const hash = await bcrypt.hash(pass, salt);
    return hash;
};

const comparePassword = async (bodyPass, dbPass) => {
    return await bcrypt.compare(bodyPass, dbPass);
};

module.exports = {
    hashPassword,
    comparePassword,
};
