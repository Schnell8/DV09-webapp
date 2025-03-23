import trafficModel from "./models/traffic.js";

export default class DelayedList extends HTMLElement {
    constructor() {
        super();

        this.delayed = [];
        this.stations = [];
    }

    async connectedCallback() {
        // hämta alla stationer och förseningar
        this.delayed = await trafficModel.getDelayed();
        this.stations = await trafficModel.getStations();
        this.render();
    }

    render() {
        let allDelayedStations = document.createElement("div");

        allDelayedStations.classList.add("all-delayed");

        // matcha station mot försening
        for (let x = 0; x < this.delayed.length; x++) {
            if (this.delayed[x].FromLocation) {
                for (let i = 0; i < this.stations.length; i++) {
                    let tsil = this.stations[i].LocationSignature;
                    let tdxfl = this.delayed[x].FromLocation[0].LocationName;

                    if (tsil === tdxfl) {
                        // få ut tid i hh:mm
                        let tdxa = this.delayed[x].AdvertisedTimeAtLocation;
                        const dateTimeStringOnTime = tdxa;
                        const dateObjOnTime = new Date(dateTimeStringOnTime);
                        const onTime = dateObjOnTime.toLocaleTimeString([],
                            { hour: '2-digit', minute: '2-digit' });

                        const dateTimeStringDelayed = this.delayed[x].EstimatedTimeAtLocation;
                        const dateObjDelayed = new Date(dateTimeStringDelayed);
                        const delayed = dateObjDelayed.toLocaleTimeString([],
                            { hour: '2-digit', minute: '2-digit' });

                        // räkna diff mellan ord. avgång och planerad avgång
                        const diffInMilliseconds = Math.abs(dateObjDelayed - dateObjOnTime);
                        const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));

                        // skapa en div med datan
                        let singleStation = document.createElement("div");

                        singleStation.classList.add("single-station");
                        singleStation.innerHTML =
                        `
                        <p>Station: ${this.stations[i].AdvertisedLocationName}</p>
                        <p>Tåg: ${this.delayed[x].AdvertisedTrainIdent}</p>
                        <p>Ordinarie avgång: ${onTime}</p>
                        <p class="red">Planerad avgång: ${delayed}</p>
                        <p>Försening: ${diffInMinutes} minuter</p>
                        `;
                        allDelayedStations.appendChild(singleStation);
                    }
                }
            }
        }

        // lägg till i dokumentet
        this.appendChild(allDelayedStations);
    }
}
