import showCart from "./components/showCart.js";
import { discounts } from './helpers/discount.js';
import products from "./components/products.js";
import cart from "./components/cart.js";
import Scroll from './components/Scroll.js';
import loader from "./components/loader.js";
import Menu from "./components/menu.js";

// inicializar y ejecutar las functions
loader();
Menu();
showCart();
Scroll();
const {db, renderProducts, find, removeStock} = products();
renderProducts();
//const {addItemDetail} = cart(db, renderProducts, find, removeStock, discounts);
cart(db, renderProducts, find, removeStock, discounts);

