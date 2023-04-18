function dark() {
    const nav = document.querySelector('.nav');
    let i = document.querySelector('#i--dark');
    //localStorage.setItem('dark-mode','false')
    nav.addEventListener('click', function (e) {
      if (e.target.closest('.btn--dark')) {
        document.documentElement.classList.toggle('light');
        if (document.documentElement.classList.contains('light')) {
            localStorage.setItem('dark-mode','true')
            i.classList.add('bxs-moon')
            i.classList.remove('bxs-sun')
        }else{
            localStorage.setItem('dark-mode','false')
            i.classList.remove('bxs-moon')
            i.classList.add('bxs-sun')
        }
      }
    });
    //console.log(localStorage.getItem('dark-mode'))
    if (localStorage.getItem('dark-mode') === 'true') {
        document.documentElement.classList.add('light');
        i.classList.add('bxs-moon')
        i.classList.remove('bxs-sun')
        
      } else {
        document.documentElement.classList.remove('light');
        i.classList.remove('bxs-moon')
        i.classList.add('bxs-sun')
       }
  }
  
  export default dark