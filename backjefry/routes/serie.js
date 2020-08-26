const express = require('express')
const series = require('../controllers/series')
const mdAuth = require('../middlewares/authenticated')
const api = express.Router()
const multipart = require('connect-multiparty')
const uploadSerie = multipart({ uploadDir: './assets/series' })

api.post('/create-serie', uploadSerie, series.create)
api.get('/getAllSeries/:page', mdAuth.authUser, series.findAll)
api.get('/getSerieFile/:name', series.getSerieFile)
api.get('/getTotalSeries', mdAuth.authUser, series.getTotalSeries)
module.exports = api;