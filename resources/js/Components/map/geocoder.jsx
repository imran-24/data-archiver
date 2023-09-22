import MapBoxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { useControl } from 'react-map-gl';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

const Geocoder = ({value, viewport, setViewport}) => {
//   const { dispatch } = useValue();
  const ctrl = new MapBoxGeocoder({
    accessToken: "pk.eyJ1IjoiaW1yYW4xOTU2IiwiYSI6ImNsa3h0ajViOTAwaWEzbW5wdmY4M2M0OWIifQ.I423Zm6aT0dFSw-ocswIdQ",
    marker: false,
    collapsed: true,
  });
  useControl(() => ctrl);
  ctrl.on('result', (e) => {
    const coords = e.result.geometry.coordinates;
    setViewport({
      ...viewport,
      latitude: coords[1],
      longitude: coords[0]
    }) 
    // dispatch({
    //   type: 'UPDATE_LOCATION',
    //   payload: { lng: coords[0], lat: coords[1] },
    // });
  });
  return null;
};

export default Geocoder;