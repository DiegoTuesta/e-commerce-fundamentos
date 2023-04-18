// fuction para obtener las imagenes y mostras en el index
function slider() {
    const images = JSON.parse(window.localStorage.getItem("products"))
    const slider = document.querySelector('#slider');
    let html = "";
    images.forEach(item => {
        html += `
        <swiper-slide>
            <img loading="lazy" src="${item.image}" />
        </swiper-slide>
        `
    });
    slider.innerHTML = html;
}

export default slider