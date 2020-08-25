const mongoose = require('mongoose')
const Schema = mongoose.Schema


const CapsSchema = new mongoose.Schema({
    seriesId: { type: Number, required: true },
    capNumber: { type: Number, required: true },
    capName: { type: String, required: true },
    duration: { type: String, required: true },
    file: { type: String, required: true },
})


module.exports = mongoose.model('Caps', CapsSchema)