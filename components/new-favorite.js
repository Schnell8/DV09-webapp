import authModel from "./models/auth.js";
import trafficModel from "./models/traffic.js";

export default class NewFavorite extends HTMLElement {
    constructor() {
        super();

        this.favorites = [];
        this.stations = [];
        this.userData = [];
    }

    // funktion för att lägga till data
    async addArtefact(data) {
        const dataToAdd = {
            artefact: data.LocationSignature
        };

        const result = await authModel.addData(dataToAdd);

        if (result.status < 300) {
            console.log("data added succesfully");
        } else {
            console.log("data failed to add");
        }

        location.hash = "favorites";
    }

    async connectedCallback() {
        // testa token, antingen login eller favorit routen
        if (!authModel.token) {
            location.hash = "login";
        } else {
            const stations = await trafficModel.getStations();
            const userData = await authModel.getUserData();

            this.stations = stations;
            this.userData = userData;

            this.render();
        }
    }

    render() {
        // skapa formulär
        let form = document.createElement("form");

        // eventlyssnare som kallar på funktionen för att lägga till data i artefakten
        form.addEventListener("submit", (event) => {
            event.preventDefault();

            this.addArtefact(this.favorites);
        });

        // select input
        let selectInput = document.createElement("select");

        selectInput.setAttribute("required", "required");
        selectInput.classList.add("input");

        // bas alternativ
        let option = document.createElement("option");

        option.textContent = "Välj en station...";
        selectInput.appendChild(option);

        // alla stationer som options i selectlabeln
        for (let i = 0; i < this.stations.length; i++) {
            let option = document.createElement("option");

            option.setAttribute("value", this.stations[i].LocationSignature);
            option.textContent = `${this.stations[i].AdvertisedLocationName}`;
            selectInput.appendChild(option);
        }

        // this.favorites fylls med värdet i select inputet,
        // byta alternativ triggar eventlyssnaren och ersätter gamla med nya värdet
        selectInput.addEventListener("change", (event) => {
            this.favorites = {
                ...this.favorites,
                LocationSignature: event.target.value,
            };
            console.log(this.favorites);
        });

        // select label
        let labelSelect = document.createElement("label");

        labelSelect.classList.add("white");
        labelSelect.textContent = "Station:";

        // knapp för submit, triggar eventlyssnaren i formuläret
        let submitButton = document.createElement("input");

        submitButton.setAttribute("type", "submit");
        submitButton.setAttribute("value", "Lägg till favorit");
        submitButton.classList.add("button", "button", "submit", "green-button");

        // lägg till element i formuläret
        form.appendChild(labelSelect);
        form.appendChild(selectInput);
        form.appendChild(submitButton);

        // lägg till i dokument
        this.appendChild(form);
    }
}
