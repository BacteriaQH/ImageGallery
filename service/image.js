const db = require('../models/index');

const createImage = async (image) => {
    try {
        const imageS = await db.Image.create(image);
        return imageS;
    } catch (error) {
        console.log(error);
        return false;
    }
};
