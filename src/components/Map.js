import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import MapScrollZoomOnFocus from './MapScrollZoomOnFocus'
import MarkerClusterGroup from 'react-leaflet-markercluster'
import useCases from '../providers/CasesProvider/use'
// import mockReports from '../data/reports.json'
import { regionToLatLng, markersByType } from '../data/config.json'
import { Typography } from '@material-ui/core'
import { useAppState } from '../providers/AppStateProvider/use'
import { findChildObject } from '../helpers/general-helpers'

// TODO: redraw on zoom change
const Map = props => {
    const { ...other } = props
    const casesContext = useCases()
    const {setRegion} = useAppState()

    if (casesContext.loading) {
        return <Typography>Loading map...</Typography>
    } else if (casesContext.error) {
        return <Typography>{casesContext.error.message}</Typography>
    } else {
        const cases = casesContext.cases

        // Set map boundaries to inlcude all marker(cases)
        let mapBounds = []
        cases.map(c => {
            const bounds = regionToLatLng[c.region]
            mapBounds.push([bounds.lat, bounds.lng])
        })

        // Mock data
        // Set map boundaries to inlcude all markers
        // let mapBounds = []
        // mockReports.map(marker => {
        //     mapBounds.push([marker.lat, marker.lng])
        // })

        // Set marker icons by type
        let icons = {}
        for (let type in markersByType) {
            icons[type] = L.icon(markersByType[type])
        }

        return (
            <MapContainer
                bounds={mapBounds}
                zoom={13}
                scrollWheelZoom={false}
                {...other}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {/* Enable map controls on focus, disable on blur */}
                <MapScrollZoomOnFocus>
                    <MarkerClusterGroup
                        onClick={cluster => {
                            const r = findChildObject(cluster.latlng, regionToLatLng)
                            r ? setRegion(r) : console.log("<Map> No matching region found")
                            console.warn('Cluster clicked!', cluster)
                        }}
                    >
                        {cases.map(c => {
                            // {mockReports.map(marker => {
                            const bounds = regionToLatLng[c.region]
                            return (
                                <Marker
                                    position={[bounds.lat, bounds.lng]}
                                    icon={icons[c.caseType]}
                                    key={c.id + '-report'}
                                >
                                    <Popup>
                                        <h3>{`Case #${c.id}`}</h3>
                                        <h4>
                                            {c.companyName + ' ' + c.caseType}
                                        </h4>
                                        <p>{c.description}</p>
                                    </Popup>
                                </Marker>
                            )
                        })}
                    </MarkerClusterGroup>
                </MapScrollZoomOnFocus>
            </MapContainer>
        )
    }
}

export default Map
