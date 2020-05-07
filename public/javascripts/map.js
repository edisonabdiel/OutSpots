
coordinatesBerlin = [13.4656389, 52.5128301]

mapboxgl.accessToken = 'pk.eyJ1Ijoic29sYW5nZW9oYW5hIiwiYSI6ImNrOWs5cmQwcjAwMjIzZHMyYXJjcDhsajMifQ.u24HSQ9TY2bQu1QZDD_w9g';
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/dark-v10',
  zoom: 3,
  center: coordinatesBerlin
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

const marker = new mapboxgl.Marker()
  .setLngLat(coordinatesBerlin)
  .addTo(map);

  
  