const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const ArticleMod = require('../models/article.js')
require('dotenv').config()
const key = process.env.SECRET_KEY;

class Article{

    static findAll(req,res){
        ArticleMod.find({})
        .populate('author')
        .then(articles => {
            res.status(200).json(articles)
        })
        .catch(err => {
            res.status(500).json(err.message)
        })
    }

    static findOne(req,res){
        ArticleMod.findById({_id : req.params.id})
        .populate('author')
        .then(article => {
            res.status(200).json(article)
        })
        .catch(err => {
            res.status(500).json(err.message)
        })
    }

    static create(req,res){
        let tokenUser = req.headers.token
        let user = jwt.verify(tokenUser, key)

        ArticleMod.create({
            title: req.body.title,
            content: req.body.content,
            category: req.body.category,
            author: user.id
        })
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(500).json(err.message)
        })
    }

    static update(req,res){
        let tokenUser = req.headers.token
        let user = jwt.verify(tokenUser, key)

        ArticleMod.updateOne({$and: [{_id: req.params.id}, {author: user.id }]},{
            title: req.body.title,
            content: req.body.content,
            category: req.body.category
        })
        .then(result => {
            res.status(200).json('success')
        })
        .catch(err => {
            res.status(500).json(err.message)
        })
    }

    static myArticle(req,res){
        let tokenUser = req.headers.token
        let user = jwt.verify(tokenUser, key)

        ArticleMod.find({author: user.id})
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(500).json(err.message)
        })
    }

    static getbyAuthor(req,res){

        ArticleMod.find({})
        .populate('author')
        .then(result => {
            let article = []
            for(let i = 0; i< result.length; i++){
                if(result[i].author.name === search){
                    article.push(result[i])
                }
            }
            res.status(200).json(article)
        })
        .catch(err => {
            res.status(500).json(err.message)
        })
    }

    static getbyCategory(req,res){
        ArticleMod.find({category: req.body.search})
        .populate('author')
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(500).json(err.message)
        })
    }

    static remove(req,res){
        let tokenUser = req.headers.token
        let user = jwt.verify(tokenUser, key)

        ArticleMod.deleteOne({$and: [{_id: req.params.id}, {author: user.id }]})
        .then(result => {
            res.status(200).json('success')
        })
        .catch(err => {
            res.status(500).json(err.message)
        })
    }
}

module.exports = Article