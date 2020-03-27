const express = require("express");
const adminRouter = express.Router();
let path = require("path");
let mongoose = require("mongoose");
require("../Models/notificationModel");
let myNotificationModel = mongoose.model("notification");
adminRouter.get("/profile",(request,response,next) =>{
    //List All Notifications
    myNotificationModel.find({}).populate({path : "speakerId eventId"}).sort({_id : -1}).limit(10).then((eventsArray)=>{
        response.send(eventsArray)
        // response.render("adminProfile",{canceledEvents : eventsArray});
        // next();
    }).catch((err) =>{
        console.log(err);
    })
});
module.exports = adminRouter;