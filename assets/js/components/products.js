
// function fabrica de productos
function products() {

  //constante de elemento select de los filtros 
  const drowFilters = document.querySelector('#select--filter');

  // constante de elemento vacio para la creacion de input o select para el filtrado por nombre o categoria
  const elementFilter = document.querySelector('#filter--create');

  // constante que representa la base de datos de productos y obtiene sus valores del localStorage
  const db = window.localStorage.getItem("products")
    ? JSON.parse(window.localStorage.getItem("products"))
    : [];

  // function para renderizar o crear el contenido de productos en el html 
  function renderProducts(ope = "all", str = "") {
    const productsDOM = document.querySelector(".products__container");
    let htmlProduct = "";
    if (ope === "all") {
      db.forEach((product) => {
        htmlProduct += `
            <article class="product" data-aos="fade-right"
            data-aos-offset="300"
            data-aos-easing="ease-in-sine" >
              <div class="product__image" >
             
              
                <img loading="lazy" src="${product.image}" alt="${product.name}">
              </div>
              <div class="caja__btn">
              <button class="btn__1"><i class='bx bx-trash'></i>Detalles</button>
              </div>
              <div class="product__content">
                <button type="button" class="product__btn add--to--cart" data-id="${product.id}">
                  <i class='bx bx-cart-add'></i>
                </button>
                <span class="product__price">$${product.price}</span>
                <span class="product__stock">Disponibles: ${product.quantity}</span>
                <h3 class="product__title">${product.name}</h3>
              </div>
            </article>
            `;
      });
    } else if (ope === "name") {
      const productsFilterName = findName(str);
      productsFilterName.forEach((product) => {
        htmlProduct += `
        <article class="product" data-aos="fade-right"
        data-aos-offset="300"
        data-aos-easing="ease-in-sine">
          <div class="product__image" >
            <img loading="lazy" src="${product.image}" alt="${product.name}">
          </div>
          <div class="caja__btn">
              <button class="btn__1"><i class='bx bx-trash'></i>Detalles</button>
              </div>
          <div class="product__content">
            <button type="button" class="product__btn add--to--cart" data-id="${product.id}">
              <i class='bx bx-cart-add'></i>
            </button>
            <span class="product__price">$${product.price}</span>
            <span class="product__stock">Disponibles: ${product.quantity}</span>
            <h3 class="product__title">${product.name}</h3>
          </div>
        </article>
        `;
      });
    } else {
      const productsFilterCategory = findCategory(str);
      //console.log(productsFilterCategory)
      productsFilterCategory.forEach((product) => {
        htmlProduct += `
        <article class="product" data-aos="fade-right"
        data-aos-offset="300"
        data-aos-easing="ease-in-sine">
          <div class="product__image">
            <img loading="lazy" src="${product.image}" alt="${product.name}">
          </div>
          <div class="caja__btn">
              <button class="btn__1"><i class='bx bx-trash'></i>Detalles</button>
              </div>
          <div class="product__content">
            <button type="button" class="product__btn add--to--cart" data-id="${product.id}">
              <i class='bx bx-cart-add'></i>
            </button>
            <span class="product__price">$${product.price}</span>
            <span class="product__stock">Disponibles: ${product.quantity}</span>
            <h3 class="product__title">${product.name}</h3>
          </div>
        </article>
        `;
      });
    }
    productsDOM.innerHTML = htmlProduct;

  }

  // fucntion para buscar productos por nombre
  function findName(str) {
    const productsFilter = [];
    db.forEach((product) => {
      product.name.includes(str)
        ? productsFilter.push(product)
        : productsFilter;
    });
    return productsFilter;
  }

  //fucntion para buscar producto por categoria
  function findCategory(str) {
    const productsFilter = [];
    db.forEach((product) => {
      product.category === str 
        ? productsFilter.push(product)
        : productsFilter;
    });
    return productsFilter;
  }

  //fuction para buscar un producto por id
  function find(id) {
    return db.find((item) => item.id === id);
  }

  // function para actualizar stock de productos de la constante db
  function removeStock(products) {
    products.forEach((item) => {
      const product = find(item.id);
      product.quantity = product.quantity - item.quantity;
    });
  }

  // evento para crear elemento html para los campos de busqueda
  drowFilters.addEventListener('change', (e) => {
    const elementHtml = document.querySelector('#filter--create');
    let html =""
    if (e.target.value === "0") {
      elementHtml.innerHTML = html;
      renderProducts()
    }
    if (e.target.value === "1") {
      html += `
      <input type="text" id="txt_buscar" placeholder="Nombre a buscar..">
      `
      elementHtml.innerHTML = html;
    }
    if (e.target.value === "2") {
      let html = '<option value="0">--Seleccione Categoria--</option>';
      let htmlCabecera = `<select id="select--filter--categories">`;
      const result = db.reduce((acc, item) => {
        if (!acc.includes(item.category)) {
          acc.push(item.category);
        }
        return acc;
      }, []);

      result.forEach(category => {
        const str2 = category.charAt(0).toUpperCase() + category.slice(1);
        html += `
        <option value="${category}">${str2}</option>
        `
      });

      elementHtml.innerHTML = htmlCabecera + html + ` </select>`;
    }

  });

  // delegacion de eventos por parte del elemento padre que contiene el select creado para el filtro de categoria
  elementFilter.addEventListener('change', (e) => {
    if (e.target.closest("#select--filter--categories")) {
      if (e.target.value === "0") {
        //console.log("0")
        renderProducts();
      }else{
        renderProducts("category", e.target.value)
      }
    }
  });

  // delegacion de eventos por parte del elemento padre que contiene el input creado para el filtro por nombre
  elementFilter.addEventListener('input', (e) => {
    if (e.target.closest("#txt_buscar")) {
      if (e.target.value === "0") {
        //console.log("0")
        renderProducts();
      }else{
        renderProducts("name", e.target.value)
      }
    }
  })

  
  // retornamos las functiones que queremos utilizar o pasar a otras funciones
  return {
    db, renderProducts, find, removeStock
  }

}

// exportamos la function principal products para la utilizacion de la misma en otros archivos js
export default products;

