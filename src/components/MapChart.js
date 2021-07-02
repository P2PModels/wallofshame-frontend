import React from 'react'
import { geoCentroid } from 'd3-geo'
import { scaleQuantize } from 'd3-scale'
import {
    ComposableMap,
    Geographies,
    Geography,
    Marker,
} from 'react-simple-maps'
import { red } from '../themes/colors'
import map from '../data/spain_lvl2_modified.json'
import jobs from '../data/empleos.json'

const colorShades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]
const colorScale = scaleQuantize().domain([0, 3000]).range(colorShades)

const MapChart = () => {
    return (
        // Magic numbers to center and scale the map properly
        <ComposableMap
            projection="geoAzimuthalEqualArea"
            projectionConfig={{ scale: 3300, center: [-4, 39] }}
        >
            <Geographies geography={map}>
                {({ geographies }) => (
                    <>
                        {geographies.map(geo => {
                            const curr = jobs.find(
                                j => j.id === geo.properties.NAME_2
                            )
                            console.log(curr)
                            return (
                                <Geography
                                    key={geo.rsmKey}
                                    stroke="#FFF"
                                    geography={geo}
                                    fill={
                                        red[
                                            colorScale(
                                                curr === undefined
                                                    ? 0
                                                    : curr.empleos
                                            )
                                        ]
                                    }
                                />
                            )
                        })}
                        {geographies.map(geo => {
                            const centroid = geoCentroid(geo)
                            const curr = jobs.find(
                                j => j.id === geo.properties.NAME_2
                            )
                            // Check == vs ===
                            if (curr === undefined) {
                                return null
                            } else {
                                return (
                                    <g key={geo.rsmKey + '-name'}>
                                        {
                                            <Marker coordinates={centroid}>
                                                <text
                                                    y="2"
                                                    fontSize={14}
                                                    textAnchor="middle"
                                                    fill="#fff"
                                                >
                                                    {curr.empleos}
                                                </text>
                                            </Marker>
                                        }
                                    </g>
                                )
                            }
                        })}
                    </>
                )}
            </Geographies>
        </ComposableMap>
    )
}

export default MapChart
