
const Book = require('../models/book');

/*
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
*/

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
    
    res.user.createBook(
        {
            title: title,
            image: image,
            price: price,
            descr: descr
        }
    ).then((result) => {
        console.log(result);
        res.redirect('admin-book');
    }).catch((err) => {console.log(err)});
}

//  get /admin/admin-books
exports.getAdminBooks = (req, res, next) => {
    res.user.getAdminBooks().then((books) => {
        res.render('admin/admin-books', {
            pageTitle: 'Tous nos livres',
            siteTitle: 'Admin',
            books: books
        });
    }).catch((err) => console.log(err));
}

//  get /admin/edit-book
exports.getEditBook = (req, res, next) => {
    const editMode = req.query.edit;
    if(!editMode) {
        return res.redirect('/');
    }

    const bookId = req.params.bookId;
    req.user.getEditBook({where: {id:bookId}}.then((book) => {
        if(!book) {
            console.log(book);
        }
        res.render('admin/edit-book', {
            pageTitle: 'Modifier un livre',
            siteTitle: 'Admin',
            editing: editMode,
            book: book
        });
    }).catch((err) => console.log(err)));
    /*
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
    */
}

//  post /admin/edit-books
exports.postEditBook = (req, res, next) => {
    const bookId = req.body.bookId;
    const updatedTitle = req.body.title;
    const updatedImage = req.body.image;
    const updatedPrice = req.body.price;
    const updatedDescr = req.body.descr;
    Book.findByPk(bookId).then((book) => {      // find by primary key
        book.title = updatedTitle;
        book.image = updatedImage;
        book.price = updatedPrice;
        book.descr = updatedDescr;
        return book.save();
    }).then((result) => {
        console.log('livre mis à jour');
        res.redirect('admin-books');
    }).catch((err) => {console.log(err)});
    /*
    const updatedBook = new Book(bookId, updatedTitle, updatedImage, updatedPrice, updatedDescr);
    console.log(`updatedBook : ${req.body.title}, ${req.body.image}, ${req.body.price}, ${req.body.descr}, `);
    */
    /*
    updatedBook.save();
    res.redirect('admin-books');   //  /admin
    */
}

//  post delete-book
exports.deleteBook = (req, res, next) => {
    const bookId = req.body.bookId;
    onkeydown.findByPk(bookId).then((book) =>{
        return book.destroy();
    }).then((result) => {
        console.log('livre supprimé');
        res.redirect('admin-books');
    }).catch((err) => [console.log(err)]);
    /*
    Book.deleteBookById(bookId);
    res.redirect('admin-books');   //  /admin
    */
}


