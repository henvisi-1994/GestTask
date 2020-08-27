const path = require('path')
const express = require('express');
const cors = require('cors');
const http = require('http');
const app = express();
const server = http.createServer(app);

//midelwares
//comunicar con otro servidor
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//static files
app.use(express.static(path.join(__dirname,'public')));

//rutas
app.use(require('./routes/usuarios.route'));
app.use(require('./routes/grupos.route'));
app.use(require('./routes/actividades.route'));
app.use(require('./routes/asignar_actividades.route'));
app.use(require('./routes/asignar_grupos.route'));

//Documents and Settingsapp
app.set('port',process.env.PORT || 4000);

//inicio de servidor
app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
})
