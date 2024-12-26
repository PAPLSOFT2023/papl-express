import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.scss'],
})
export class MapViewComponent implements OnInit {
  map: any;
  markers: L.LayerGroup = new L.LayerGroup();
  locationMap: { [key: string]: any[] } = {}; // Map to store lifts by their coordinates

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.initializeMap();
    this.loadLocations();
  }

  // Initialize the Leaflet map
  initializeMap(): void {
    this.map = L.map('map').setView([12.971598, 77.594566], 10); // Default view

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(this.map);

    this.map.addLayer(this.markers);
  }

  // Fetch locations and add markers
  loadLocations(): void {
    this.http.get<any[]>('http://localhost:3000/api/lift-locations').subscribe((locations) => {
      const bounds = L.latLngBounds([]); // Create an empty bounds object

      locations.forEach((location) => {
        const latLng = L.latLng(location.latitude, location.longitude);
        const latLngKey = `${latLng.lat},${latLng.lng}`; // Use lat, lng as a unique key

        // If this coordinate already exists, push the lift_name into the array for that coordinate
        if (!this.locationMap[latLngKey]) {
          this.locationMap[latLngKey] = [];
        }
        this.locationMap[latLngKey].push(location);

        // Create a custom icon for the marker using a PNG image (adjust as needed)
        const icon = L.icon({
          iconUrl: 'assets/location.png', // Path to your PNG image
          iconSize: [32, 32], // Icon size (adjust as needed)
          iconAnchor: [16, 32], // Anchor the icon at the bottom center
          popupAnchor: [0, -32], // Position the popup above the marker
        });

        // Create the marker and bind a popup with lift names if multiple lifts share coordinates
        const marker = L.marker(latLng, { icon })
          .addTo(this.markers)
          .bindPopup(this.createPopupContent(latLngKey))
          .bindTooltip(this.locationMap[latLngKey].map(l => l.lift_name).join(', ')); // Display all lift names in the tooltip

        // Extend bounds with each marker's location
        bounds.extend(latLng);

        // Optional: Open popup on marker hover
        marker.on('mouseover', () => marker.openPopup());
      });

      // Fit map bounds to show all markers
      this.map.fitBounds(bounds);
    });
  }

  // Function to create the popup content with all lift names
  createPopupContent(latLngKey: string): string {
    const locations = this.locationMap[latLngKey];
    // Get the first location's details (assuming all have the same building_name, location, pincode)
    const firstLocation = locations.length > 0 ? locations[0] : {};

    return `
      <strong>Lifts: </strong><br>
      ${locations.map(location => location.lift_name).join('<br>')}<br>
      Building: ${firstLocation.building_name || 'N/A'}<br>
      Location: ${firstLocation.location || 'N/A'}<br>
      Pincode: ${firstLocation.pincode || 'N/A'}
    `;
  }
}