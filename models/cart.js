const fs = require('fs');
const path = require('path');
const rootPath = require('../helpers/path-helper');

const pt = path.join(rootPath, 'data', 'cart.JSON');


module.exports = class Cart {

  static getCart(callback) {
    fs.readFile(pt, (err, fileContent) => {
      const cart = JSON.parse(fileContent);
      if(err) {
        callback(null);
      } else {
        callback(cart);
      }
    });
  }

  static addBook(id, bookPrice) {
    //  Récupérer le précédent panier
    fs.readFile(pt, (err, fileContent) => {
      let cart = {books: [], totalPrice: 0};
      if(!err) {
        cart = JSON.parse(fileContent);
      }
      //  parcourir le panier pour trouver les livres présents
      const existingBookIndex = cart.books.findIndex(book => book.id === id);
      const existingBook = cart.books[existingBookIndex];
      let updatedBook;
      //  soit on ajoute un "nouveau" livre, soit on met "+1" à un livre déjà présent dans le panier
      if(existingBook) {
        updatedBook = [...existingBook];
        updatedBook.qty = updatedBook.qty +1;
        cart.books = [...cart.books];
        cart.books[existingBook] = updatedBook;
      } else {
        updatedBook = {id: id, qty: 1};
        cart.books = [...cart.books, updatedBook];
      }
      cart.totalPrice = cart.totalPrice + +bookPrice;
      fs.writeFile(pt, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });
  }

  static deleteBook(id, bookPrice) {
    fs.readFile(pt, (err, fileContent) => {
      if(err) {
        return;
      }
      const updatedCart = {...JSON.parse(fileContent)};
      const book = updatedCart.books.find(book => book.id);
      if(!book) {
        return;
      }
      const bookQty = book.qty;
      updatedCart.books = updatedCart.books.filter(book => book.id !== id);
      //  manque bookPrice, 
      //  et updatedCart.totalPrice = updatedCart.totalPrice 
      //  devrait donner le nouveau prix total
      updatedCart.totalPrice = updatedCart.totalPrice - (bookPrice * bookQty);
      fs.writeFile(pt, JSON.stringify(updatedCart), (err) => {
        console.log(err);
      })
    })
  }

}
