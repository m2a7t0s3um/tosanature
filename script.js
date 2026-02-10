const map = L.map('map').setView([33.5597, 133.5311], 9);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap'
}).addTo(map);

const spots = [
  { name: "仁淀川", lat: 33.548, lng: 133.203, category: "river" },
  { name: "四万十川", lat: 32.992, lng: 132.933, category: "river" },
  { name: "安居渓谷", lat: 33.588, lng: 133.188, category: "forest" }
];

let markers = [];

function showSpots(category) {
  markers.forEach(m => map.removeLayer(m));
  markers = [];

  spots
    .filter(s => s.category === category)
    .forEach(s => {
      const marker = L.marker([s.lat, s.lng])
        .addTo(map)
        .bindPopup(s.name);
      markers.push(marker);
    });
}

function filterCategory(category) {
  showSpots(category);
}

// 現在地表示
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(pos => {
    const lat = pos.coords.latitude;
    const lng = pos.coords.longitude;
    L.marker([lat, lng]).addTo(map).bindPopup("現在地");
    map.setView([lat, lng], 11);
  });
}
