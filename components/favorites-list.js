import authModel from "./models/auth.js";
import trafficModel from "./models/traffic.js";

export default class FavoritesList extends HTMLElement {
    constructor() {
        super();

        this.userData = [];
        this.stations = [];
        this.delayed = [];
    }

    async connectedCallback() {
        // testa token
        if (!authModel.token) {
            location.hash = "login";
        // hämta stationer, förseningar och användarens data
        } else {
            this.userData = await authModel.getUserData();
            this.delayed = await trafficModel.getDelayed();
            this.stations = await trafficModel.getStations();
            this.render();
        }
    }

    render() {
        let oldFavorites = document.createElement("div");

        oldFavorites.classList.add("old-fav");
        oldFavorites.innerHTML = `<h3 class="white">Dina favoriter</h3>`;

        // matcha användardata mot stationen för att kunna skriva ut hela stationsnamnet
        for (let i = 0; i < this.userData.length; i++) {
            for (let y = 0; y < this.stations.length; y++) {
                if (this.userData[i].artefact === this.stations[y].LocationSignature) {
                    let addOld = document.createElement("div");

                    addOld.innerHTML = `<p>${this.stations[y].AdvertisedLocationName}</p>`;
                    oldFavorites.appendChild(addOld);
                }
            }
        }

        let newFavorites = document.createElement("div");

        newFavorites.classList.add("new-fav");

        // matcha användardata mot förseningar
        for (let i = 0; i < this.userData.length; i++) {
            for (let x = 0; x < this.delayed.length; x++) {
                if (this.delayed[x].ToLocation) {
                    if (this.userData[i].artefact === this.delayed[x].ToLocation[0].LocationName) {
                        for (let y = 0; y < this.stations.length; y++) {
                            for (let z = 0; z < this.stations.length; z++) {
                                let tdxf = this.delayed[x].FromLocation[0].LocationName;
                                let tdxt = this.delayed[x].ToLocation[0].LocationName;
                                let tsyl = this.stations[y].LocationSignature;
                                let tszl = this.stations[z].LocationSignature;

                                // matcha förseningar(från och till) mot stationer
                                // för att kunna skriva ut stationsnamn
                                if (tdxf === tsyl) {
                                    if (tdxt === tszl) {
                                        const dateTimeString =
                                        this.delayed[x].EstimatedTimeAtLocation;
                                        const dateObj = new Date(dateTimeString);
                                        const estimatedTime = dateObj.toLocaleTimeString([],
                                            { hour: '2-digit', minute: '2-digit' });

                                        let tsza = this.stations[z].AdvertisedLocationName;
                                        let delayedToFav = document.createElement("div");

                                        delayedToFav.classList.add("delayed-fav");
                                        delayedToFav.innerHTML = `
                                        <p>Tåg: ${this.delayed[x].AdvertisedTrainIdent}
                                        <p>Försenat från: ${this.stations[y].AdvertisedLocationName}
                                        <p class="red">Ankommer till ${tsza}: ${estimatedTime}
                                        `;
                                        newFavorites.appendChild(delayedToFav);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        // lägg till i dokument
        this.innerHTML =
        `
        <a href='#favorite-form' class="button invoice blue-button">Ny favorit</a>
        `;
        this.appendChild(oldFavorites);
        this.appendChild(newFavorites);
    }
}
