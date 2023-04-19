
// function fabrica para todo la logica del carrito de compras que recibe 5 parametros
function cart(db, renderProducts, find, removeStock, discounts) {

  // varibale del porcentaje
  let porcen = 0

  // variable del elemento contenedor de productos de la vista principal de productos
  const productsDom = document.querySelector(".products__container");

  // variable del elemento contenedor del cuerpo del carrito de compras
  const cartDom = document.querySelector(".cart__body");

  // varibale para el span de contador de productos sobre el icono de carrito de compras
  const notifyDom = document.querySelector(".notify");

  // variable del elemento  contador de items en el carrito de compras
  const countDom = document.querySelector(".cart__count--item");

  // variable del elemento subtotal en el carrito de compras
  const subtotalDom = document.querySelector(".sub--total");

  // variable del elemento  boton de compra del carrito
  const checkoutDom = document.querySelector(".btn--buy");

  // varibale del boton de descucento  para aplicarlo en el carrito de compras
  const btnDescuento = document.querySelector('#btn--cart--descuento')

  // variable del input Text Descuento en el carrito de compras
  const inputDescuento = document.querySelector('#text--cart--descuento')

  // variable del elemento Text total en el carrito de compras
  const textTotal = document.querySelector('.total--total')

  // variable del elemento Txt descuento  en el carrito de compras
  const txtDescuento = document.querySelector('.descuento--total')

  // variable del elemento Txt impuesto  en el carrito de compras
  const txtImpuesto = document.querySelector('.impuestos--total')

  // variable del container principal para pintar el modal
  const modalDOM = document.querySelector(".modal__container")

  // varibale que simula la obtencion de datos del localstorage
  let items = window.localStorage.getItem("cart")
    ? JSON.parse(window.localStorage.getItem("cart"))
    : [];

  // function para agregar producto o item a la variable items que son los datos para el carrito de compras
  function addItemCart(id, quantity) {
    const cartItem = getIndex(id);
    if (cartItem) {
      if (verifyStock(id, quantity + cartItem.quantity)) {
        cartItem.quantity += quantity;
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops!',
          text: 'No tenemos el stock requerido.',
        })
      }
    } else {
      items.push({ id, quantity });
    }
  }

  //fucntion para disminuir cantidad en 1 del producto seleccionado, del array items(datos del carrito de compra)
  function minusProduct(id) {
    const cartItem = getIndex(id);
    if (cartItem.quantity - 1 > 0) {
      cartItem.quantity -= 1;
    } else {
      items = items.filter((item) => item.id !== id);
    }
  }

  //fucntion para quitar el producto seleccionado, del array items(datos del carrito de compra)
  function removeItem(id) {
    items = items.filter((item) => item.id !== id);
  }

  //fucntion para obtener el producto seleccionado, del array items(datos del carrito de compra)
  function getIndex(id) {
    const index = items.findIndex((item) => item.id === id);
    return index >= 0 ? items[index] : null;
  }

  //fucntion para contabilizar el total de items, del array items(datos del carrito de compra)
  function showCount() {
    //console.log(items.reduce((acc, item) => acc + item.quantity, 0))
    return items.reduce((acc, item) => acc + item.quantity, 0);
  }

  //fucntion para obtener el procentaje de descuento y el total para para mostrar en sus respectivos elementos
  function showTotal(por) {
    if (por !== 0) {
      const porcent = (showSubTotal().total * por) / 100
      const total = showSubTotal().total - porcent;
      txtDescuento.innerHTML = "S/ " + porcent.toFixed(2);
      txtImpuesto.innerHTML = "S/ " + ((total * 18) / 100)
      textTotal.innerHTML = "S/ "+ (total + ((total * 18) / 100)).toFixed(2)
    }
  }

  //fucntion para obtener el subtotal sin contabilizar el descuento por si no lo hay
  function showSubTotal() {
    const total = items.reduce((acc, item) => {
      const dbProduct = find(item.id);
      return acc + dbProduct.price * item.quantity;
    }, 0);
    const igv = (total * 18)/100;
    return {total, igv};
  }

  // fucntion para verificar el stock si supera o no la cantidad
  function verifyStock(id, quantity) {
    return find(id).quantity - quantity >= 0;
  }

  // fucntion para realizar la compra
  function checkout() {
    removeStock(items);
    items = [];
  }  

  // function para renderizar o crear los items del carrito de compras para su visualizacion en el html
  function renderCart() {

    let html = "";

    if (items.length > 0) {
      items.forEach((products) => {
        const product = find(products.id);
        html += `
        <article class="article">
          <div class="article__image">
            <img src="${product.image}" alt="${product.name}">
          </div>
          <div class="caja__btn">
              <button class="btn__1">detalles</button>
              </div>
          <div class="article__content">
            <h3 class="article__title">${product.name}</h3>
            <span class="article__price">$${product.price}</span>
            <div class="article__quantity">
              <button type="button" class="article__quantity-btn article--minus" data-id="${products.id}">
                <i class='bx bx-minus'></i>
              </button>
              <span class="article__quantity-text">${products.quantity}</span>
              <button type="button" class="article__quantity-btn article--plus" data-id="${products.id}">
                <i class='bx bx-plus'></i>
              </button>
            </div>
            <button type="button" class="article__btn remove-from-cart" data-id="${products.id}">
              <i class='bx bx-trash'></i>
            </button>
          </div>
        </article>
        `;
      });
      notifyDom.classList.add("show--notify");
    } else {
      html += `
        <div class="cart__empty">
            <h2>Your cart is empty</h2>
            <p>You can add items to your cart by clicking on the "<i class="bx bx-plus"></i>" button on the product page.</p>
        </div>`;
      notifyDom.classList.remove("show--notify");
    }
    // concatenamos el contenido a mostrar en el cuerpo del carrito con los items seleccionados
    cartDom.innerHTML = html;

    // concatenamos el contenido a mostrar en el span de contador de items sobre el carrito de compras
    notifyDom.innerHTML = showCount();

    // concatenamos el contenido a mostrar en el contador de items en el footer del carrito de compras
    countDom.innerHTML = showCount();

    // concatenamos el contenido a mostrar en el txt subtotal en el footer del carrito de compras
    subtotalDom.innerHTML = "S/ " + showSubTotal().total.toFixed(2);
    // concatenamos el contenido a mostrar en el txt subtotal en el footer del carrito de compras
    

    // validamos si la variable porcen tiene un numero diferente a 0, para mostrar contenido en el txt descuento y total
    if (porcen === 0) {
      txtDescuento.innerHTML = "S/ 0.00";
      txtImpuesto.innerHTML = "S/ " + showSubTotal().igv.toFixed(2);
      textTotal.innerHTML = "S/ " +(showSubTotal().total + showSubTotal().igv).toFixed(2);
    } else {
      showTotal(porcen)
    };

    //validamos si el en array de carrito de comprar hay items para habiliar y deshabitar algunos elementos
    // del carrito
    if (items.length > 0) {
      checkoutDom.removeAttribute('disabled')
      btnDescuento.removeAttribute('disabled')
      inputDescuento.removeAttribute('disabled')
    } else {
      checkoutDom.setAttribute('disabled', 'disabled')
      btnDescuento.setAttribute('disabled', 'disabled')
      inputDescuento.setAttribute('disabled', 'disabled')
    }

    // reseteamos los valores valores de los array en el localStorage, tanto de productos y del cart
    window.localStorage.setItem("products", JSON.stringify(db));
    window.localStorage.setItem("cart", JSON.stringify(items));
  }

  // evento para delegar funcion al boton de agragar a carrito de comprar en los modales de productos
  productsDom.addEventListener("click", function (e) {
    if (e.target.closest(".add--to--cart")) {
      //console.log('se hizo click')
      const id = +e.target.closest(".add--to--cart").dataset.id;
      const product = find(id);
      if (product && product.quantity > 0) {
        addItemCart(id, 1);
        renderCart();
      }
    }
  });

  // evento para delegar function a los botones de agregar o disminunir de los items del carrito de compras
  cartDom.addEventListener("click", function (e) {
    if (e.target.closest(".article--minus")) {
      const id = +e.target.closest(".article--minus").dataset.id;
      minusProduct(id);
      renderCart()
    }

    if (e.target.closest(".article--plus")) {
      const id = +e.target.closest(".article--plus").dataset.id;
      //console.log("aaa")
      addItemCart(id, 1);
      renderCart()
    }

    if (e.target.closest(".remove-from-cart")) {
      const id = +e.target.closest(".remove-from-cart").dataset.id;
      Swal.fire({
        title: 'Estas Segur@ de eliminar el item?',
        text: "No podrá revertir!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si!',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.isConfirmed) {
          removeItem(id);
          renderCart();
        }
      })
    }
  });

  // evento click de agregar item del boton del modal
  modalDOM.addEventListener('click', (e) => {
    if (e.target.closest(".add--to--cart--detail")) {
      const id = +e.target.closest(".add--to--cart--detail").dataset.id;
      const product = find(id);
      if (product && product.quantity > 0) {
        addItemCart(id, 1);
        renderCart();
      }
    }
  })

  

  // evento para verificar codigo de descuento y actualizar el total
  btnDescuento.addEventListener('click', () => {
    const discount = discounts.find(cod => inputDescuento.value.toUpperCase() === cod.cod)
    if (discount) {
      porcen = discount.por;
      showTotal(porcen);
    }
  })

  // evento para realizar la comprar en el carrito de compras
  checkoutDom.addEventListener('click', function () {
    Swal.fire(
      'Compra realizada!',
      'Gracias por confiar en nosotros!',
      'success'
    );
    checkout();
    renderCart();
    renderProducts();
    porcen = 0;
    inputDescuento.value = ""

  })



  // ejecutamos el carrito para la  creacion de array inicial de carritos
  renderCart();
 
}

// exportamos la funcion cart para la ejecucion y llamado en otros archivos js
export default cart
