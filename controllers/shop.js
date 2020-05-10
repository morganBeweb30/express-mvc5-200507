const Book = require('../models/book');
const Cart = require('../models/cart');

//  /accueil/index
exports.getIndex = (req, res, next) => {
    Book.fetchAll()
        .then(([books]) => {
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
    Book.fetchAll()
        .then(([books]) => {
            res.render('accueil/books', {
                pageTitle: 'Accueil',
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
    Book.getBookById(bookId)
        .then(([book]) => {
            res.render('accueil/book-detail', {
                book: book[0],
                pageTitle: 'Titre du livre',    //  book.title, 
                siteTitle: 'Le Libraire'
            })
        })
        .catch((err) => console.log(err));
}

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



