var r = require("./routes.json");
var controllers = {
	pages: require("./controllers/pages"),
	session: require("./controllers/session"),
	blogCtrl: require("./controllers/blogcontrollers")
}

module.exports = function(app, passport){
	app.get(r.login, controllers.pages.login);
	app.get(r.index, controllers.pages.index);
	app.get(r.post, controllers.pages.post);
	app.get(r.create, controllers.session, controllers.blogCtrl.createPage);
	app.get(r.update, controllers.session, controllers.blogCtrl.updatePage);
	app.post(r.signup, controllers.pages.signup);
	app.post(r.login, passport.authenticate("local-login", {
		successRedirect: r.index,
		failureRedirect: r.login
	}));
	app.post(r.create, controllers.session, controllers.blogCtrl.create);
	app.put(r.update, controllers.session, controllers.blogCtrl.update);
	app.delete(r.delete, controllers.session, controllers.blogCtrl.delete);
}