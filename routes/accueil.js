/********* DECLARATIONS VARIABLES ***************/
const express = require('express');
const path = require('path');
const rootDir = require('../helpers/path-helper');

const shopController = require('../controllers/shop');
const router = express.Router();

/**************** METHODES **********************/

router.get('/', shopController.getIndex);
router.get('/books', shopController.getAllBooks);
router.get('/book-detail/:bookId', shopController.getBookDetail);
router.get('/cart', shopController.getCart);
router.post('/cart', shopController.postCart);
router.post('/cart-delete-item', shopController.postCartDeleteBook);
router.get('/checkout', shopController.getCheckout);
router.post('/create-order', shopController.postOrders);
router.get('/orders', shopController.getOrders);

module.exports = router;

