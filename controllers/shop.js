const Book = require('../models/book');
//  const Cart = require('../models/cart');

//  /accueil/index
exports.getIndex = (req, res, next) => {
    Book.findAll()
        .then((books) => {
            res.render('accueil/index', {
                pageTitle: 'Accueil',
                siteTitle: 'Le Libraire',
                books: books
            });
            console.log(books);
        })
        .catch((err) => console.log(err))
};

//  /accueil/books
exports.getAllBooks = (req, res, next) => {
    Book.findAll()
        .then((books) => {
            res.render('accueil/books', {
                pageTitle: 'Tous nos livres',
                siteTitle: 'Le Libraire',
                books: books
            });
            console.log(books);
        })
        .catch((err) => console.log(err))
};

//  /accueil/book-detail
exports.getBookDetail = (req, res, next) => {
    const bookId = req.params.bookId;
    Book.findByPk(bookId).then(book => {
        res.render('accueil/book-detail', {
            book: book,
            pageTitle: book.title,    //  book.title, 
            siteTitle: 'Le Libraire'
        })
    }).catch((err) => {console.log(err)});
    /*
    Book.getBookById(bookId)
        .then(([book]) => {
            res.render('accueil/book-detail', {
                book: book[0],
                pageTitle: 'Titre du livre',    //  book.title, 
                siteTitle: 'Le Libraire'
            })
        })
        .catch((err) => console.log(err));
    */
}

exports.getCart = (req, res, next) => {
    req.user.getCart().then((cart) => {
        return cart.getBooks().then((books) => {
            res.render('accueil/cart', {
                pageTitle: 'Votre Panier',
                siteTitle: 'Le Libraire',
                books: books,
            });
        })
    }).catch((err) => console.log(err));
    /*
    Cart.getCart((cart) => {
        Book.fetchAll((books) => {
            const cartBooks = [];
            for(book of books) {
                const cartBookData = cart.books.find((bk) => bk.id === book.id);
                if(cartBookData) {
                    cartBooks.push({bookData: book, qty: cartBookData.qty});
                }
            }
            res.render('accueil/cart', {
                pageTitle: 'Votre Panier',
                siteTitle: 'Le Libraire',
                books: cartBooks,
                cart: cart
            });
        })
    })
    */
}

exports.postCart = (req, res, next) => {
    const bookId = req.body.bookId;
    let fetchedCart;
    let newQuantity = 1;
    req.user.getCart().then((cart) => {
        fetchedCart = cart;
        return cart.getBooks({where: {id:bookId}})
    }).then((books) => {
        let book;
        if(books.length > 0) {
            book = books[0];
        }
        if(book) {
            const oldQuantity = book.cartItem.quantity;
            newQuantity = oldQuantity+1;
            return book;
        }
        return Book.findByPk(bookId);
    }).then((book) => {
        return fetchedCart.addBook(book, {
            through: {quantity: newQuantity}
        })
    }).then(() => {
        res.redirect('/cart');
    }).catch((err) => console.log(err));
    /*
    Book.getBookById(bookId, book => {
        Cart.addBook(bookId, book.price);
    })
    res.redirect('/cart');
    */
}

exports.postCartDeleteBook = (req, res, next) => {
    const bookId = req.body.bookId;
    req.user.getCart().then((cart) => {
        return cart.getBooks({where: {id: bookId}})
    }).then((result) => {
        res.redirect('/cart');
    }).catch((err) => console.log(err));
    /*
    Book.getBookById(bookId, book => {
        Cart.deleteBook(bookId, book.price);
        res.redirect('/cart');
    })
    */
}

exports.getCheckout = (req, res, next) => {
    res.render('accueil/checkout', {
        pageTitle: 'Paiement',
        siteTitle: 'Le Libraire'
    });
}

exports.postOrders = (req, res, next) => {
    let fetchedCart;
    req.user.getCart().then((cart => {
        fetchedCart = cart;
        return cart.getBooks();
    })).then((books) => {
        return req.user.createOrder().then((order) => {
            return order.addBooks(books.map((book) => {
                book.orderItem = {quantity: book.cartItem.quantity};
                return book;
            }));
        }).then((result) => {
            return fetchedCart.setBooks(null);
        }).then((result) => {
            res.redirect('accueil/orders');     //  /orders ?
        }).catch((err) => console.log(err));
    }).catch((err) => console.log(err));
}

exports.getOrders = (req, res, next) => {
    req.user.getOrders({include: ['books']}).then((orders) => {
        res.render('accueil/orders', {
            pageTitle: 'factures',
            siteTitle: 'Le Libraire'
        });
    });
    /*
    res.render('accueil/orders', {
        pageTitle: 'factures',
        siteTitle: 'Le Libraire'
    });
    */
}



