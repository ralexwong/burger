// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var exphbs = require("express-handlebars");
var bodyParser = require("body-parser")


// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.use(bodyParser.urlencoded({
  extended: false
}))

// Set Handlebars.
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// ================================================================================
// ROUTER
// The below points our server to a series of "route" files.
// These routes give our server a "map" of how to respond when users visit or request data from various URLs.
// ================================================================================

// Import routes and give the server access to them.
var routes = require("./controllers/burgers_controller.js");

app.use(routes);


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("Server listening on: http://localhost:" + PORT);
});