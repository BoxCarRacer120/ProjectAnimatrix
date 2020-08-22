// module.exports = (app) => {
//     const song = require('../controllers/song')
//     const multipart = require('connect-multiparty')
//     const uploadSong = multipart({uploadDir: './assets/songs'})

//     app.post('/create-song', uploadSong, song.create)
// }
const express = require('express')
const cap = require('../controllers/caps')
const mdAuth = require('../middlewares/authenticated')


const api = express.Router()
const multipart = require('connect-multiparty')
const uploadSong = multipart({ uploadDir: './assets/caps' })

api.post('/create-song', uploadSong, cap.create)
//api.put('/update-song/:idSong', mdAuth.authUser, uploadSong, cap.update)
api.get('/getAll/:page', mdAuth.authUser, cap.findAll)
api.get('/getSongFile/:nameCap', cap.getCapFile)
api.get('/getTotalSongs', mdAuth.authUser, cap.getTotalCaps)

module.exports = api