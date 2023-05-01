import Head from 'next/head'
import Layout from "../component/Layout"
import * as env_config from "../utils/env_config"
import Map, {Source, Layer} from "react-map-gl"
import mapboxgl from 'mapbox-gl';
import React, { useState, useEffect } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';

export async function getServerSideProps() {
  const isLocal           = env_config.isLocal();
  const apiEndpoint       = String(          env_config.getApiEndpoint());
  const locationName      = String(isLocal ? env_config.getLocationName()      : "N/A");
  const locationLatitude  = String(isLocal ? env_config.getLocationLatitude()  : "N/A");
  const locationLongitude = String(isLocal ? env_config.getLocationLongitude() : "N/A");
  const mapBoxToken       = String(          env_config.getTokenMapBox());
  const googleToken       = String(          env_config.getTokenGoogleSignIn());

  return {
    props: { 
      isLocal,
      apiEndpoint,
      locationName,
      locationLatitude,
      locationLongitude,
      mapBoxToken,
      googleToken
    }
  }
}


export default function Home(props) {
  mapboxgl.accessToken = 'pk.eyJ1IjoiYWVrc3AiLCJhIjoiY2xmd2dtbDNhMGU4bjNjbWkwa2VqbzhhciJ9.LYgWVHhGLoY9T-ix_qC73g'; // GIT IGNORE !! 
  //const [loading, setLoading] = useState(true)

  const [infoRouteCar, setinfoRouteCar] = React.useState({}); // usar estado para almacenar infoRouteCar

  async function getCarRoute(props) {
    try {
      const response = await fetch(props.apiEndpoint + "/api/cars", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
      });
  
      const data = await response.json();
      console.log("getCarRoute " + JSON.stringify(data))
      setinfoRouteCar(data);
     } catch (error) {
      console.log("error");
      console.error('API request failed:', error);
      setinfoRouteCar("-1");
    }
  }

  const [infoRouteDrone, setinfoRouteDrone] = React.useState(null); // usar estado para almacenar infoRouteDrone
  async function getDroneRoute(props) {
    try {
      console.log("entra");
      const response = await fetch(props.apiEndpoint + "/api/drones", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({  })
      });
  
      const data = await response.json();
      console.log("getDroneRoute " + data)
      setinfoRouteDrone(data);
     } catch (error) {
      console.log("error");
      console.error('API request failed:', error);
      setinfoRouteDrone("-1");
    }
  }

  const [storeCoord, setStoreCoord] = React.useState({}); // usar estado para almacenar storeCoord
  async function getStoreCoordinates(props) {
    try {
      const response = await fetch(props.apiEndpoint + "/api/store_coordinates", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({  })
      });
      
      const data = await response.json();
      //console.log("getStoreCoordinates " + JSON.stringify(data))
      setStoreCoord(data);
    } catch (error) {
      console.log("error");
      console.error('API request failed:', error);
      setStoreCoord("-1");
    }
  }

  // Obtener la ruta desde la API Directions de Mapbox
  const [route, setRoute] = React.useState(null); // usar estado para almacenar route
  async function fetchData(iRC) {
    const response = await fetch(
      `https://api.mapbox.com/directions/v5/mapbox/driving/${iRC.car_longitude},${iRC.car_latitude};${iRC.dest_longitude},${iRC.dest_latitude}?geometries=geojson&alternatives=true&access_token=${mapboxgl.accessToken}`
    );
    const data = await response.json();
    // Agrega la línea para el recorrido
    setRoute(data.routes[0].geometry);
  }
  
  useEffect(() => {
    getDroneRoute(props);
    getCarRoute(props);
    getStoreCoordinates(props);
    fetchData(infoRouteCar); // llamada a fetchData() una vez que el componente está montado
    //setLoading(false);
  }, [/* infoRouteCar */]);

  const route_layer = {
    id: 'route',
    type: 'line',
    layout: {
      'line-join': 'round',
      'line-cap': 'round'
    },
    paint: {
      'line-color': '#0080ff',
      'line-width': 8
    }
  }
  
  const route_geojson = {
    type: 'FeatureCollection',
    features: [{
      type: "Feature",
      geometry: route
    }]
  };
  
  const [pointsGeojson, setPointsGeojson] = useState({})

  useEffect(() => {
    setPointsGeojson({
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [infoRouteCar.car_longitude, infoRouteCar.car_latitude],
          },
          properties: {
            title: 'Coche',
            icon: 'car',
          },
        },
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [infoRouteCar.dest_longitude, infoRouteCar.dest_latitude],
          },
          properties: {
            title: 'Tu destino',
            icon: 'marker',
          },
        },
      ],
    });
    }, [infoRouteCar]);

  const points_layer = {
    id: 'puntos-de-interes',
    type: 'symbol',
    layout: {
      'icon-image': '{icon}',
      'icon-size': 2,
      'text-field': '{title}',
      'text-offset': [0, 0.75],
      'text-anchor': 'top'
    }
  }

  const [storeGeojson, setStoreGeojson] = useState({})

  useEffect(() => {
    setStoreGeojson({
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [storeCoord.st_longitude, storeCoord.st_latitude]
          },
          properties: {
            title: 'Almacén',
            icon: 'industry'
          }
        }
      ]
    });
    }, [storeCoord]);

  const store_layer = {
    id: 'warehouse',
    type: 'symbol',
    layout: {
      'icon-image': '{icon}',
      'icon-size': 2,
      'text-field': '{title}',
      'text-offset': [0, 0.75],
      'text-anchor': 'top'
    }
  }

  console.log("--- getDroneRoute");
  console.log(infoRouteDrone);
  console.log("--- getCarRoute");
  console.log(infoRouteCar);
  console.log("--- getStoreCoordinates");
  console.log(storeCoord);

  return (
    <>
      <Head>
        <title>TransMedWebPTIN</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Layout>
          <Map 
            initialViewState={{
              longitude: props.locationLongitude,
              latitude: props.locationLatitude,
              zoom: 15
            }}
            mapboxAccessToken={props.mapBoxToken}
            style={{width: "100%", height: "100%" }}
            mapStyle="mapbox://styles/aeksp/clg9out5b000i01l0p2yiq26g"
          >
          <Source id="my-route" type="geojson" data={route_geojson}>
            <Layer {...route_layer}/>
          </Source>
          <Source id="my-points" type="geojson" data={pointsGeojson}>
            <Layer {...points_layer}/>
          </Source>
          <Source id="my-store" type="geojson" data={storeGeojson}>
            <Layer {...store_layer}/>
          </Source>
          </Map>
          {props.isLocal && <Map mapType="local"></Map>}
          
        </Layout>
      </main>
    </>
  )
}