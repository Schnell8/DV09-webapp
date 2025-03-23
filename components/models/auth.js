import { apiKey, authURL } from "../../utils.js";

const auth = {
    token: "",

    // registera användare
    register: async function register(username, password) {
        const user = {
            email: username,
            password: password,
            api_key: apiKey
        };

        const response = await fetch(`${authURL}/register`, {
            body: JSON.stringify(user),
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST'
        });

        const result = await response.json();

        if ("errors" in result) {
            return result.errors.detail;
        } else {
            return "ok";
        }
    },

    // logga in användare (få ut token)
    login: async function login(username, password) {
        const user = {
            email: username,
            password: password,
            api_key: apiKey
        };

        const response = await fetch(`${authURL}/login`, {
            body: JSON.stringify(user),
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST'
        });

        const result = await response.json();

        if ("errors" in result) {
            return result.errors.detail;
        } else {
            auth.token = result.data.token;
            console.log(auth.token);
            return "ok";
        }
    },

    // lägga till data i artefakten (token krävs)
    addData: async function addData(dataObject) {
        const data = {
            artefact: dataObject.artefact,
            api_key: apiKey
        };

        const result = await fetch(`${authURL}/data`, {
            body: JSON.stringify(data),
            headers: {
                'content-type': 'application/json',
                'x-access-token': auth.token
            },
            method: 'POST'
        });

        return result;
    },

    // hämta data från användare (token krävs)
    getUserData: async function getUserData() {
        const response = await fetch(`${authURL}/data?api_key=${apiKey}`, {
            headers: {
                'x-access-token': auth.token
            },
        });
        const result = await response.json();

        return result.data;
    }
};

export default auth;
