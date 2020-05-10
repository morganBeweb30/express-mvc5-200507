/********* DECLARATIONS VARIABLES ***************/
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
/*
const fs = require('fs');
const ejs = require('ejs');
*/
//  routes
const adminRoute = require('./routes/admin');

const accueilRoute = require('./routes/accueil');
const errorController = require('./controllers/errors');

/*
const db = require('./helpers/db-helper');

db.execute('SELECT * FROM books')
  .then((result) => {
    console.log(result[0]);
  })
  .catch((err) => {
    console.log(err);
  })
*/
const app = express();
const port = 3000;

/****************** SETTERS ************************/
//  ejs
app.set('view engine', 'ejs');
app.set('views', 'views');

/****************** MIDDLEWARES *******************/
//  bodyParser
app.use(bodyParser.urlencoded({extended: true}));
//  css
app.use(express.static(path.join(__dirname, 'public')));

//  mw routes
app.use(accueilRoute);
app.use('/admin', adminRoute); //  .routes

app.use(errorController.get404);


//  listen port
app.listen(port, () => console.log(`App listening on port ${port}`));


