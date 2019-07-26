// Dependencies
// =============================================================
//require('dotenv')();
var express = require("express");
var path = require("path");
var exphbs = require("express-handlebars");
var bodyParser = require("body-parser");
var mysql = require('mysql');
var Sequelize = require('sequelize');


// Import MySQL connection.
var connection = require("./config/connection.js");


// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// START PLACE FOR STATIC FILES (E.G. CSS AND IMAGES)
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

app.get("/api/burgers", function(req, res) {
  connection.query("SELECT * FROM burgers;", function(err, data) {
    if (err) {
      return res.status(500).end();
    }

    res.json(data);
  });
});

// Delete a movie
app.delete("/api/burgers/:id", function(req, res) {
  connection.query("DELETE FROM burgers WHERE id = ?", [req.params.id], function(err, result) {
    if (err) {
      // If an error occurred, send a generic server failure
      return res.status(500).end();
    }
    else if (result.affectedRows === 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    }
    res.status(200).end();

  });
});


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("Server listening on: http://localhost:" + PORT);
});