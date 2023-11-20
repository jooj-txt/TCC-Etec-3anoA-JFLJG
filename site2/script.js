AOS.init();

 var nav = document.querySelector('nav1');

      window.addEventListener('scroll', function () {
        if (window.pageYOffset > 100) {
          nav.classList.add('tccNavbar', 'shadow');
        } else {
          nav.classList.remove('tccNavbar', 'shadow');
        }
      });