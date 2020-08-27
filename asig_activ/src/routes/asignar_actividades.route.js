const {Router } = require('express');
const router = Router();
const validacion = require('../../src/validaciones.js');
//Actividads
const asig_activ = require('../controllers/asignar_actividad.controller')
router.get('/verAsignaciones/',asig_activ.getasig_actividades);
router.get('/verAsignaciones/:id_grupo',asig_activ.getasig_actividadesG);
router.get('/verActividadesUsuario/:id_user',asig_activ.getActividadesUsuario);
router.post('/asignarActividad',validacion.verifyToken,asig_activ.registro);
router.put('/reasignarActividad/:id_act',validacion.verifyToken,asig_activ.update);
router.delete('/deleteAsigActividad/:id_act',validacion.verifyToken,asig_activ.delete);

module.exports= router;