const conexion = require('./conexionDB')
const asig_actividades = {};
asig_actividades.getasig_actividades = async (req, res) => {
    const response = await conexion.query("SELECT * FROM public.asig_act inner join actividades on asig_act.id_act=actividades.id_act inner join usuarios on asig_act.id_user= usuarios.id_user");
    res.status(200).json(response.rows);
}
asig_actividades.getasig_actividadesG = async (req, res) => {
    const id = req.params.id_grupo;
    const response = await conexion.query(`SELECT * FROM public.asig_act inner join actividades on asig_act.id_act=actividades.id_act inner join usuarios on asig_act.id_user= usuarios.id_user where(select id_grupo from actividades where id_act = asig_act.id_act)= ${id}`);
    res.status(200).json(response.rows);
}
asig_actividades.registro = async(req, res) => {
    const{id_act,id_user}  = req.body;
    let query = `INSERT INTO asig_act(id_act,id_user)VALUES ('${id_act}','${id_user}')`;
    await conexion.query(query);
    res.json('Se ha asignado acitividad con exito');
}
asig_actividades.update = async (req, res) => {
    const{id_act,id_user}  = req.body;
    const id = req.params.id_user;
    let query = `UPDATE asig_act SET id_act='${id_act}',id_user='${id_user}' WHERE id_user='${id}'`;
    await conexion.query(query);
    res.json('Se ha reasignado actividad con exito');
}
asig_actividades.delete = async (req, res) => {
    const id = req.params.id_user;
    let query = `DELETE asig_act WHERE id_user='${id}'`;
    await conexion.query(query);
    res.json('Se ha eliminado  asignación con exito');
}
asig_actividades.getActividadesUsuario = async (req, res) => {
    const id = req.params.id_user;
    const response = await conexion.query(`SELECT * FROM public.asig_act inner join actividades on asig_act.id_act=actividades.id_act inner join usuarios on asig_act.id_user= usuarios.id_user where asig_act.id_user='${id}' order by fecha_act ASC`);
    res.status(200).json(response.rows);
}
module.exports = asig_actividades;