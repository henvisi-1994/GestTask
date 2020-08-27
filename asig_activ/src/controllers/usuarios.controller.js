const conexion = require('./conexionDB')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const SECRET_KEY = 'gesact**'
const usuarios = {};
usuarios.getusuarios = async (req, res) => {
    const response = await conexion.query("select *from usuarios");
    res.status(200).json(response.rows);
}
usuarios.registro = async(req, res) => {
    const {nombres_user,apellidos_user,email_user,celular_user,user_git_user,tipo_user,contrasena_user } = req.body;
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(contrasena_user, salt);
    let query = `INSERT INTO usuarios(nombres_user, apellidos_user, email_user, celular_user, user_git_user,tipo_user,contrasena_user)	VALUES ('${nombres_user}','${apellidos_user}','${email_user}','${celular_user}','${user_git_user}','${tipo_user}','${hash}')`;
    await conexion.query(query);
    const response = await conexion.query("select *from usuarios");
    const token = jwt.sign({ _id: response.rows[0].id_user }, SECRET_KEY)

    res.status(200).json({ token })
}
//Actualiza datos de Usuario mediante id
usuarios.update = async (req, res) => {
    const id = req.params.id_user;
    const {nombres_user,apellidos_user,email_user,celular_user,user_git_user,tipo_user } = req.body;
    let query = `UPDATE usuarios SET nombres_user='${nombres_user}', apellidos_user='${apellidos_user}', email_user='${email_user}', celular_user='${celular_user}', user_git_user='${user_git_user}', tipo_user='${tipo_user}' WHERE id_user = ${id}`;
    await conexion.query(query);
    res.json('Usuario Actualizado con exito');
}
usuarios.updateContrasena = async(req, res) => {
    let salt = bcrypt.genSaltSync(10);
    const id = req.params.id_user;
    const{contrasena_user} = req.body;
    let hash = bcrypt.hashSync(contrasena_user, salt);
    let query = `UPDATE usuarios SET contrasena_user = '${hash}'WHERE id_user = ${id}`;
    await conexion.query(query);
    res.json('Contraseña Actualizada con exito');
}
usuarios.confirmContrasena = async(req,res) => {
    const id = req.params.id_user;
    const{contrasena_user} = req.body;
    let query = `SELECT * FROM usuarios where id_user = '${id}'`;
    const user = await conexion.query(query);
    if (user.rows == 0) return res.status(401).json({ message: "Usuario no registrado" });
    if (!bcrypt.compareSync(contrasena_user, user.rows[0].contrasena_user)) return res.status(401).json({ message: "Password erroneo" })
    res.json('Contraseña Correcta');
}
//Elimina datos de usuario mediante id
usuarios.delete = async (req, res) => {
    const id = req.params.id_user;
    const response = await conexion.query('DELETE FROM usuario WHERE id_user =$1', [id]);
    res.json(`usuario ${id} Eliminado Satisfactoriamente`)
}
usuarios.loginUser = async (req, res) => {
    const { email_user, contrasena_user } = req.body;
    let query = `SELECT * FROM usuarios where email_user = '${email_user}'`;
    const user = await conexion.query(query);
    if (user.rows == 0) return res.status(401).json({ message: "Usuario no registrado" });
    if (!bcrypt.compareSync(contrasena_user, user.rows[0].contrasena_user)) return res.status(401).json({ message: "Password erroneo" })
   const token = jwt.sign({ _id: user.rows[0].id_user},SECRET_KEY);
    res.status(200).json({ token })
	
}
usuarios.authUsuario= async(req,res) => {
    const token = req.headers.authorization.split(' ')[1];
    const payload = await jwt.verify(token, SECRET_KEY);
    const id = payload._id;
    const response = await conexion.query('select *from usuarios WHERE id_user =$1', [id]);
	res.status(200).json(response.rows);
}
usuarios.grupoUsuario = async(req,res) => {
    const token = req.headers.authorization.split(' ')[1];
    const payload = await jwt.verify(token, SECRET_KEY);
    const id = payload._id;
    const response = await conexion.query('SELECT id_grupo	FROM public.asig_grupos where id_user =$1', [id]);
	res.status(200).json(response.rows);
}
module.exports = usuarios;
