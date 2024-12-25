require("dotenv").config();

const express = require('express');
var cookieParser = require('cookie-parser')
var session = require('express-session')
//slug
var slug = require('mongoose-slug-updater');
var mongoose = require('mongoose');
mongoose.plugin(slug);
// Method Override 
const methodOverride = require('method-override');
// Body-perser
var bodyParser = require('body-parser')
// express - flash
const flash = require('express-flash')
const app = express()
const port = process.env.PORT;
// Method Override 
app.use(methodOverride('_method'));
// Body-perser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

const database = require("./config/database");
database.connect();

app.use(express.static(`${__dirname}/public`));

const routeAdmin = require('./routes/admin/index.route');
const route = require('./routes/client/index.route');

// flash
app.use(cookieParser('HEHEHEHE'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());
// end flash

app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");

routeAdmin(app);
route(app);

// App Locals 
const systemConfig = require("./config/system");

app.locals.prefixAdmin = systemConfig.prefixAdmin;




app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})