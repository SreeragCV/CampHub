mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v12',
    center: coordinates, // [lng, lat]
    zoom: 9, // zoom
    });

const marker = new mapboxgl.Marker()
.setLngLat(coordinates)
.addTo(map);