// router import
import Router from "./router.js";

// navigation import
import Navigation from "./navigation.js";

// component imports
import LagerTitle from "./components/lager-title.js";
import DelayedList from "./components/delayed-list.js";
import FavoritesList from "./components/favorites-list.js";
import LoginForm from "./components/login-form.js";
import NewFavorite from "./components/new-favorite.js";

// view imports
import DelayedView from "./views/delayed.js";
import MapView from "./views/map.js";
import FavoritesView from "./views/favorites.js";
import FavoriteFormView from "./views/favorite-form.js";
import LoginView from "./views/login.js";

// define router
customElements.define('router-outlet', Router);

// define navigation
customElements.define('navigation-outlet', Navigation);

// define components
customElements.define('lager-title', LagerTitle);
customElements.define('delayed-list', DelayedList);
customElements.define('favorites-list', FavoritesList);
customElements.define('login-form', LoginForm);
customElements.define('new-favorite', NewFavorite);

// define views
customElements.define('delayed-view', DelayedView);
customElements.define('map-view', MapView);
customElements.define('favorites-view', FavoritesView);
customElements.define('favorite-form-view', FavoriteFormView);
customElements.define('login-view', LoginView);
