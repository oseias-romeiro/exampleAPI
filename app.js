const express = require('express');
const {engine} = require('express-handlebars');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const session = require('express-session');
const csrf = require('csurf');
const flash = require('connect-flash');


const config = require('./config/config')

const app = express();
const PORT = config.node.port || 3000
const HOST = config.node.host || "127.0.0.1"

// routes
const account = require('./routes/account')
const home = require('./routes/home')

/* extensions */
// CookieParser
app.use(cookieParser());
// handlebars
app.engine('handlebars', engine({
  default: 'main',
  helpers: {
    ifEquals: (arg1, arg2, options) => {
      return (arg1 == arg2) ? options.fn(this) : options.inverse(this)
    }
  }
}))
app.set('view engine', 'handlebars');
app.set('views', './views');

// public
app.use(express.static('public'));
// BodyParser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
// csrf
app.use(csrf({ cookie: true }));
// bootstrap
app.use('/bootstrap/css', express.static(__dirname+'/node_modules/bootstrap/dist/css'));
app.use('/bootstrap/js', express.static(__dirname+'/node_modules/bootstrap/dist/js'));
// session
app.use(session({
  secret: config.node.secret,
  cookie: {maxAge: 60000},
  resave: false,
  saveUninitialized: false,
  cookie: { sameSite: 'strict' },
}));
// flash
app.use(flash())
app.use( (req, res, next) => {
  res.locals.messages = req.flash()
  res.locals.user=req.session.user
  next()
});

// Routes
app.get('/', (req, res) => res.render('index'))
app.use('/account', account)
app.use('/home', home)

// Server start
app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});
