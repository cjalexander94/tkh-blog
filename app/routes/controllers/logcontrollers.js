var post = require("../../models/blogpost.js");

var newPost = function(req, res){
		new post({
			title: req.body.title,
			post: req.body.post,
			date: {
				month: String,
				day: String,
				year: String
			},
			picture: req.body.img,
			author: req.body.author,
			user: req.body.user,
			footer: req.body.footer
		}).save(function(err){
			if(err){
				console.log(err);
			}else{
				req.redirect("/index")
			}
		})
}