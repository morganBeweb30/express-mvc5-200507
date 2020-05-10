/********* DECLARATIONS VARIABLES ***************/
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
/*
const fs = require('fs');
const ejs = require('ejs');
*/
//  DB
const db = require('./helpers/db-helper');
//  models
const Book = require('./models/book');
const Cart = require('./models/order');
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');
const User = require('./models/user');
//  routes
const adminRoute = require('./routes/admin');
const accueilRoute = require('./routes/accueil');
const errorController = require('./controllers/errors');

/*  mysql2 sans sequelize :
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
//  User, attache l'objet User pour pouvoir l'utiliser
app.use((req, res, next) => {
  User.findByPk(1).then((user) => {
    req.user = user;
    next()
  }).catch((err) => console.log(err));
})
//  mw routes
app.use(accueilRoute);
app.use('/admin', adminRoute); //  .routes

app.use(errorController.get404);


//  listen port
//  Définir les relations entre les tables
Book.belongsTo(User, {constraints: true, onDelete: 'CASCADE'});
User.hasMany(Book);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Book, {through: CartItem});
Book.belongsToMany(Cart, {through: CartItem});
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Book, {through: OrderItem});

db.sync({force: true}).then((result) => {    //  .sync({force: true}) à mettre au début si on veut remettre la bdd à 0, sinon .sync()
  return User.findByPk(1);
}).then((user) => {
  if(!user) {
    return User.create({
      name: 'test',
      email: 'test@test.com'
    });
  }
  return user;
}).then((user) => {
  return user.createCart();
}).then((cart) => {
  app.listen(port, () => console.log(`App listening on port ${port}`));
}).catch((err) => console.log(err));

/*  exemple d'utilisation de sequelize :
sequelize.sync().then((result) => {
  console.log(result);
  //  app.listen doit être dans le dernier '.then() s'il y en a plusieurs
  app.listen(port, () => console.log(`App listening on port ${port}`));
}).catch((err) => console.log(err));
*/
//  app.listen(port, () => console.log(`App listening on port ${port}`));


