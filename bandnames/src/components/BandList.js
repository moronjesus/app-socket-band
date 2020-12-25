import React, { useEffect, useState } from 'react'

export const BandList = ( { bandsList, vote, deleteBand, changeNameBand } ) => {

    const [ bands, setBands ]         = useState( bandsList );

    useEffect(() => {
       
        setBands(bandsList);

    }, [bandsList]);


    const changeName =( e, id ) =>{
        
        const newName = e.target.value;

        setBands( bands => bands.map(( band ) =>{
            if(band.id === id){
                band.name = newName;
            }
           
            return band;
        }));
    }

    
    const onBlurInput = ( id ,name ) =>{

        changeNameBand( id, name );
        
    }
   

    const createRow = () =>{

        return(
            bands.map(( band ) =>(

                <tr key={band.id} >
                <td>
                    <button 
                        className="btn btn-primary"
                        onClick={ () => vote( band.id )}
                    > 
                    +1 </button>
                </td>
                <td>
                    <input 
                        type="text" 
                        className="form-control" 
                        value={ band.name }
                        onChange={( event ) => changeName( event, band.id )}
                        onBlur={ () => onBlurInput( band.id, band.name )}
                    >
                    </input>
                </td>
                <td><h3> {band.votes} </h3></td>
                <td> 
                    <button 
                        className="btn btn-danger"
                        onClick= {() => deleteBand( band.id )}
                    >
                     Borrar </button>
                </td>
            </tr>

            ))
           
        )
    }

    return (
        <>
            <table className="table table-stripped">
                <thead>
                    <tr>
                        <th>Incremet</th>
                        <th>Name</th>
                        <th>Vote</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    { createRow() }
                </tbody>
            </table>
        </>
    )
}

export default BandList
