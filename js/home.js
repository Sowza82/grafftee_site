document.addEventListener('DOMContentLoaded', function() {
    // Selecionando elementos do menu lateral
    const iconeMenu = document.querySelector('.icone-menu');
    const barraLateral = document.querySelector('.menu-lateral');
    const voltarAoTopoButton = document.getElementById ('voltar-ao-topo');

    // Toggling da visibilidade da barra lateral
    iconeMenu.addEventListener('click', function() {
        barraLateral.classList.toggle('show');
    });

    // Remover a classe 'show' se a largura da tela for maior que 769px
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 769) {
            barraLateral.classList.remove('show');
        }
    });

    // Disparar evento de redimensionamento ao carregar a página
    window.dispatchEvent(new Event('resize'));

    // Controle do botão 'voltar ao topo'
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            voltarAoTopoButton.style.display = 'block';
        } else {
            voltarAoTopoButton.style.display = 'none';
        }
    });



    // Controle do botão 'voltar ao topo'
    window.addEventListener('scroll', function () {
        voltarAoTopoButton.style.display = window.scrollY > 100 ? 'block' : 'none';
    });

    // Função de clique do botão 'voltar ao topo'
    voltarAoTopoButton.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ----------------------- Carrossel -----------------------
    const images = document.querySelectorAll('.carrossel img');
    const prevButton = document.querySelector('.controles .anterior');
    const nextButton = document.querySelector('.controles .proximo');
    let currentIndex = 0;

    // Função para mostrar a imagem ativa
    function showImage(index) {
        images.forEach((img, i) => img.classList.toggle('ativo', i === index));
    }

    // Exibir a imagem inicial
    showImage(currentIndex);

    // Avançar para a próxima imagem
    function nextImage() {
        currentIndex = (currentIndex + 1) % images.length; 
        showImage(currentIndex);
    }

    // Voltar para a imagem anterior
    prevButton.addEventListener('click', function () {
        currentIndex = (currentIndex - 1 + images.length) % images.length; 
        showImage(currentIndex);
    });

    // Avançar para a próxima imagem ao clicar no botão 'Próximo'
    nextButton.addEventListener('click', nextImage);

    // Configurar avanço automático do carrossel a cada 5 segundos
    let autoSlideInterval = setInterval(nextImage, 5000);

    // Pausar o avanço automático ao interagir com os botões
    [prevButton, nextButton].forEach(button => {
        button.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
        button.addEventListener('mouseleave', () => {
            autoSlideInterval = setInterval(nextImage, 5000);
        });
    });

    // ----------------------- Dropdown -----------------------
    const dropdownMenus = document.querySelectorAll('.menu-dropdown');

    // Limpa qualquer submenu aberto na inicialização
    dropdownMenus.forEach(dropdown => {
        const dropdownContent = dropdown.querySelector('.submenu');
        dropdownContent.style.display = 'none';
    });

    dropdownMenus.forEach(dropdown => {
        const dropdownContent = dropdown.querySelector('.submenu');

        // Mostrar o submenu ao passar o mouse (para desktop)
        dropdown.addEventListener('mouseenter', function () {
            dropdownContent.style.display = 'block';
        });

        // Esconder o submenu ao sair o mouse (para desktop)
        dropdown.addEventListener('mouseleave', function () {
            dropdownContent.style.display = 'none';
        });

        // Mostrar ou esconder o submenu ao clicar (para mobile)
        dropdown.addEventListener('click', function (event) {
            if (window.innerWidth < 768) {
                event.stopPropagation(); 
                const isVisible = dropdownContent.style.display === 'block';
                dropdownContent.style.display = isVisible ? 'none' : 'block';
            }
        });
    });

    // Adicionar um event listener para fechar o submenu ao clicar fora dele em mobile
    document.addEventListener('click', function (event) {
        dropdownMenus.forEach(dropdown => {
            const dropdownContent = dropdown.querySelector('.submenu');
            if (!dropdown.contains(event.target)) {
                dropdownContent.style.display = 'none';
            }
        });
    });
  
});
