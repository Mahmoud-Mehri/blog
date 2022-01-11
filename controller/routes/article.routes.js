const Router = require('express').Router();
const Article = require('../../model/article.model');

Router.post('/new', (req, res) => {
    if (req.session.user || req.user){
        let user = req.session.user || req.user;

        let newArticle = new Article;
        newArticle.title = req.body.title;
        newArticle.description = req.body.description;
        newArticle.image = req.body.image;
        newArticle.tags = req.body.tags;
        newArticle.author = user._id;
        newArticle.save((err, post) => {
            res.redirect('/dashboard');
        })  
    }else{
        res.redirect('/');
    }
})

module.exports = Router;