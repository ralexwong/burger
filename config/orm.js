// Import MySQL connection.
var connection = require("../config/connection.js");


// Object for all our SQL statement functions.
var orm = {
    selectAll: function(table, cb) {
      var query = "SELECT * FROM " + table + ";";
      connection.query(query, function(err, result) {
        if (err) {
          throw err;
        }
        cb(result);
      });
    },
    insertOne: function(table, cols, vals, cb) {
      var query = "INSERT INTO " + table;
  
      query += " (";
      query += cols.toString();
      query += ") ";
      query += "VALUES (";
      query += printQuestionMarks(vals.length);
      query += ") ";
  
      console.log(query);
  
      connection.query(query, vals, function(err, result) {
        if (err) {
          throw err;
        }
  
        cb(result);
      });
    },
    // An example of objColVals would be {name: panther, sleepy: true}
    updateOne: function(table, objColVals, condition, cb) {
      var query = "UPDATE " + table;
  
      query += " SET ";
      query += objToSql(objColVals);
      query += " WHERE ";
      query += condition;
  
      console.log(query);
      connection.query(query, function(err, result) {
        if (err) {
          throw err;
        }
  
        cb(result);
      });
    }
  };
  
  // Export the orm object for the model (cat.js).
  module.exports = orm;