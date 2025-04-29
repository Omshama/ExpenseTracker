const express = require("express");
const{protect}=require('../middleware/authMiddleware');

const{
    registerUser,
    loginUser,
    getUserInfo,
}=require("../controllers/authController");
const upload=require("../middleware/uploadMiddleware");

const router=express.Router();

router.post("/register",registerUser);

router.post("/login",loginUser);

router.get("/getUser",protect,getUserInfo);

router.post("/upload-image", upload.single("image"), (req, res) => {
    console.log("Received upload request");  // Log when the upload request is received

    if (!req.file) {
        console.log("No file uploaded");  // Log if no file is uploaded
        return res.status(400).json({
            message: "No File Uploaded"
        });
    }

    console.log("File uploaded:", req.file);  // Log file details

    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    console.log("Image URL generated:", imageUrl);  // Log the image URL being sent in the response

    res.status(200).json({
        imageUrl
    });
});

module.exports=router;
