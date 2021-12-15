# Interactive map

## Leaflet

Leaflet is an open-source javascript librery for interactive maps. We followed this [quickstart](https://leafletjs.com/examples/quick-start/) to add the CDN's to our project public folder, in index.html.

## react-leaflet

The react-leaflet library provides bindings between React and Leaflet. Visit the [documentation](https://react-leaflet.js.org/docs/start-introduction/) for more information, the docs are great!

!!! warning "Bug related to bundling"
    There is a bug that prompts when trying to use react-leaflet for the first time related to the bundle. Here is the [StackOverflow post to fix it](https://stackoverflow.com/questions/67552020/how-to-fix-error-failed-to-compile-node-modules-react-leaflet-core-esm-pat)


## react-leaflet-markercluster

The react-leaflet-markercluster library groups the markers of a region based in the zoom value. Visit the [documentation](https://www.npmjs.com/package/react-leaflet-markercluster) for more information.