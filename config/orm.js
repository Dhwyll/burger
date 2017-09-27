// Import MySQL connection
var connection = require("./connection.js");


// Helper function for SQL syntax.

// The below helper function loops through and creates an array of question marks - ["?", "?", "?"] - and turns it into a string.
// ["?", "?", "?"].toString() => "?,?,?";
function printQuestionMarks(num) {
	var arr = [];
  
	for (var i = 0; i < num; i++) {
		arr.push("?");
	}
  
	return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
	var arr = [];
  
	// loop through the keys and push the key/value as a string int arr
	for (var key in ob) {
		var value = ob[key];
		// check to skip hidden properties
		if (Object.hasOwnProperty.call(ob, key)) {
			// if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
			if (typeof value === "string" && value.indexOf(" ") >= 0) {
			value = "'" + value + "'";
			}
			// e.g. {devoured: true} => ["devoured=true"]
			arr.push(key + "=" + value);
		}
	}
  
	// translate array of strings to a single comma-separated string
	return arr.toString();
}

var orm = {
	all: function(tableInput, callback) {
		var queryString = "SELECT * FROM " + tableInput + ";";
		connection.query(queryString, function(err, result) {
		if (err) {
			throw err;
		}
		callback(result);
		});
	},
	create: function(table, cols, vals, callback) {
		var queryString = "INSERT INTO " + table;
	
		queryString += " (";
		queryString += cols.toString();
		queryString += ") ";
		queryString += "VALUES (";
		queryString += printQuestionMarks(vals.length);
		queryString += ") ";

		connection.query(queryString, vals, function(err, result) {
			if (err) {
				throw err;
			}
		
			callback(result);
		});
	},
	update: function(tableName, colValue, condition, callback) {
		var queryString = "UPDATE " + tableName;
		queryString += " SET ";
		queryString += objToSql(colValue);
		queryString += " WHERE ";
		queryString += condition;
		connection.query(queryString, function(err, result) {
			if (err) {
				throw err;
			}
			callback(result);
		});
	}
};

module.exports = orm;
