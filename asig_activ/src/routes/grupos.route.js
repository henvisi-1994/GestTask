const {Router } = require('express');
const router = Router();
const validacion = require('../../src/validaciones.js');
//Grupos
const grupos = require('../controllers/grupos.controller')
router.get('/grupos',grupos.getgrupos);
router.post('/createGrupo',grupos.registro);
router.put('/updateGrupo/:id_grupo',validacion.verifyToken,grupos.update);
router.delete('/deleteGrupo/:id_grupo',validacion.verifyToken,grupos.delete);

module.exports= router;