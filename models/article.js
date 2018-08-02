const mongoose = require('mongoose')
const Schema   = mongoose.Schema

let articleSchema = new Schema({
    title: {
        type: String,
        required: [ true, 'Please input article title' ]
    },
    content: {
        type: String,
        required: [ true, 'Please input article content' ]
    },
    category: {
        type: String,
        required: [true, 'Please input article category']
    },
    author: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Users'
    }
}, {timestamps: true})


let Article =mongoose.model('Articles', articleSchema)

module.exports = Article