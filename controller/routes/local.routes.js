const
    Router = require('express').Router(),
    User = require('../../model/user.model'),
    bcrypt = require('bcryptjs'),
    sendMail = require('../mailer');

const salt = bcrypt.genSaltSync(10); 

Router.post('/signup', (req, res) => {
    let errors = [];
    let usernameAlreadyExists = false;
    let usernameIsValid = req.body.username.length > 0;
    let passwordIsValid = req.body.password.length > 0;
    let emailIsValid = req.body.email.length > 0;

    if (!usernameIsValid) errors.push('username field must have value');
    if (!passwordIsValid) errors.push('password field must have value');
    if (!emailIsValid) errors.push('email field must have value');

    User.findOne({username: req.body.username}).then((user) => {
        if (user){
            usernameAlreadyExists = true;
            errors.push('username: ', req.body.username, 'already exists');
        }else{
            usernameAlreadyExists = false;
        }
    }).then(() => {
        if (errors.length > 0){
            res.render('signup', {errors,});
        }else{
            let newuser = new User();
            newuser.username = req.body.username;
            newuser.password = bcrypt.hashSync(req.body.password, salt);
            newuser.email = req.body.email;
            newuser.profile_pic = req.body.profile_pic;
            newuser.followers.push(req.body.username);
            newuser.followings.push(req.body.username);
            newuser.save().then((user) => {
                req.session.user = user;
                res.redirect('/dashboard');
                sendMail(newuser.email);
            }).catch(e => console.log(e));
        }
    })
})

Router.post('/login', (req, res) => {
    let errors = [];
    User.findOne({username: req.body.username}).then((user) => {
        let currentUser = user;
        if (currentUser && (bcrypt.compareSync(req.body.password, user.password) === true)){
            req.session.user = user;
            res.redirect('/dashboard');
        }else{
            errors.push('login failed !');
            res.render('login', {errors,});
        }
    }).catch((err) => {
        errors.push('User not found!');
        res.render('login', {errors,});
    })
})


module.exports = Router;