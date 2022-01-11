const 
    express    = require('express'),
    mongoose   = require('mongoose'),
    bodyParser = require('body-parser'),
    session    = require('express-session'),
    ejs        = require('ejs'),
    passport   = require('passport');

const app = express();

const 
    baseRoutes    = require('./controller/routes/base.routes'),
    userRoutes    = require('./controller/routes/user.routes'),
    localRoutes   = require('./controller/routes/local.routes'),
    articleRoutes = require('./controller/routes/article.routes'),
    fbRoutes      = require('./controller/routes/fb.routes');

const 
    key = require('./key'),
    db  = key.db.remote || 'mongodb://localhost/' + key.db.local,
    port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({secret: key.session.secret}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('public'));
app.set('views', __dirname + '/view');
app.set('view engine', 'ejs');

app.use('/', baseRoutes);
app.use('/auth/local', localRoutes);
app.use('/auth/facebook', fbRoutes);
app.use('/article', articleRoutes);
app.use('/user', userRoutes);

mongoose.connect(db, (err) => {
    if (err){
        console.log(err);
    }else{
        console.log('Connected to DB');
    }
});

app.listen(port, (err) => {
    if (!err){
        console.log('listening on port:', port);
    }else{
        console.log('error: ', err);
    }
})
