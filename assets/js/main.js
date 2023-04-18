
import loader from "./components/loader.js";
import getProducts from "./helpers/getProducts.js";
import Scroll from './components/Scroll.js';
import slider from './components/slider.js';
import Menu from "./components/menu.js";

// inicializar y ejecutar las functions
loader();
await getProducts();
Scroll();
Menu();
slider();
















