const mongoose = require('mongoose')
const Schema = mongoose.Schema


const AlbumSchema = Schema({
    name: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    genre: { type: String, required: true }, // 
    sinopsis: String,
    precluela: String,
    secuela: String,
    image: String,
    serieId: Number,
    characters: { type: String, required: true },
})


module.exports = mongoose.model('Album', AlbumSchema)