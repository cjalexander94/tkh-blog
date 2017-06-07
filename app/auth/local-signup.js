var bcrypt = require("bcrypt-node.js"),
	User = require("../model/userModel");

module.exports = function(user, callback){
	new User({
		username: user.name,
		password: bcrypt.hashSync(user.pass),
		admin: true,
		firstName: user.first,
		lastName: user.last,
		createdAt: new Date().tolocaleDateString()
	}).save(function(err){
		if(err){
			callback({
				"success": false,
				"reason": "Failed to save user"
			});
		} else {
			callback({
				"success": true,
				"reason": "Saved user"
			});
		}
	});
}