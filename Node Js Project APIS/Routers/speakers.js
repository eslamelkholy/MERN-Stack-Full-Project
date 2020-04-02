const express = require("express");
const speakerRouter = express.Router();
let path = require("path");
let mongoose = require("mongoose");
require("./../Models/speakerModel");
let speakerModel = mongoose.model("speaker");
require("./../Models/eventModel");
let eventModel = mongoose.model("event");
let fs = require('fs');
let auth = require('../middleware/auth');

//=============================================
// ********************   Admin Section   **********************
//Speaker Own Profile
speakerRouter.post("/profile", auth, (request, response) => {
    let speakerId = request.user.id;
    speakerModel.findById(speakerId).then((mySpeaker) => {
        let selectedSpeakerId = mySpeaker._id + "";
        eventModel.find({ $or: [{ mainSpeaker: selectedSpeakerId }, { otherSpeaker: selectedSpeakerId }] }).then((refEvent) => {
            response.send({ speakerData: mySpeaker, currentEvent: refEvent, _id: speakerId });
        }).catch((err) => {
            console.log(err);
        });
    }).catch((err) => {
        console.log(err);
    })
});
//Update Speaker Profile
speakerRouter.post("/updateSpeakerProfile", (request, response) => {
    speakerModel.updateOne({ _id: request.session._id }, {
        $set:
        {
            "fullName": request.body.fullName,
            "username": request.body.username,
            "password": request.body.password,
            "address.city": request.body.city

        }
    }).then((data) => {
        request.session.name = request.body.fullName;
        response.redirect("/speaker/profile");
    }).catch((err) => {
        console.log(err);
    });
});
speakerRouter.get("/upcomingEvents", (request, response) => {

    eventModel.find({}).populate({ path: "mainSpeaker otherSpeaker" }).then((events) => {
        response.locals.speakerName = request.session.name;
        response.render("Speakers/upcomingEvents", { events: events });
    }).catch((err) => {
        console.log(err);
    })
});
//********************   Admin Section   **********************
//List All Speakers
speakerRouter.get("/list", (request, response) => {
    speakerModel.find({}).then((data) => {
        //Front End API'S
        response.send(data);
        // response.render("Speakers/speakersList", { speakers: data });
    }).catch((err) => {
        console.log(err + "");
    });
});
//Delete Selected Object
speakerRouter.post("/delete", (request, response) => {
    speakerModel.findByIdAndDelete(request.body.speakerId).then((data) => {
        response.send(request.body.speakerId + "");
    }).catch((err) => {
        console.log(err + "");
    });
});
//Update Page
speakerRouter.get("/update/:id", (request, response) => {
    speakerModel.findOne({ _id: request.params.id }).then((selectedSpeaker) => {
        response.send(selectedSpeaker);
        // response.render("Speakers/editSpeaker", { speaker: selectedSpeaker });
    }).catch((err) => {
        console.log(err);
    });
});
//Update Speaker
speakerRouter.post("/update", (request, response) => {
    speakerModel.updateOne({ _id: request.body._id }, {
        $set:
        {
            "fullName": request.body.fullName,
            "username": request.body.username,
            "password": request.body.password,
            "address.city": request.body.city

        }
    }).then((data) => {
        response.redirect("/speaker/list");
    }).catch((err) => {
        console.log(err);
    });
});

//add Speaker Page
speakerRouter.get("/add", (request, response) => {
    speakerModel.findOne({ _id: request.params.id }).then((selectedSpeaker) => {
        response.render("Speakers/addSpeaker", { speaker: selectedSpeaker });
    }).catch((err) => {
        console.log(err);
    });
});

//Add New Speaker Using 
speakerRouter.post("/add", (request, response) => {
    console.log(request.body);
    let newSpeaker = new speakerModel({
        "fullName": request.body.fullName,
        "username": request.body.username,
        "password": request.body.password,
        "address.city": request.body.city,
        "address.street": request.body.street,
        "address.building": request.body.building,
    });
    newSpeaker.save().then((data) => {
        console.log("Save");
        response.redirect("/speaker/list");
    }).catch((err) => {
        console.log(err);
    });
});
module.exports = speakerRouter;