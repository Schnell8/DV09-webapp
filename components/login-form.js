import authModel from "./models/auth.js";

export default class LoginForm extends HTMLElement {
    constructor() {
        super();

        this.credentials = [];
    }

    // skicka med credentials till authmodel för att registrera användare
    async register() {
        const result = await authModel.register(
            this.credentials.username,
            this.credentials.password,
        );

        if (result === "ok") {
            console.log("register succeeded");
            this.login();
        } else {
            console.log("Register failed");
        }
    }

    // skicka med credentials till authmodel för att logga in
    async login() {
        const result = await authModel.login(
            this.credentials.username,
            this.credentials.password,
        );

        if (result === "ok") {
            console.log("login succeeded");
            location.hash = "favorites";
        } else {
            console.log("Login failed");
        }
    }

    connectedCallback() {
        // skapa formulär
        let form = document.createElement("form");

        // eventlyssnare som kallar på funktionen för att logga in
        form.addEventListener("submit", (event) => {
            event.preventDefault();

            this.login();
        });

        // email label
        let usernameLabel = document.createElement("label");

        usernameLabel.classList.add("white");
        usernameLabel.textContent = "Email:";

        // input för email
        let usernameInput = document.createElement("input");

        usernameInput.setAttribute("type", "email");
        usernameInput.setAttribute("required", "required");
        usernameInput.classList.add("input");

        // eventlyssnare som skickar inputet in i this.credentials
        usernameInput.addEventListener("input", (event) => {
            this.credentials = {
                ...this.credentials,
                username: event.target.value
            };
        });

        // lösenords label
        let passwordLabel = document.createElement("label");

        passwordLabel.classList.add("white");
        passwordLabel.textContent = "Lösenord:";

        // input för lösenord
        let passwordInput = document.createElement("input");

        passwordInput.setAttribute("type", "password");
        passwordInput.setAttribute("required", "required");
        passwordInput.classList.add("input");

        // eventlyssnare som skickar inputet in i this.credentials
        passwordInput.addEventListener("input", (event) => {
            this.credentials = {
                ...this.credentials,
                password: event.target.value
            };
        });

        // knapp för submit, triggar eventlyssnaren för formuläret
        let submitButton = document.createElement("input");

        submitButton.setAttribute("type", "submit");
        submitButton.setAttribute("value", "Logga in");
        submitButton.classList.add("button", "button", "submit", "green-button", "login");

        // knapp för att registrera användare
        let registerButton = document.createElement("input");

        registerButton.setAttribute("value", "Registrera");
        registerButton.classList.add("button", "button", "register", "blue-button");

        // eventlyssnare som kallar på funktionen för att registrera användare
        registerButton.addEventListener("click", (event) => {
            event.preventDefault();

            this.register();
        });

        // lägg till elementen i formuläret
        form.appendChild(usernameLabel);
        form.appendChild(usernameInput);
        form.appendChild(passwordLabel);
        form.appendChild(passwordInput);
        form.appendChild(registerButton);
        form.appendChild(submitButton);

        // lägg till i dokumentet
        this.appendChild(form);
    }
}
