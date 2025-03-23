export default class FavoritesView extends HTMLElement {
    // connect component
    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML =    `<div class='slide-in' id='slider'>
                            <header class="header">
                                <lager-title title="Favoriter"></lager-title>
                            </header>
                            <main class="container">
                                <favorites-list></favorites-list>
                            </main>
                            `;
    }
}
