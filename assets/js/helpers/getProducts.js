// fucntion asincronica en la peticion de la api para la obtencion de los productos
async function getProducts() {
  try {
    const res = await window.fetch('https://ecommercebackend.fundamentos-29.repl.co/')
    const data = await res.json()
    window.localStorage.setItem("products", JSON.stringify(data));
    //window.localStorage.setItem("cart", [])
  } catch (error) {
    console.log(error)
  }
}

export default getProducts