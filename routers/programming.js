const express = require('express');
const routersProgramacion = express.Router();

const { programacion } = require('../data/cursos').infoCurso;

// Middleware
routersProgramacion.use(express.json());

// GET ALL
routersProgramacion.get('/', (req, res) => {
    res.send(programacion);
});

// GET Sort Views
routersProgramacion.get('/:language', (req, res) => {
    const language = req.params.language;
    const result = programacion.filter(curso => curso.language === language );

    if (result.length === 0) {
        return res.status(203).send(`No se encontro el curso de ${language}`)
    };

    if (req.query.ordenar === 'vista') {
        return res.send(result.sort((a, b) => b.views - a.views));
    };

    res.send(result);
});

// GET two prams
routersProgramacion.get('/:language/:level', (req, res) => {
    const lenguage = req.params.language;
    const level = req.params.level;

    const result = programacion.filter(curso => curso.language === lenguage && curso.level === level);

    if(result.length === 0) {
        return res.status(203).send(`No se enotro el curso de ${lenguage} de nivel ${level}`)
    };

    res.send(result)
});

// POST
routersProgramacion.post('/', (req, res) => {
    const newCourse = req.body;
    programacion.push(newCourse);

    res.send(programacion);
});


// PUT 
routersProgramacion.put('/:id', (req, res) => {
    const updateCourse = req.body; 
    const id = req.params.id;

    const index = programacion.findIndex(curso => curso.id == id)

    if (index >= 0) { 
        programacion[index] = updateCourse;
    } else {
        return res.status(203).send(`Dicho curso no se enconetra en nuestros reguistros`)
    };

    res.send(programacion);
});

// PATCH
routersProgramacion.patch('/:id', (req, res) => {
    const newInfo = req.body; 
    const id = req.params.id;

    const index = programacion.findIndex(curso => curso.id == id)

    if (index >= 0) {
        Object.assign(programacion[index], newInfo)
    } else {
        return res.status(203).send(`Dicho curso no se enconetra en nuestros reguistros`)
    };


    res.send(programacion)
});

// DELATE
routersProgramacion.delete('/:id', (req, res) => {
    const id = req.params.id;
    const index = programacion.findIndex(curso => curso.id == id)

    if(index >= 0) {
        programacion.splice(index, 1)
    } else {
        return res.status(203).send(`Dicho curso no se enconetra en nuestros reguistros`)
    };

    res.send(programacion)
});


routersProgramacion.use((req, res, next) => {
    res.status(404).send({ error: 'Ruta no encontrada' })
});

module.exports = routersProgramacion;