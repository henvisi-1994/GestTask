const {Router } = require('express');
const router = Router();
const validacion = require('../../src/validaciones.js');
//Usuarios
const usuarios = require('../controllers/usuarios.controller')
router.get('/usuarios',usuarios.getusuarios);
router.get('/usuarioauth',usuarios.authUsuario);
router.get('/usuariogrupo',usuarios.grupoUsuario);
router.post('/login',usuarios.loginUser);
router.post('/createUsuario',usuarios.registro);
router.put('/updateUsuario/:id_user',validacion.verifyToken,usuarios.update);
router.put('/updateContrasena/:id_user',usuarios.updateContrasena);
router.put('/confirmContrasena/:id_user',usuarios.confirmContrasena);
router.delete('/deleteUsuario/:id_user',validacion.verifyToken,usuarios.delete);

module.exports= router;