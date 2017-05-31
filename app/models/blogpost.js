var mongoose = require(mongoose);

var blogPost = new mongoose.Schema({
	title: String,
	date: {
			month: String,
			day: String,
			year: String
		},
	picture: img,
	author: String,
	body: String,
	user: String,
	footer: String
	// coments: [
	// 		{
	// 			comment: String,
	// 			user: String
	// 		}]
});

module.exports = mongoose.model("posts", blogPost);