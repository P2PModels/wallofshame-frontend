import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-markercluster';
import mockReports from '../data/reports.json'
import markersByType from '../data/markersByType.json'

const Map = props => {
    const { ...other } = props

    let mapBounds = []
    mockReports.map((marker)=>{
     mapBounds.push([marker.lat,marker.lng])
    })

    let icons = {}
    for(let type in markersByType){
        icons[type] = L.icon(markersByType[type])
    }

    return (
        <MapContainer
            bounds={mapBounds}
            zoom={13}
            scrollWheelZoom={true}
            {...other}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MarkerClusterGroup>    
            {
                mockReports.map((marker)=>{
                    return (
                        <Marker position={[marker.lat, marker.lng]} icon={icons[marker.type]} key={marker.author + '-report'}>
                            <Popup>
                                <h3>
                                    {marker.author}
                                </h3>
                                <h4>
                                    {marker.company + ' ' + marker.type} 
                                </h4>
                                <p>{marker.description}</p>
                            </Popup>
                        </Marker>
                    )
                })
            }
            </MarkerClusterGroup>
        </MapContainer>
    )
}

export default Map
