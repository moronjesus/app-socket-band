import React, { useState } from 'react'

export const BandAdd = ({ createBand }) => {

    const [ valueInput, setValueInput ] = useState('')

    const onSubmit = (ev) => {
        
        ev.preventDefault();

        if(valueInput.trim().length > 0 ) {

            createBand( valueInput );
            setValueInput('');

        } 

    }

    return (
        <>
           <h3>Agregar Banda</h3>
            <form onSubmit={ onSubmit } >
                <input 
                    placeholder=" nuevo nombre de banda" 
                    className="form-control"
                    value = { valueInput }
                    onChange = { ( e ) => setValueInput( e.target.value )}
                >
                </input>   
            </form> 
        </>
    )
}

export default BandAdd;
