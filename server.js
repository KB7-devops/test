// load environment variables
//require('dotenv').config();

// grab our dependencies
const express    = require('express'),
  app            = express(),
  port           = process.env.PORT || 8087,
  expressLayouts = require('express-ejs-layouts'),
  mongoose       = require('mongoose'),
  bodyParser     = require('body-parser'),
  session        = require('express-session'),
  cookieParser   = require('cookie-parser'),
  flash          = require('connect-flash'),
  expressValidator = require('express-validator');

  var MongoClient = require('mongodb').MongoClient;

// configure our application ===================

// tell express where to look for static assets
app.use(express.static(__dirname + '/public'));

// set ejs as our templating engine
app.set('view engine', 'ejs');
app.use(expressLayouts);

// connect to our database
//mongoose.connect(process.env.DB_URI);

// Connect to the db
MongoClient.connect("mongodb://localhost:27017/movies", function(err, db) {
  if(err) { return console.dir(err); }

  var collection = db.collection('movie');
  var doc1 = {'hello':'doc1'};
  var doc2 = {'hello':'doc2'};
  var lotsOfDocs = [{'hello':'doc3'}, {'hello':'doc4'}];

//insertion
  collection.insert(doc1);
  collection.insert(doc2, {w:1}, function(err, result) {});
  collection.insert(lotsOfDocs, {w:1}, function(err, result) {});

});



// use body parser to grab info from a form
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());

// set the routes =============================
// route our app
var router = require('./app/routes');
app.use('/', router);


// start our server ===========================
app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});