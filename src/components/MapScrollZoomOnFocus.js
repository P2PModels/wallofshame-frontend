import { useMapEvents } from 'react-leaflet'


const MapScrollZoomOnFocus = (props) => {
    const { children } = props
    const map = useMapEvents({
        focus:  () => {
            map.scrollWheelZoom.enable()
        },
        blur: () => {
            map.scrollWheelZoom.disable()
        }     
    })

    return (
        children
    )             
}

export default MapScrollZoomOnFocus