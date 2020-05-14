
coordinatesRevalerPark = [13.4640195, 52.5047492]
coordinates2 = [13.4680195, 52.5067492]
mapboxgl.accessToken = 'pk.eyJ1Ijoic29sYW5nZW9oYW5hIiwiYSI6ImNrOWs5cmQwcjAwMjIzZHMyYXJjcDhsajMifQ.u24HSQ9TY2bQu1QZDD_w9g';
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/dark-v10',
  zoom: 10,
  center: coordinatesRevalerPark
});

const layerList = document.getElementById('menu');
const inputs = layerList.getElementsByTagName('input');

function switchLayer(layer) {
  const layerId = layer.target.id;
  map.setStyle('mapbox://styles/mapbox/' + layerId);
}

for (let i = 0; i < inputs.length; i++) {
  inputs[i].onclick = switchLayer;
}

const markerRevalerPark = new mapboxgl.Marker()
  .setLngLat(coordinatesRevalerPark)
  .addTo(map);

let arrayOfCoordinates = document.getElementsByClassName('stored-coordinates')
// arrayOfCoordinates.forEach((element) => {
//   console.log(`element: ${element}`)
//   new mapboxgl.Marker()
//   .setLngLat(element)
//   .addTo(map);
// })

for (let i = 0; i < arrayOfCoordinates.length; i++) {
  new mapboxgl.Marker()
  .setLngLat(arrayOfCoordinates[i])
  .addTo(map);
  console.log("array :", arrayOfCoordinates[i])
}

  
  // Add geolocate control to the map.
map.addControl(
  new mapboxgl.GeolocateControl({
  positionOptions: {
  enableHighAccuracy: true
  },
  trackUserLocation: true
  })
  );

