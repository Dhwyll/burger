var orm = require("../config/orm.js");

var burger = {
	all: function(callback) {
		orm.all("burgers", function(res) {
			callback(res);
		});
	},
	// The variables cols and vals are arrays.
	create: function(cols, vals, callback) {
		orm.create("burgers", cols, vals, function(res) {
			callback(res);
		});
	},
	update: function(colValue, condition, callback) {
		orm.update("burgers", colValue, condition, function(res) {
			callback(res);
		});
	}
};
  
// Export the database functions for the controller (burgers-controller.js).
module.exports = burger;
  