document.addEventListener('DOMContentLoaded', function() {
    const iconeMenu = document.querySelector('.icone-menu');
    const barraLateral = document.querySelector('.menu-lateral');

    iconeMenu.addEventListener('click', function() {
        barraLateral.classList.toggle('show');
    });

    window.addEventListener('resize', function() {
        if (window.innerWidth >= 769) {
            barraLateral.classList.remove('show');
        }
    });

    // Disparar evento de redimensionamento ao carregar a página
    window.dispatchEvent(new Event('resize'));
});

  
  window.addEventListener('scroll', function() {
    const voltarAoTopoButton = document.getElementById('voltar-ao-topo');
    if (window.scrollY > 100) {
        voltarAoTopoButton.style.display = 'block';
    } else {
        voltarAoTopoButton.style.display = 'none';
    }
  });
  // Funcionalidade do carrossel
const carouselItems = document.querySelectorAll('.carrossel img');
const carouselControls = document.querySelectorAll('.controles span');
let currentIndex = 0;

function showSlide(index) {
    carouselItems.forEach(item => item.classList.remove('ativo'));
    carouselItems[index].classList.add('ativo');
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % carouselItems.length;
    showSlide(currentIndex);
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
    showSlide(currentIndex);
}

carouselControls.forEach(control => {
    control.addEventListener('click', function() {
        if (control.classList.contains('anterior')) {
            prevSlide();
        } else if (control.classList.contains('proximo')) {
            nextSlide();
        }
    });
});

// Slideshow automático a cada 5 segundos
setInterval(nextSlide, 5000);

  const voltarAoTopoButton = document.getElementById('voltar-ao-topo');
  voltarAoTopoButton.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
  });
  