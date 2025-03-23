export default class FavoriteFormView extends HTMLElement {
    // connect component
    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML =    `<div class='slide-in' id='slider'>
                            <header class="header">
                                <lager-title title="Ny favorit"></lager-title>
                            </header>
                            <main class="container">
                                <new-favorite></new-favorite>
                            </main>
                            `;
    }
}
