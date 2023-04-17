import showCart from "./components/showCart.js";
import { discounts } from './helpers/discount.js';
import products from "./components/products.js";
import cart from "./components/cart.js";
import Scroll from './components/Scroll.js';
import loader from "./components/loader.js";

// inicializar y ejecutar las functions
loader();
showCart();
Scroll();
const {db, renderProducts, find, removeStock} = products()
renderProducts()
cart(db, renderProducts, find, removeStock, discounts);