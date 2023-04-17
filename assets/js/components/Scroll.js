function Scroll() {
    document.addEventListener('scroll', () =>{
        const header  = document.querySelector('header');
        window.scrollY > 0 ? header.classList.add('scrolled') : header.classList.remove('scrolled')
    })
}

export default Scroll