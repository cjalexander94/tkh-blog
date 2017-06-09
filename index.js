var express = require("express"),
	bodyParser = require("body-parser"),
	mongoose = require("mongoose"),
	hbs = require("hbs"),
	bcrypt = require("bcrypt-nodejs"),
	passport = require("passport"),
	methodOverride = require("method-override"),
	session = require("express-session"),
	path = require("path"),
	auth = require("./app/auth/passport-local"),
	routes = require("./app/routes/routes"),
	app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
	extended: true
}));

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "app/views"));

app.use("/public", express.static(path.join(__dirname, "app/client")));

app.use(session({
	secret: 'itsASecret',
	resave: true,
	saveUninitialized: true
}));

app.use(methodOverride('_method'));

app.use(passport.initialize());
app.use(passport.session());

auth(passport);

routes(app, passport);


mongoose.connect("mongodb://localhost/api");
app.listen(8080);
console.log("Server is running!");