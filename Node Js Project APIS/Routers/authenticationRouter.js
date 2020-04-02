const express = require("express");
const authenticationRouter = express.Router();
let path = require("path");
const bcrypt = require('bcrypt');
var multer = require('multer');
//Fetch Database Speakers
let mongoose = require("mongoose");
require("./../Models/speakerModel");
let speakers = mongoose.model("speaker");
//Express Validator
const { check, validationResult } = require('express-validator');
const storage = multer.diskStorage({
    destination: "D:\\ITI\\23-React\\myproject\\public\\images",
    filename: function (req, file, cb) {
        cb(null, "IMAGE-" + Date.now() + path.extname(file.originalname));
    }
});
//Handle The Upload Function
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },
})
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
// ===================================================
// ==================== Routers =======================
//Post Login Validation
authenticationRouter.post("/login", (request, response) => {
    if (request.body.username == "eslam" && request.body.password == "123") {
        user = { username: "eslam", password: "123" };
        const accessToken = generateAccessToken("0");
        response.json({
            token : accessToken,
            user: {
                id: "0",
                fullName: "Eslam Elkholy",
                image: "1.jpg",
                role: "admin"
            }
        });
    }
    else {
        speakers.findOne({ username: request.body.username }).then((speaker) => {
            if (speaker) {
                // Validate Password
                bcrypt.compare(request.body.password, speaker.password)
                    .then(isMatch => {
                        if (!isMatch)
                            return response.send("None");

                        let token = generateAccessToken(speaker.id);
                        response.json({
                            token,
                            user: {
                                id: speaker.id,
                                fullName: speaker.fullName,
                                image: speaker.image,
                                role: "speaker"
                            }
                        });
                    })
            }
            else
                return response.send("None")
        }).catch((err) => {
            console.log(err);
        });
    }
});
authenticationRouter.post("/validateUser", auth, (request, response) => {
    speakers.findOne({ _id: request.user.id }).then((speaker) => {
        if (speaker) {
            if (speaker._id == 0)
                response.json({
                    user: {
                        id: speaker._id,
                        fullName: speaker.fullName,
                        image: speaker.image,
                        role: "admin"
                    }
                })
            else
                response.json({
                    user: {
                        id: speaker._id,
                        fullName: speaker.fullName,
                        image: speaker.image,
                        role: "speaker"}})
        }
        else
            return response.send("None")
        
    }).catch((err) => {
        console.log(err);
    });
});
//Register Post Page
authenticationRouter.post("/register", upload.single('file'), [check('password').isLength({ min: 5 }),
check("username").notEmpty(),
check("email").isEmail(),
check("fullName").isLength({ min: 3 }),
], (request, response) => {

    //Check the Errors Array
    const errors = validationResult(request);
    if (errors.isEmpty()) {
        let newSpeaker = new speakers({
            "fullName": request.body.fullName,
            "username": request.body.username,
            "password": request.body.password,
            "email": request.body.email,
            "address.city": request.body.city,
            "address.street": request.body.street,
            "address.building": request.body.building,
            "image": request.file.filename
        });
        // Create salt & hash
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newSpeaker.password, salt, (err, hash) => {
                if (err) throw err;
                newSpeaker.password = hash;
                newSpeaker.save().then((data) => {
                    let token = generateAccessToken(newSpeaker.id);
                    response.json({
                        token,
                        user: {
                            id: newSpeaker.id,
                            name: newSpeaker.fullName,
                        }
                    })
                }).catch((err) => {
                    console.log(err);
                });
            });
        })
    }
    else
        response.status(401).json({ msg: "No Token, Authorized Denied" });
});
function generateAccessToken(userId) {
    return jwt.sign({ id: userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 3600 });
}
module.exports = authenticationRouter;