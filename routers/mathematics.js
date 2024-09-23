const express = require('express');
const routersMatematicas = express.Router();

const { matematicas } = require('../data/cursos').infoCurso;

routersMatematicas.get('/', (req, res) => {
    res.send(matematicas);
});

routersMatematicas.get('/:matematicas', (req, res) => {
    const matematicas = req.params.matematicas;
    const result = matematicas.filter(curso => curso.subject === matematicas );

    if (result.length === 0) {
        return res.status(203).send(`No se encontro el curso de ${matematicas}`)
    };

    res.send(result);
});

module.exports = routersMatematicas;