
const Book = require('../models/book');

//  /admin/add-book
exports.getAddBook = (req, res, next) => {
    res.render('admin/add-book', {    //  
        pageTitle: 'Ajouter un livre',
        siteTitle: 'Le Libraire',
        editing: false
    });
};

//  post /admin/admin-books
exports.postAdminBooks = (req, res, next) => {
    const title = req.body.title;
    const image = req.body.image;
    const price = req.body.price;
    const descr = req.body.descr;
    const book = new Book(null, title, image, price, descr);
    book.save()
        .then(() => {
            console.log('books');
            res.redirect('admin-books');
        })
        .catch((err) => console.log(err));
}
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
//  get /admin/admin-books
exports.getAdminBooks = (req, res, next) => {
    Book.fetchAll()
    .then(([books]) => {
        res.render('admin/admin-books', {
            pageTitle: 'Tous nos livres',
            siteTitle: 'Admin',
            books: books
        });
    })
    .catch((err) => console.log(err));
}

//  get /admin/edit-book
exports.getEditBook = (req, res, next) => {
    const editMode = req.query.edit;
    if(!editMode) {
        return res.redirect('/');
    }

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

//  post /admin/edit-books
exports.postEditBook = (req, res, next) => {
    const bookId = req.body.bookId;
    const updatedTitle = req.body.title;
    const updatedImage = req.body.image;
    const updatedPrice = req.body.price;
    const updatedDescr = req.body.descr;
    const updatedBook = new Book(bookId, updatedTitle, updatedImage, updatedPrice, updatedDescr);
    console.log(`updatedBook : ${req.body.title}, ${req.body.image}, ${req.body.price}, ${req.body.descr}, `);
    updatedBook.save();
    res.redirect('admin-books');   //  /admin
}

//  post delete-book
exports.deleteBook = (req, res, next) => {
    const bookId = req.body.bookId;
    Book.deleteBookById(bookId);
    res.redirect('admin-books');   //  /admin
}


