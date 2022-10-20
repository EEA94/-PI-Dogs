const { Router } = require('express');
const { dogs, dogId, dogPost, temperament } = require('../controllers')
// const controller = require('../controllers')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/dogs",dogs);
router.get("/dogs/:id",dogId);
router.get("/temperament",temperament);
router.post("/dog",dogPost);


module.exports = router;
