const {Router } = require('express');
const router = Router();
const validacion = require('../../src/validaciones.js');
//Actividads
const asig_grupo = require('../controllers/asignar_grupos.controller')
router.get('/verAsignacionesGrupo',asig_grupo.getasig_grupos);
router.get('/verUsuariosGrupo/:id_grupo',asig_grupo.getUsuariosGrupo);
router.post('/asignarGrupo',validacion.verifyToken,asig_grupo.registro);
router.put('/reasignarGrupo/:id_grupo',validacion.verifyToken,asig_grupo.update);
router.delete('/deleteAsigGrupo/:id_grupo',validacion.verifyToken,asig_grupo.delete);
module.exports= router;