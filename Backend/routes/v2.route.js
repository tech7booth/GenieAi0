const { Router } = require("express");
const multer = require("multer");
const cloudinary = require("../configs/cloudinary.config");
const botController = require("../controllers/bot.controller");
const { getUserInfo } = require("../controllers/user.controller");

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = Router()
router.post('/upload', upload.array('files', 10), async (req, res) => {
    try {
        const files = req.files;
        if (!files || files.length === 0) {
            return res.status(404).json(new ApiError(404, "nothing is here to upload."));
        }

        const uploadPromises = files.map(file => 
            cloudinary.uploader.upload(file.path)
        );

        const uploadResults = await Promise.all(uploadPromises);

        const urls = uploadResults.map(result => result.secure_url);

        res.status(200).json(new ApiResponse(200, "Uploaded successfully !", urls));
    } catch (error) {
        res.status(500).json(new ApiError(500, "An error occurred during the upload process."));
    }
});

router.get('/user-info', getUserInfo);


router.get('/agents', botController.getAgents);
router.get('/agent/:id', botController.getAgentInfo);
router.post('/agent', botController.createAgent);
router.put('/agent', botController.updateAgent);
router.delete('/agent', botController.deleteAgent);

module.exports = router;

