const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

// Take array of files and upload it on clouninary
// return -- path of uploaded files
const UploadFiles = async (files) => {
    return (
        await Promise.all(files.map(async file => {
            const buffer = await file.arrayBuffer();
            const byte = Buffer.from(buffer);

            return new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream({
                    resource_type: 'auto'
                }, (error, result) => {
                    if (error) {
                        console.error("Error uploading to Cloudinary:", error);
                        reject(error);
                    } else {
                        console.log("File uploaded to Cloudinary:", result.url);
                        resolve(result.url);
                    }
                }).end(byte);
            });
        })))
};

module.exports = UploadFiles