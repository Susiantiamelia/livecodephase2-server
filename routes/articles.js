var express = require('express');
var router = express.Router();
const articleController = require('../controller/article.js')

router.get('/', articleController.findAll)

router.post('/post', articleController.create)

router.get('/by-author', articleController.getbyAuthor)

router.get('/by-category', articleController.getbyCategory)

router.put('/edit/:id', articleController.update)

router.delete('/delete/:id', articleController.remove)

router.get('/:id', articleController.findOne)

module.exports = router