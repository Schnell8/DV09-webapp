/* global L */

import "../leaflet/leaflet.min.js";
import  trafficModel from "../components/models/traffic.js";

export default class MapView extends HTMLElement {
    // connect component

    constructor() {
        super();

        this.delayed = [];
        this.stations = [];
        this.map = null;
    }

    async connectedCallback() {
        const delayed = await trafficModel.getDelayed();
        const stations = await trafficModel.getStations();

        this.delayed = delayed;
        this.stations = stations;

        this.render();
    }

    render() {
        this.innerHTML =
            `
            <div class='slide-in' id='slider'>
                <h1>Karta</h1>
                <main class="container">
                    <div id="map" class="map"></div>
                </main>
            </div>
            `;

        this.renderMap();
    }

    renderMap() {
        this.map = L.map('map').setView([59.5, 15.325556], 5);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(this.map);

        this.renderMarkers();

        this.renderLocation();
    }

    async renderMarkers() {
        // matcha station med försening
        for (let x = 0; x < this.delayed.length; x++) {
            for (let i = 0; i < this.stations.length; i++) {
                if (this.delayed[x].FromLocation) {
                    let tsil = this.stations[i].LocationSignature;
                    let tdxf = this.delayed[x].FromLocation[0].LocationName;

                    if (tsil === tdxf) {
                        // hämta koordinater för stationen
                        let geometry = this.stations[i].Geometry.WGS84;
                        let coordinates = geometry.split(" ");
                        let lat = coordinates[2];
                        let long = coordinates[1];
                        let latAdjusted = lat.slice(0, -1);
                        let longAdjusted = long.slice(1);

                        // räkna diff mellan ord. avgång och planerad avgång
                        const dateTimeStringOnTime = this.delayed[x].AdvertisedTimeAtLocation;
                        const dateObjOnTime = new Date(dateTimeStringOnTime);
                        const dateTimeStringDelayed = this.delayed[x].EstimatedTimeAtLocation;
                        const dateObjDelayed = new Date(dateTimeStringDelayed);

                        const diffInMilliseconds = Math.abs(dateObjDelayed - dateObjOnTime);
                        const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));

                        L.marker([
                            parseFloat(latAdjusted),
                            parseFloat(longAdjusted)
                        ]).bindPopup(`
                            <h2>${this.stations[i].AdvertisedLocationName}</h2>
                            <h3>Försenat ${diffInMinutes} minuter</h3>`).addTo(this.map);
                    }
                }
            }
        }
    }

    renderLocation() {
        let locationMarker = L.icon({
            iconUrl:      "leaflet/location.png",
            iconSize:     [24, 24],
            iconAnchor:   [12, 12],
            popupAnchor:  [0, 0]
        });


        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                L.marker(
                    [position.coords.latitude, position.coords.longitude],
                    {icon: locationMarker}
                ).addTo(this.map);
            });
        }
    }
}
