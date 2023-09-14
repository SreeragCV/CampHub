mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v12',
    center: coordinates, // [lng, lat]
    zoom: 9, // zoom
    });

const marker = new mapboxgl.Marker()
.setLngLat(coordinates)
.setPopup(
    new mapboxgl.Popup({ offset: 25 })
    .setHTML(
      `<h3>${campground.title}</h3><p>${campground.location}</p>`
    )
)
.addTo(map);