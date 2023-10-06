import Map, {NavigationControl,Marker} from 'react-map-gl';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

export default function MapCustom({location}) {
  const [latitude,longitude] = location.split(',')

  return (
      <Map mapLib={maplibregl} 
        initialViewState={{
          longitude: !isNaN(Number(longitude)) && Number(longitude) < 90 ? Number(longitude) : 16,
          latitude:  !isNaN(Number(latitude)) && Number(latitude) < 90? Number(latitude) : 49,
          zoom: 14
        }}
        style={{width: "100vw", height: "280px"}}
        mapStyle="https://api.maptiler.com/maps/streets/style.json?key=cQfIyzzmkb9xT9JPni3n"
      >
        <NavigationControl position="top-left" />
        <Marker
        longitude={!isNaN(Number(longitude))  && Number(longitude) < 90 ? Number(longitude) : 16}
        latitude={!isNaN(Number(latitude)) && Number(latitude) < 90 ? Number(latitude) : 49}
        color='#FF507D'
        />
      </Map>
  )
}
