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

document.addEventListener('DOMContentLoaded', () => {
    const cabecalhos = document.querySelectorAll('.conteudo-secao h2');

    cabecalhos.forEach(cabecalho => {
        cabecalho.addEventListener('click', () => {
            const conteudo = cabecalho.parentNode;
            conteudo.classList.toggle('ativo');

            // Atualizar o ícone
            const icone = cabecalho.querySelector('.icone-toggle');
            if (conteudo.classList.contains('ativo')) {
                icone.innerHTML = '˄'; // Seta para cima
            } else {
                icone.innerHTML = '˅'; // Seta para baixo
            }
        });
    });
});

window.addEventListener('scroll', function() {
    const voltarAoTopoButton = document.getElementById('voltar-ao-topo');
    if (window.scrollY > 100) {
        voltarAoTopoButton.style.display = 'block';
    } else {
        voltarAoTopoButton.style.display = 'none';
    }
});

const voltarAoTopoButton = document.getElementById('voltar-ao-topo');
voltarAoTopoButton.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
