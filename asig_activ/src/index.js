`use strict`
const path = require('path')
const cors = require('cors');
const express = require('express')
const app = express()
const socketIO = require('socket.io')



//midelwares
//comunicar con otro servidor
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.set('port',process.env.PORT || 4000)

//static files
app.use(express.static(path.join(__dirname,'public')));

//rutas
app.use(require('./routes/usuarios.route'));
app.use(require('./routes/grupos.route'));
app.use(require('./routes/actividades.route'));
app.use(require('./routes/asignar_actividades.route'));
app.use(require('./routes/asignar_grupos.route'));

const mensajes = [];

const server=app.listen(app.get('port'),()=>{
    console.log('server on port', app.get('port'));
})

const io=socketIO.listen(server)

io.on('connection',(socket)=>{
    socket.on('enviar-mensaje',function(data){
        mensajes.push(data);
        socket.emit('enviar-texto',mensajes);
        socket.broadcast.emit('enviar-texto',mensajes);
    })
})
