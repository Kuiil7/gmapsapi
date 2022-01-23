import React, {useState, useEffect } from 'react';
import axios from 'axios';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

require('dotenv').config()

export default function App() {

  const [data, setData] = useState([]);
  const [query, setQuery] = useState('');
  const [url, setUrl] = useState(`https://api.openbrewerydb.org/breweries/search?query=${query}`);



  useEffect(() => {
    const fetchData = async () => {
     const result = await axios(url);
      setData(result.data);
      console.log(result.data)
    };
    fetchData();
  }, [url]);

  const containerStyle = {
    width: '100%',
    height: '400px'
  };

  const center = {
    lat: -3.745,
    lng: -38.523
  };






  return (
  <>


<div className="columns">
  <div className="column is-3">
  <p className="title is-3  p-4 ">Search Breweries</p>
  </div>
  <div className="column">
  <form onSubmit={event => {
        setUrl(`https://api.openbrewerydb.org/breweries/search?query=${query}`);
        event.preventDefault();
      }}>
  <div className="column is-8 ">
  <input
          type="text"
          value={query}
          onChange={event => setQuery(event.target.value)}
          className="input is-primary mb-2  is-rounded"
          placeholder="enter a city "

        />
   <button className="button is-small is-rounded is-primary" type="submit">Search</button>
  </div>
 </form>
  </div>
</div>


<div className="container scrolling-wrapper pb-4 pl-4 ">
<div className="columns p-2 is-mobile  ">

<LoadScript
      googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={1}
      >

{ data.map((marker, markerIndex)=> (


<div key={markerIndex}>
<p>test</p>



<Marker

      position={{ lat: parseFloat(marker.latitude), lng: parseFloat( marker.longitude)}}

    />

</div>
 ))}



       <></>
      </GoogleMap>
    </LoadScript>
</div>

</div>

    </>
  );
}