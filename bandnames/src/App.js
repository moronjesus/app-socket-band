import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'

import BandAdd from './components/BandAdd'
import BandList from './components/BandList'

const connectSocket = () => {

  return io.connect('http://localhost:8080', {
    transport: ['websocket']
  });

}

function App() {

  const [ socketClient ]       = useState(connectSocket());
  const [ online, setOnline ]  = useState(false);
  const [ bands, setBands ]    = useState([])


  useEffect(() => {

    setOnline( socketClient.connected )

  }, [ socketClient ])

  useEffect(() => {

    socketClient.on('connect', () =>{

      setOnline( true )

    })

  }, [ socketClient ]);

  useEffect(() => {

    socketClient.on('disconnect', () =>{

      setOnline( false )

    })

  }, [ socketClient ]);


  useEffect(() => {

    socketClient.on('list-bands', (data) => {

      setBands(data);
  
    });

  }, [socketClient]);


  const vote =( id ) =>{

      socketClient.emit('vote-band', {id} )

  }

  const deleteBand = ( id ) => {

      socketClient.emit('delete-band', {id})

  }

  const changeNameBand = ( id, name ) => {

    socketClient.emit('change-name-band', {id, name})

  }

  const createBand =( name ) => {

    socketClient.emit('create-band', { name })

  }


  return (
    <div className="container">

      <div className="alert">
        <p>Service status :
          {
            online 
            ?
            <span className="text-success"> Online </span>
            :
            <span className="text-danger"> Offline </span>
          }

        </p>
      </div>

      <h1>Band Name</h1>
      <hr />
      <div className="row">
        <div className="col-8">
          BandList
           <BandList 
              bandsList = { bands } 
              vote = { vote }
              deleteBand = { deleteBand }
              changeNameBand = { changeNameBand }
           />
        </div>
        <div className="col-4">
          BandAdd
            <BandAdd 
              createBand = { createBand }
            />
        </div>

      </div>

    </div>
  );
}

export default App;
