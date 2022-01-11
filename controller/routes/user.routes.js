const Router = require('express').Router();
const User   = require('../../model/user.model');
const Article = require('../../model/article.model');

Router.post('/follower/new', (req, res) => {
    if (req.session.user || req.user){
        let user = req.session.user || req.user;
        User.findOne({username: user.username}).then((u) => {
            u.followings.push(req.body.username);
            u.save();
            
            res.redirect('/user/profile/' + req.body.username);
        });
    }else{
        res.redirect('/');
    }
})

Router.get('/profile/:username', (req, res) => {
	if(req.session.user || req.user) {
		let user = req.session.user || req.user;
		let alreadyFollowing = user.followings.includes(req.params.username);

		User.findOne({username: req.params.username}).then((user) => {
			Article.find({author: user._id}).then((articles) => {
				res.render('profile', {articles, user, alreadyFollowing, });
			})
		}).catch((err) => { // User not found
			res.redirect('/dashboard');
		})
	}else{
		res.redirect('/');
	}
})

Router.get('/profile', (req, res) => {
    if(req.session.user || req.user){
        let user = req.session.user || req.user;
        res.redirect('/user/profile/' + user.username);
    }else{
        res.redirect('/') 
    }
})

Router.get('/logout', (req, res) => {
    if (req.session.user || req.user){
        req.session.user = null;
        req.user = null;
        res.redirect('/login');
    }else{
        redirect(req.url);
    }
})

module.exports = Router;