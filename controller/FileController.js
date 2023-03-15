const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');
const { Readable } = require('stream');
const { generateRandomString } = require('../util/random');

const DRIVE_CLIENT_ID = process.env.DRIVE_CLIENT_ID;
const DRIVE_CLIENT_SECRET_CODE = process.env.DRIVE_CLIENT_SECRET_CODE;
const DRIVE_REDIRECT_URI = process.env.DRIVE_REDIRECT_URI;
const DRIVE_REFRESH_TOKEN = process.env.DRIVE_REFRESH_TOKEN;
const DRIVE_FOLDER_ID = process.env.DRIVE_FOLDER_ID;

const oauth2Client = new google.auth.OAuth2(DRIVE_CLIENT_ID, DRIVE_CLIENT_SECRET_CODE, DRIVE_REDIRECT_URI);
oauth2Client.setCredentials({ refresh_token: DRIVE_REFRESH_TOKEN });

const drive = google.drive({ version: 'v3', auth: oauth2Client });

const CreateFolderController = async (req, res) => {
    const { name } = req.body;
    console.log(req.body);
    try {
        const folder = await drive.files.create({
            requestBody: {
                name: name,
                mimeType: 'application/vnd.google-apps.folder',
            },
            fields: 'id',
        });
        console.log('Folder Id:', folder.data.id);
        return res.status(200).json({ message: 'OK', folder_id: folder.data.id });
    } catch (err) {
        throw err;
    }
};
const UploadFileController = async (req, res) => {
    const file = req.files.file;
    const filename = file.name;
    const baseName = filename.split('.')[0];
    const fileExt = filename.split('.')[1];
    const fileName = `${baseName}_${generateRandomString(10)}.${fileExt}`.replaceAll(' ', '_').replaceAll('-', '_');
    try {
        const fileS = await drive.files.create({
            requestBody: {
                name: fileName,
                parents: [DRIVE_FOLDER_ID],
            },
            media: {
                mimeType: file.mimetype,
                body: Readable.from(file.data),
            },
            fields: 'id',
        });
        console.log('File:', fileS.data);
        await drive.permissions.create({
            fileId: fileS.data.id,
            requestBody: {
                role: 'reader',
                type: 'anyone',
            },
        });
        return res.status(200).json({
            message: 'OK',
            file_id: fileS.data.id,
            publicLink: `http://drive.google.com/uc?export=view&id=${fileS.data.id}`,
        });
    } catch (err) {
        throw err;
    }
};

const DeleteFileController = async (req, res) => {
    const fileId = req.body.fileId;
    try {
        const fileD = await drive.files.delete({
            fileId: fileId,
        });
        console.log(fileD.data, fileD.status);
        return res.status(200).json({ message: 'OK' });
    } catch (error) {
        throw error;
    }
};

module.exports = {
    CreateFolderController,
    UploadFileController,
    DeleteFileController,
};
