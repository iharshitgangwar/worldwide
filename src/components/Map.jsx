import { useNavigate, useSearchParams } from 'react-router-dom'
import styles from './Map.module.css'
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import { useEffect, useState } from 'react';
import { useCities } from '../contexts/CitiesContext';
import { useGeoLocation } from '../hooks/useGeoLocation'
import Button from './Button';
import { useUrlPosition } from '../hooks/useUrlPosition';
import User from './User';
function Map() {
     const { lat, lng } = useUrlPosition()
     const [position, setPosition] = useState(['40', '0'])
     const { cities } = useCities()
     const { isLoading: isLoadingPosition, position: geoLocationPosition, getPosition } = useGeoLocation()
     useEffect(() => {
          if (lat && lng) {
               setPosition([lat, lng])
          }
     }, [lat, lng])
     useEffect(() => {
          if (geoLocationPosition) {
               setPosition([geoLocationPosition.lat, geoLocationPosition.lng])
          }
     }, [geoLocationPosition])
     return (
          <div className={styles.mapContainer}>
               <User />
               <Button type="position" onClick={getPosition}>{isLoadingPosition ? 'Loading....' : 'Your Position'}</Button>
               <MapContainer center={position} zoom={13} scrollWheelZoom={true} className={styles.map}>
                    <TileLayer
                         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                         url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                    />
                    {cities &&
                         <>{cities.map(city =>
                              <Marker position={[city.position?.lat, city.position?.lng]} key={city.id}>
                                   <Popup>
                                        <span>{city.emoji}</span>
                                        <span>{city.cityName}</span>
                                   </Popup>
                              </Marker>
                         )}</>}

                    {geoLocationPosition && <Marker position={[geoLocationPosition.lat, geoLocationPosition.lng]}>
                         <Popup>
                              <h1>You are here</h1>
                         </Popup>
                    </Marker>}
                    <ChangeView position={position} />
                    <MapSelecter />
               </MapContainer>
          </div>
     )
}
function ChangeView({ position }) {
     const map = useMap()
     map.setView(position)
     return null
}

function MapSelecter() {
     const navigate = useNavigate()
     const [selectedLocation, setSelctedLocation] = useState([])
     const map = useMapEvents({

          click: (e) => {
               navigate(`form/?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
               setSelctedLocation([e.latlng.lat, e.latlng.lng])
          },
          locationfound: (location) => {

          },
     })
     return (
          <>
               {selectedLocation.length
                    &&
                    <Marker position={selectedLocation}>
                    </Marker>}</>
     )

}

export default Map
