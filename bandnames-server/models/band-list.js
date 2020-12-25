const Band = require('./band');

class BandList {

    constructor(){

        this.bands = [
            new Band('banda1'),
            new Band('banda2'),
            new Band('banda3'),
            new Band('banda4'),
            new Band('banda5'),
        ];
    }


    addBand( name ){

        const newBand = new Band( name );
        this.bands.push( newBand );
        return this.bands;

    }


    deletedBand( id ){
        
        this.bands = this.bands.filter( ( band ) => band.id !== id );
      
    }

    getBands(){

        return this.bands;

    }


    incrementVotes( id ){

        this.bands = this.bands.map(( band ) =>{
            if( band.id === id ){
                band.votes += 1
            }

            return band;
        }) 

    }


    changeName( id, newName ){

        this.bands = this.bands.map(( band ) =>{
            if( band.id === id ){
                band.name = newName
            }

            return band;
        }) 
          
    }


}

module.exports = BandList
