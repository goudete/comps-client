import React, { Component } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';


class Map extends React.Component {
  constructor(props){
    super(props)
  }

  render() {
    const containerStyle = {
      width: '600px',
      height: '550px'
    };
    
    const center = {
      lat: 34.007,
      lng: -118.446
    };
    
    const locations = [
      {
        name: 'Venice, CA',
        location : {
          lat: 33.993118,
          lng: -118.456200
        }
      },
      {
        name: 'Puerto Escondido, Oax',
        location : {
          lat: 15.862750,
          lng: -97.068367
        }
      }
    ];

    return (
      <div className="map">
        <LoadScript googleMapsApiKey="AIzaSyAftwrvS2Mphv821bXwZMOR3EmC6esH8Fk">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={12}
          >
           {
            locations.map((l) => (
              <Marker
                position={l.location}
              />
            ))
           }
          </GoogleMap>
        </LoadScript>
      </div>
    );
  }
}

export default Map;
