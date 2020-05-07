const fs = require('fs');
const path = require('path');
const rootPath = require('../helpers/path-helper');
const Cart = require('./cart');

const pt = path.join(rootPath, 'data', 'books.JSON');

const getbfjson = (callback) => {
    fs.readFile(pt, (err, fileContent) => {
        if (err) {
            return callback([]);
        } else {
            callback(JSON.parse(fileContent));
        } 
    });
};

module.exports = class Book {
    constructor(id, title, image, price, descr) {
        this.id = id;
        this.title = title;
        this.image = image;
        this.price = price;
        this.descr = descr;
    }

    save() {
        getbfjson((books) => {
            //  for update
            if(this.id) {
                const existingBookIndex = books.findIndex(book => book.id === this.id);
                const updatedBooks = [...books];
                updatedBooks[existingBookIndex] = this;
                fs.writeFile(pt, JSON.stringify(updatedBooks), (err) => {
                    console.log(err);
                });
                //  for create
            } else {
                this.id = Math.random().toString();
                books.push(this);
            fs.writeFile(pt, JSON.stringify(books), (err) => {
                console.log(err);
            });
            }
        });
    };

    //  for get all
    static fetchAll(callback) {
        return getbfjson(callback);
    }

    //  for get by id
    static getBookById(id, callback) {
        if(!callback) {
            console.log(`books : ${callback}`)
        }
        getbfjson(books => {
            const book = books.find(bk => bk.id === id);
            callback(book);
        });
    }

    //  for delete by id
    static deleteBookById(id) {
        getbfjson((books) => {
            const book = books.find((bk) =>bk.id=== id );
            const booksAfterDelete = books.filter((bk) => bk.id !== id);
            fs.writeFile(pt, JSON.stringify(booksAfterDelete), err => {
                console.log(err);
                if(!err) {
                    //  supprimer le tout dans le panier qui contient ce livre
                    Cart.deleteBook(id, bookPrice);
                }
            })
        })
    }


}





    
    
    
    








