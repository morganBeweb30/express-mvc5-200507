/*
const fs = require('fs');
const path = require('path');
const rootPath = require('../helpers/path-helper');
*/
const db = require('../helpers/db-helper');
const Cart = require('./cart');

//  const pt = path.join(rootPath, 'data', 'books.JSON');



module.exports = class Book {
    constructor(id, title, image, price, descr) {
        this.id = id;
        this.title = title;
        this.image = image;
        this.price = price;
        this.descr = descr;
    }

    save() {
        return db.execute("INSERT INTO books (title, image, price, descr) VALUES (?, ?, ?, ?)",
            [this.title, this.image, this.price, this.descr]);
    };

    //  for get all
    static fetchAll() {
        return db.execute("SELECT * FROM books");
    }

    //  for get by id
    static getBookById(id) {
        return db.execute('SELECT * FROM books WHERE books.id = ?', [id]);
    }

    //  for delete by id
    static deleteBookById(id) {
        
    }


}





    
    
    
    








