
const express = require('express');
//const path = require('path');
//const rootDir = require('../helpers/path-helper');

const adminController = require('../controllers/admin');
const router = express.Router();

router.get('/add-book', adminController.getAddBook);
router.get('/admin-books', adminController.getAdminBooks);
router.post('/admin-books', adminController.postAdminBooks);

router.get('/edit-book/:bookId', adminController.getEditBook);
router.post('/edit-book', adminController.postEditBook);
router.post('/delete-book', adminController.deleteBook);


module.exports = router;
