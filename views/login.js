export default class LoginView extends HTMLElement {
    // connect component
    connectedCallback() {
        this.innerHTML =    `<div class='slide-in' id='slider'>
                            <header class="header">
                                <lager-title title="Login"></lager-title>
                            </header>
                            <main class="container">
                                <login-form></login-form>
                            </main>
                            </div>
                            `;
    }
}
