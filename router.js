export default class Router extends HTMLElement {
    constructor() {
        super();

        this.currentRoute = "";

        this.allRoutes = {
            "": {
                view: "<delayed-view></delayed-view>",
                name: "Förseningar"
            },
            "map": {
                view: "<map-view></map-view>",
                name: "Karta"
            },
            "favorites": {
                view: "<favorites-view></favorites-view>",
                name: "Favoriter"
            },
            "favorite-form": {
                view: "<favorite-form-view></favorite-form-view>",
                name: "Ny favorit",
                hidden: true
            },
            "login": {
                view: "<login-view></login-view>",
                name: "Login",
                hidden: true
            }
        };
    }

    get routes() {
        return this.allRoutes;
    }

    // connect component
    connectedCallback() {
        window.addEventListener('hashchange', () => {
            this.resolveRoute();
        });

        this.resolveRoute();
    }

    resolveRoute() {
        let cleanHash = location.hash.replace("#", "");

        if (cleanHash.indexOf("/") > -1) {
            let splittedHash = cleanHash.split("/");

            cleanHash = splittedHash[0];
        }

        this.currentRoute = cleanHash;

        this.render();
    }

    render() {
        let html = "<not-found></not-found>";

        if (this.routes[this.currentRoute]) {
            html = this.routes[this.currentRoute].view;
        }

        this.innerHTML = html;
    }
}
