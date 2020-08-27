const {Router } = require('express');
const router = Router();
const validacion = require('../../src/validaciones.js');
//Actividads
const actividades = require('../controllers/actividades.controller')
router.get('/actividades',actividades.getactividades);
router.post('/createActividad',validacion.verifyToken,actividades.registro);
router.get('/actividadesGrupo/:id_grupo',actividades.getactividadesGrupo);
router.put('/updateActividad/:id_act',validacion.verifyToken,actividades.update);
router.delete('/deleteActividad/:id_act',validacion.verifyToken,actividades.delete);

module.exports= router;