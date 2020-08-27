const conexion = require('./conexionDB')
const asig_grupos = {};
asig_grupos.getasig_grupos = async (req, res) => {
    const response = await conexion.query("SELECT * FROM asig_grupos inner join usuarios on asig_grupos.id_user = usuarios.id_user inner join grupos on asig_grupos.id_grupo=grupos.id_grupo");
    res.status(200).json(response.rows);
}
asig_grupos.registro = async(req, res) => {
    const{id_user,id_grupo}  = req.body;
    let query = `INSERT INTO asig_grupos(id_user,id_grupo)VALUES ('${id_user}','${id_grupo}')`;
    await conexion.query(query);
    res.json('Se ha asignado acitividad con exito');
}
asig_grupos.update = async (req, res) => {
    const{id_user,id_grupo}  = req.body;
    const id = req.params.id_user;
    let query = `UPDATE asig_grupos SET id_grupo='${id_grupo}' WHERE id_user='${id}'`;
    await conexion.query(query);
    res.json('Se ha reasignado actividad con exito');
}
asig_grupos.delete = async (req, res) => {
    const id = req.params.id_user;
    let query = `DELETE asig_grupos WHERE id_user='${id}'`;
    await conexion.query(query);
    res.json('Se ha eliminado  asignación con exito');
}
asig_grupos.getUsuariosGrupo = async (req, res) => {
    const id = req.params.id_grupo;
    const response = await conexion.query(`SELECT * FROM asig_grupos inner join usuarios on asig_grupos.id_user = usuarios.id_user inner join grupos on asig_grupos.id_grupo=grupos.id_grupo where asig_grupos.id_grupo ='${id}'`);
    res.status(200).json(response.rows);
}

module.exports = asig_grupos;