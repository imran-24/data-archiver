
import React, { useRef, useEffect, useState } from 'react';
import ReactMapGL, {
  GeolocateControl,
  Marker,
  NavigationControl,
} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import selectedListing from '@/hooks/selectdListing';
import Geocoder from './geocoder';


const SelectMap = ({latitude, longitude, onChange, rental_infos, showSearch}) => {

  const mapRef = useRef();

  const {selected} = selectedListing();
  const [viewport, setViewport] = useState({

    latitude: latitude || 23.8041,   // Replace with your initial latitude
    longitude: longitude || 90.4152, // Replace with your initial longitude
  });

  useEffect(()=>{
    if(selected){
      const item = rental_infos?.find( item => item.id == selected )
      console.log( item)
      if(item){
        setViewport({
          ...viewport,
          latitude: item.latitude,
          longitude: item.longitude,
        });
      }
    }
  },[selected])

  // useEffect(() => {
    
  //     if ("geolocation" in navigator) {
  //       navigator.geolocation.getCurrentPosition(function(position) {
  //         setViewport({
  //           ...viewport,
  //           latitude: position.coords.latitude,
  //           longitude: position.coords.longitude,
  //         });
  //       }, function(error) {
  //         console.error("Error getting location: " + error.message);
  //       });
  //     } else {
  //       console.error("Geolocation is not available in this browser.");
  //     }
    
    
  // }, []);

  // useEffect(()=>{
  //   if(value){
  //     setLatitude(value.lat);
  //     setLongitude(value.lng);
  //   }
  //   setViewport({
  //     ...viewport,
  //     latitude: latitude,
  //     longitude: longitude,
  //   });
  // },[value])
  
  useEffect(()=>{
    if(onChange){
    onChange({"lng": viewport.longitude, "lat": viewport.latitude})}
  },[viewport])

  return (
    <div className='h-full  w-full'>
    {
      (viewport.longitude !== null && viewport.latitude !== null) ?
      <ReactMapGL
        ref={mapRef}
        mapboxAccessToken="pk.eyJ1IjoiaW1yYW4xOTU2IiwiYSI6ImNsa3h0ajViOTAwaWEzbW5wdmY4M2M0OWIifQ.I423Zm6aT0dFSw-ocswIdQ"
        {...viewport}
        doubleClickZoom
        maxZoom={18}
        minZoom={14}
    
        initialViewState={{}}
        style={{ borderRadius: 6, padding: 6, minHeight: 300}}
        onViewportChange={(e) => 
          setViewport({
            ...viewport,
            latitude: e.lngLat.lat,
            longitude: e.lngLat.lng
          }) }
        mapStyle="mapbox://styles/mapbox/streets-v11"
      >
        <Marker
           latitude={viewport.latitude}
          longitude={viewport.longitude}
          draggable
          onDragEnd={(e) => 
            setViewport({
              ...viewport,
              latitude: e.lngLat.lat,
              longitude: e.lngLat.lng
            }) 
          }
        />
        <NavigationControl position="bottom-right" />
        <GeolocateControl
          position="top-left"
          trackUserLocation
          // onGeolocate={(e) =>
          //   dispatch({
          //     type: 'UPDATE_LOCATION',
          //     payload: { lng: e.coords.longitude, lat: e.coords.latitude },
          //   })
          // }
        />
        {showSearch && <Geocoder setViewport={setViewport} viewport={viewport} />}
      </ReactMapGL>
      : <div>Loading map</div>
    }
    </div>
  )
}

export default SelectMap