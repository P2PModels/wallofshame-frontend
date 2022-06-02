import React, { useState } from 'react'
import {
    MapContainer,
    TileLayer,
    Marker,
    ZoomControl,
} from 'react-leaflet'
import MapScrollZoomOnFocus from './MapScrollZoomOnFocus'
import MarkerClusterGroup from 'react-leaflet-markercluster'
import useCases from '../providers/CasesProvider/use'
import { regionToLatLng, markersByType } from '../data/config.json'
import { Typography } from '@material-ui/core'
import { useAppState } from '../providers/AppStateProvider/use'
import Skeleton from '@mui/material/Skeleton';
import LoadingRectangle from './Shared/LoadingRectangle'
import {
    findChildObject,
    filterCasesByRegion,
} from '../helpers/general-helpers'
import CaseCardList from './CaseCardList'
import { regionToRegionRenderName } from '../data/config.json'


const Map = props => {
    const { ...other } = props
    const casesContext = useCases()
    const { region, setRegion } = useAppState()
    const [listState, setListState] = useState(false)
    const clusterClicked = cluster => {

        // Find region match by lat adn lng
        const r = findChildObject(cluster.latlng, regionToLatLng)

        // Update global state and open list of case cards
        if (r) {
            setRegion(r)
            setListState(true)
        } else {
            console.log('<Map> No matching region found')
        }
    }

    if (casesContext.loading) {
        //return <Typography>Loading map...</Typography>
        return (
            <Skeleton variant='rectangular' height={600} width={2000}></Skeleton>
            )

    } else if (casesContext.error) {
        return <Typography>{casesContext.error.message}</Typography>
    } else {
        const cases = casesContext.cases
        
        // Set map boundaries to inlcude all marker(cases)
        let mapBounds = []
        cases.map(c => {
            if(c.region != "" && c.description != ""){
                const bounds = regionToLatLng[c.region]
                mapBounds.push([bounds.lat, bounds.lng])
        }
        })

        // Set marker icons by type
        let icons = {}
        for (let type in markersByType) {
            icons[type] = L.icon(markersByType[type])
        }



return (
    <MapContainer
        bounds={mapBounds}
        zoom={103}
        scrollWheelZoom={false}
        zoomControl={false}
        {...other}
    >
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* Enable map controls on focus, disable on blur */}
        <MapScrollZoomOnFocus>
            <MarkerClusterGroup 
                onClick={clusterClicked}
                spiderfyOnMaxZoom={false}
                disableClusteringAtZoom={10}
                zoomToBoundsOnClick={true}
            >
                {cases.map(c => {
                    if(c.region != "" && c.description != ""){
                        const bounds = regionToLatLng[c.region]
                        return (
                            <Marker
                                position={[bounds.lat, bounds.lng]}
                                eventHandlers={{
                                    click: clusterClicked
                                }}
                                icon={icons[c.caseType]}
                                key={c.id + '-report'}
                            />
                        )
                    }
                })}
            </MarkerClusterGroup>
            <ZoomControl position="bottomright" />
        </MapScrollZoomOnFocus>
        <CaseCardList
            title={`Casos reportados en ${regionToRegionRenderName[region]}`}
            cases={filterCasesByRegion(cases, region)}
            open={listState}
            onClose={() => {
                setListState(false)
            }}
        />
    </MapContainer>
)
}
}

export default Map