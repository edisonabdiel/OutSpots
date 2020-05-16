
coordinatesRevalerPark = [13.4640195, 52.5047492]
mapboxgl.accessToken = 'pk.eyJ1Ijoic29sYW5nZW9oYW5hIiwiYSI6ImNrOWs5cmQwcjAwMjIzZHMyYXJjcDhsajMifQ.u24HSQ9TY2bQu1QZDD_w9g';
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/dark-v10',
  zoom: 10,
  center: coordinatesRevalerPark
});

//switch styles of the map 
const layerList = document.getElementById('menu');
const inputs = layerList.getElementsByTagName('input');

function switchLayer(layer) {
  const layerId = layer.target.id;
  map.setStyle('mapbox://styles/mapbox/' + layerId);
}

for (let i = 0; i < inputs.length; i++) {
  inputs[i].onclick = switchLayer;
}

//Add a marker at the location of every park in the database
Array.from(document.querySelectorAll('.stored-coordinates')).forEach(function(element) {
      console.log(`element.value: ${element.value}`)
      let lngLatString = element.value
      let lngLatArray = lngLatString.split(',').map((x) => Number(x))
      new mapboxgl.Marker()
      .setLngLat(lngLatArray)
      .addTo(map);
    })

// Add geolocate control to the map.
map.addControl(
  new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true
    },
    trackUserLocation: true
  })
);


