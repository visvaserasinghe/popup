// Initialize Leaflet map
const map = L.map('map').setView([7.5, 80.1], 8); // Centered on NWP

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Add marker on click
map.on('click', function (e) {
  if (window.currentMarker) map.removeLayer(window.currentMarker);
  window.currentMarker = L.marker(e.latlng).addTo(map);
  window.clickedLatLng = e.latlng;
});

// Handle form submission
document.getElementById('dataForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const issue = this.issue.value;
  const description = this.description.value;

  if (!window.clickedLatLng) {
    alert("Click on the map to select a location.");
    return;
  }

  const data = {
    issue,
    description,
    lat: window.clickedLatLng.lat,
    lng: window.clickedLatLng.lng
  };

  console.log("Submitting data:", data);

  // You would replace this URL with your Supabase API or webhook endpoint
  await fetch('https://YOUR_SUPABASE_URL/rest/v1/issues', {
    method: 'POST',
    headers: {
      'apikey': 'YOUR_API_KEY',
      'Content-Type': 'application/json',
      'Prefer': 'return=minimal'
    },
    body: JSON.stringify(data)
  });

  alert("Thank you! Your data has been submitted.");
});
