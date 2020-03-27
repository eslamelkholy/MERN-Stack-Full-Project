let express = require("express");
let path = require("path");
let mongoose = require("mongoose");
var multer  = require('multer')
//My Routers Objects Which i'am Going to use them To Routing Users
let authenticationRouter = require("./Routers/authenticationRouter");
let speakerRouter = require("./Routers/speakers");
let eventRouter = require("./Routers/events");
let adminRouter = require("./Routers/admin");
var cookieParser = require('cookie-parser');
let cors=require("cors");
//Connect Flash
let flash = require("connect-flash");
//Validation
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
//Session
let session = require("express-session");
//Front End Api's
// multer=require("multer");

// let multerMW=multer({
//     dest:"./publics/Images"
// });

//Server Establishment
const server = express();
server.listen(8080, () => {
    console.log("Hello The Server is Working now");
});

//DB Connection
mongoose.connect("mongodb://localhost:27017/events", { useNewUrlParser: true })
    .then(() => { console.log("Connected....") })
    .catch((err) => { console.log(err + ""); }
    )
    
//********** Server Settings **********/
//Cors For Crossplatform Domain
server.use(cors({credentials: true, origin: true}));
server.use(cookieParser('This is a secret'))
server.locals.moment = require("moment");
server.use(express.static(path.join(__dirname, "public")));
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.set("view engine", "ejs");
server.set("views", path.join(__dirname, "views"));
//Session
server.use(session({ secret: 'eslam', saveUninitialized: true, resave: true }));
//Flash
server.use(flash());
//Validation
server.use(bodyParser.json());

//*****    Routing From Routers (Controllers)   ***********/
server.use(authenticationRouter);
// Session MiddleWare
server.use((request, response, next) => {
    if (request.session.role)
        next();
    else
        next();
        // response.redirect("/login");
});
server.use("/admin", adminRouter);
server.use("/speaker", speakerRouter);
server.use("/event", eventRouter);

server.use((request,response) =>{
    response.send("404 NOT Found");
});

//MiddleWare Error
//This will Work When access A Files that Doesn't Exists
server.use(function (err, req, res, next) {
    console.log(err.stack);
    res.status(500).send('Something went wrong!!');
});
