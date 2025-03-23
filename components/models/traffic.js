import { baseURL } from "../../utils.js";

// hämta all data från sidan
const traffic = {
    getStations: async function getStations() {
        const response = await fetch(`${baseURL}/stations`);
        const result = await response.json();

        return result.data;
    },

    getMessages: async function getMessages() {
        const response = await fetch(`${baseURL}/messages`);
        const result = await response.json();

        return result.data;
    },

    getCodes: async function getCodes() {
        const response = await fetch(`${baseURL}/codes`);
        const result = await response.json();

        return result.data;
    },

    getDelayed: async function getDelayed() {
        const response = await fetch(`${baseURL}/delayed`);
        const result = await response.json();

        return result.data;
    },
};

export default traffic;
