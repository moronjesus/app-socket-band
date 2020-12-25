const BandList = require("./band-list");
const Server   = require("./server");

class Socket{

    constructor( io ){
        
        this.io = io;
        this.bandList = new BandList();

        this.socketEvents();

    }

    socketEvents(){

        //On connection
        this.io.on('connection', ( socket ) => { 

            //Emitir al cliente todas las bandas
            console.log('Cliente conectado');
            socket.emit( 'list-bands', this.bandList.getBands() );


            //votar por la banda 
            socket.on('vote-band', ({ id }) => { 

                this.bandList.incrementVotes( id ) 
                this.io.emit( 'list-bands', this.bandList.getBands() );

            });


            //eliminar banda
            socket.on('delete-band', ({ id }) =>{

                this.bandList.deletedBand( id );
                this.io.emit('list-bands', this.bandList.getBands() );
            });


            //Cambiar nombre d la banda
            socket.on('change-name-band', ({ id, name }) =>{

                this.bandList.changeName( id, name );
                this.io.emit('list-bands', this.bandList.getBands() );
            });


            //Agregar banda
            socket.on('create-band', ({ name }) =>{

                this.bandList.addBand( name );
                this.io.emit('list-bands', this.bandList.getBands() );
            })
              
        });
    }
}

module.exports = Socket