var post = require("../../models/blogpost.js");

function today(){
	var date = new Date(),
		day = date.getDate(),
		month = date.getMonth() + 1,
		year = date.getFullYear();

		if (day < 10){
			day = '0' + day;
		}

		if (month < 10){
			month = '0'+ month;
		}

		return{
			month: month,
			year: year,
			day: day
		}
}

var blogPages = {
	create: function(req, res){
		res.render("create", {
			user: req.user.username
		});
	},
	update: function(req, res){
		post.findOne({"_id": req.query.post}, function(err, post){
			if(err){
				console.log(err);
			} else {
				res.render("update", {
					post: post
				});
			}
		});
	}
};

var newPost = function(req, res){
		new post({
			title: req.body.blogTitle,
			post: req.body.postBody,
			date: {
				month: today().month,
				day: today().day,
				year: today().year
			},
			// picture: req.body.img,
			// author: req.body.author,
			user: req.user.username,
			// footer: req.body.footer
		}).save(function(err){
			if(err){
				console.log(err);
			}else{
				res.redirect("/")
			}
		})
}

function updateBlogPost(req, res){
	post.update({"_id": req.query.id}, {$set: {"post": req.body.postBody, "title": req.body.blogTitle}}, function(err, doc){
		console.log(doc);
		if(err){
			res.redirect("/?update=fail");
		} else {
			res.redirect("/?update=success");
		}
	});
}

function deleteBlogPost(req, res){
	post.remove({"_id": req.query.post}, function(err, post){
		if(err){
			console.log(err);
		} else {
			res.redirect("/");
		}
	}); 
}

exports.create = newPost;
exports.update = updateBlogPost;
exports.delete = deleteBlogPost;

exports.createPage = blogPages.create;
exports.updatePage = blogPages.update;