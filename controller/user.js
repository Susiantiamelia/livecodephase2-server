const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user.js')
require('dotenv').config()
const key = process.env.SECRET_KEY;


class Users{

    static register(req,res){
        let salt = bcrypt.genSaltSync(8);
        let password = bcrypt.hashSync(req.body.password, salt);
        
        User.create({
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            password: password,
        })
        .then( result => {
            console.log(result)
            res.status(200).json('Successfully Register')
        })
        .catch(err => {
            res.status(500).json(err.message)
        })
    }

    static login(req,res){
        console.log(req.body)
        User.find({$or: [{email: req.body.uname_email}, {username: req.body.uname_email}]})
        .then(user => {
            if(user.length !=0){
                let checkPass = bcrypt.compareSync(req.body.password, user[0].password);
                if(checkPass){
                    let token = jwt.sign({ id: user[0]._id, name: user[0].name , email: user[0].email}, key);
                    res.status(200).json({msg: `Happy to see you again ${user[0].full_name}`, token: token})
                } else {
                    res.status(400).json({error: 'Wrong password'})
                }
            } else {
                res.status(400).json({error: 'Your email/username is wrong'})
            }
        })
        .catch(err => {
            res.status(500).json(err.message)
        })
    }

    static profile(req,res){
        let tokenUser = req.headers.token
        let user = jwt.verify(tokenUser, key)

        User.find({_id: user.id})
        .then(userData => {
            res.status(200).json({user: userData})
        })
        .catch(err => {
            res.status(400).json(err.message)
        })
    }


    static update(req,res){
        let tokenUser = req.headers.token
        let user = jwt.verify(tokenUser, key)

        User.updateOne({_id: user.id},{
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
        })
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(400).json(err.message)
        })

    }   
    
    static delete(req,res){
        User.deleteOne({_id: req.params.id})
        .then(result => {
            res.status(200).json("Account deleted")
        })
        .catch(err => {
            res.status(400).json(err.message)
        })
    }
}

module.exports = Users