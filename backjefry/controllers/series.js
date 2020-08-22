const Serie = require('../models/series')

let fs = require('fs');
const path = require('path')

function verificarDatos(req, res) {
    console.log("req --->", req.body)
    if (!req.body) {
        return res.status(400).send({ message: 'El contenido no puede estar vacío' })
    }

    if (!req.files) {
        return res.status(400).send({
            message: 'Debes ingresar el archivo'
        })
    }
}


function obtenerImagen(req) {
    let routeFile = req.files.file.path //Obtenemos la ruta del archivo
    let splitFile = routeFile.split('\\')
    return splitFile[splitFile.length - 1]
}

exports.create = (req, res) => {

    verificarDatos(req, res)

    Serie.countDocuments().then(count => {
        const serie = new Serie({
            seriesId: count + 1,
            //capNumber: req.body.capNumber, /** */
            capName: req.body.capName,/** */
            duration: req.body.duration,
            file: obtenerImagen(req),
        })

        serie.save().then(data => {
            res.send(data)
        }).catch(err => {
            res.status(500).send({
                message: err.message || 'Error al subir capitulo'
            })
        })
    })
}

exports.findAll = (req, res) => {
    let page = ((req.params.page - 1) * 10)

    let name = new RegExp(`.*${req.query.searchBy || ''}.*`, 'i')

    Serie.find({ name: name }, null, { skip: page, limit: 10 })
        .populate('author')
        .exec()
        .then(songs => {
            res.send(songs)
        }).catch(error => {
            res.status(500).send({
                message: error.message || "Error al obtener la serie"
            })
        })
}

exports.getSerieFile = (req, res) => {
    const serieRoute = './assets/series/' + req.params.nameSong;
    fs.exists(songRoute, (exist) => {
        if (exist) {
            res.sendFile(path.resolve(songRoute))
        } else {
            res.status(404).send({
                message: "El archivo no existe"
            })
        }
    })
}

exports.getTotalCaps = (req, res) => {
    Serie.countDocuments().then(count => {
        res.status(200).send({
            total: count
        })
    }).catch(error => {
        res.status(500).send({
            message: error.message || "error al obtener el capitulo"
        })
    })
}
