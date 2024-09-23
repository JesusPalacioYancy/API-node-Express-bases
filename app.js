const express = require('express');
const app = express();

const { infoCurso } = require('./data/cursos');


// Puerto
const PORT = process.env.PORT || 3000;

// Routing
app.get('/', (req, res) => {
    res.send('Mi primer servidor.');
});


app.get('/api/cursos', (req, res) => {
    res.send(infoCurso);
});

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
});


// Routers
const routersProgramacion = require('./routers/programming')
app.use('/api/cursos/programacion', routersProgramacion)

const routersMatematicas = require('./routers/mathematics');
app.use('/api/cursos/matematicas', routersMatematicas)


// Middleware para manejar Routers no encontrados
app.use((req, res, next) => {
    res.status(404).send({ error: 'Ruta no encontrada' });
});

// Middleware para manejar errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ error: 'Ha ocurrido un error en el servidor' });
});