export default class DelayedView extends HTMLElement {
    // connect component
    connectedCallback() {
        this.innerHTML =    `<div class='slide-in' id='slider'>
                            <header class="header">
                                <lager-title title="Förseningar"></lager-title>
                            </header>
                            <main class="container">
                                <delayed-list></delayed-list>
                            </main>
                            </div>
                            `;
    }
}
