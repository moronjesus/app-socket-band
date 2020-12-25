const express    = require('express');
const http       = require('http');
const socketio   = require('socket.io');
const path       = require('path');
const cors       = require('cors');

const Socket     = require('./sockets');


class Server {

    constructor(){

        this.app = express();
        this.port = process.env.PORT;

        //http server
        this.server = http.createServer( this.app );

        //Configuracion de sockets
        this.io = socketio( this.server , {cors: {
            origin: "*",
            methods: ["GET", "POST"]
          }});

    }

    middlewares(){
        
        //Desplegar el directorio público
        this.app.use(express.static( path.resolve(__dirname, '../public')));

        //Cors
        this.app.use( cors() );
    }

    settingSockets(){

        new Socket( this.io );

    }

    execute(){

        //Inicializar middlewares
        this.middlewares();

        //Inicializar Socket
        this.settingSockets();

        //Inicializar Servidor
        this.server.listen( this.port, () =>{
            console.log('Server corriendo en el puerto:', this.port );
        });
    }
    

}

module.exports = Server