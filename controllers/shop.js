const Book = require('../models/book');
const Cart = require('../models/cart');

//  /accueil/index
exports.getIndex = (req, res, next) => {
    Book.fetchAll((books) => {
        res.render('accueil/index', {
            pageTitle: 'Accueil',
            siteTitle: 'Le Libraire',
            books: books
        });
    });
};

//  /accueil/book-detail
exports.getBookDetail = (req, res, next) => {
    const bookId = req.params.bookId;
    Book.getBookById(bookId, book => {
        res.render('accueil/book-detail', {
            book: book,
            pageTitle: 'Titre du livre',    //  book.title, 
            siteTitle: 'Le Libraire'
        });
    });
}
/***************** adminController ***************
exports.getEditBook = (req, res, next) => {
    const bookId = req.params.bookId;
    Book.getBookById(bookId, book => {
        if(!book) {
            console.log(book);
        }
        res.render('admin/edit-book', {
            pageTitle: 'Modifier un livre',
            siteTitle: 'Admin',
            editing: editMode,
            book: book
        });
    });
}
/*************************************************/


//  /accueil/books
exports.getAllBooks = (req, res, next) => {
    Book.fetchAll((books) => {
        res.render('accueil/books', {
            pageTitle: 'Tous nos livres',
            siteTitle: 'Le Libraire',
            books, books
        });
    });
};

exports.getCart = (req, res, next) => {
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
}

exports.postCart = (req, res, next) => {
    const bookId = req.body.bookId;
    Book.getBookById(bookId, book => {
        Cart.addBook(bookId, book.price);
    })
    res.redirect('/cart');
}

exports.postCartDeleteBook = (req, res, next) => {
    const bookId = req.body.bookId;
    Book.getBookById(bookId, book => {
        Cart.deleteBook(bookId, book.price);
        res.redirect('/cart');
    })
}

exports.getCheckout = (req, res, next) => {
    res.render('accueil/checkout', {
        pageTitle: 'Paiement',
        siteTitle: 'Le Libraire'
    });
}

exports.getOrders = (req, res, next) => {
    res.render('accueil/orders', {
        pageTitle: 'factures',
        siteTitle: 'Le Libraire'
    });
}



