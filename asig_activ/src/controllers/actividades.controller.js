const conexion = require('./conexionDB')
const actividades = {};
actividades.getactividades = async (req, res) => {
    const response = await conexion.query("select *from actividades");
    res.status(200).json(response.rows);
}
actividades.registro = async(req, res) => {
    const{nom_act,id_grupo,fecha_act}  = req.body;
    let query = `INSERT INTO actividades(nom_act,id_grupo,fecha_act)VALUES ('${nom_act}','${id_grupo}','${fecha_act}')`;
    await conexion.query(query);
    res.json('Gupo Ingresado con exito');
}
actividades.update = async (req, res) => {
    const{nom_act,id_grupo,fecha_act}  = req.body;
    const id = req.params.id_act;
    let query = `UPDATE actividades SET nom_act='${nom_act}',id_grupo='${id_grupo}',fecha_act= '${fecha_act}'  WHERE id_act='${id}'`;
    await conexion.query(query);
    res.json('Grupo Ingresado con exito');
}
actividades.delete = async (req, res) => {
    const id = req.params.id_act;
    let query = `DELETE actividades WHERE id_act='${id}'`;
    await conexion.query(query);
    res.json('Grupo eliminado con exito');
}
actividades.getactividadesGrupo = async (req, res) => {
    const id = req.params.id_grupo;
    const response = await conexion.query(`SELECT * FROM public.actividades inner join grupos on actividades.id_grupo = grupos.id_grupo where grupos.id_grupo='${id}'`);
    res.status(200).json(response.rows);
}
module.exports = actividades;