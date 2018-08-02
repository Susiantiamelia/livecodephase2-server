var express = require('express');
var router = express.Router();
const articleController = require('../controller/article.js')

router.get('/', articleController.findAll)

router.get('/my-article', articleController.myArticle)

router.post('/post', articleController.create)

router.get('/search', articleController.search)

router.get('/by-category', articleController.getbyCategory)

router.put('/edit/:id', articleController.update)

router.delete('/delete/:id', articleController.remove)

router.get('/:id', articleController.findOne)

module.exports = router