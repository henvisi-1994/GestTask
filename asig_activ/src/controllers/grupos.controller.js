const conexion = require('./conexionDB')
const grupos = {};
grupos.getgrupos = async (req, res) => {
    const response = await conexion.query("select *from grupos");
    res.status(200).json(response.rows);
}
grupos.registro = async(req, res) => {
    const{nombre_grupo}  = req.body;
    let query = `INSERT INTO grupos(nombre_grupo)VALUES ('${nombre_grupo}')`;
    await conexion.query(query);
    res.json('Gupo Ingresado con exito');
}
grupos.update = async (req, res) => {
    const{nombre_grupo}  = req.body;
    const id = req.params.id_grupo;
    let query = `UPDATE grupos SET nombre_grupo='${nombre_grupo}' WHERE id_grupo='${id}'`;
    await conexion.query(query);
    res.json('Grupo Ingresado con exito');
}
grupos.delete = async (req, res) => {
    const id = req.params.id_grupo;
    let query = `DELETE from grupos WHERE id_grupo='${id}'`;
    await conexion.query(query);
    res.json('Grupo eliminado con exito');
}
module.exports = grupos;