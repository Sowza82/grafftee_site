document.addEventListener('DOMContentLoaded', function() {
    const iconeMenu = document.querySelector('.icone-menu');
    const barraLateral = document.querySelector('.menu-lateral');

    iconeMenu.addEventListener('click', function() {
        barraLateral.classList.toggle('show');
    });

    window.addEventListener ('resize', function() {
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
  
  const voltarAoTopoButton = document.getElementById('voltar-ao-topo');
  voltarAoTopoButton.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
  });
  
  
    // ----------------------- Dropdown -----------------------
    const dropdownMenus = document.querySelectorAll('.menu-dropdown');

    // Limpa qualquer submenu aberto na inicialização
    dropdownMenus.forEach(dropdown => {
        const dropdownContent = dropdown.querySelector('.submenu');
        dropdownContent.style.display = 'none'; // Garante que todos os submenus comecem ocultos
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
                event.stopPropagation(); // Impede o clique de propagar
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

   // ----------------------- Validação formulário -----------------------

// Variável para rastrear se o formulário foi validado corretamente
let formularioValido = true;

// Função para validar o formulário
function validarFormulario(event) {
    const usuario = document.getElementById('usuario').value;
    const senha = document.getElementById('senha').value;
    const mensagem = document.getElementById('mensagem').value;

    let mensagensErro = [];
    const errorContainer = document.getElementById('error-container'); // Contêiner para as mensagens de erro
    errorContainer.innerHTML = ""; // Limpar mensagens de erro anteriores

    // Validação do campo 'Usuário'
    if (usuario.trim() === "") {
        mensagensErro.push("O campo 'Usuário' é obrigatório. Por favor, preencha este campo.");
    } else if (usuario.length < 3) {
        mensagensErro.push("O campo 'Usuário' deve conter pelo menos 3 caracteres.");
    }

    // Validação do campo 'Senha'
    if (senha.trim() === "") {
        mensagensErro.push("O campo 'Senha' é obrigatório. Por favor, insira uma senha.");
    } else if (senha.length < 8) {
        mensagensErro.push("A senha deve ter no mínimo 8 caracteres.");
    } else if (!/[a-z]/.test(senha)) {
        mensagensErro.push("A senha deve conter pelo menos uma letra minúscula.");
    } else if (!/[A-Z]/.test(senha)) {
        mensagensErro.push("A senha deve conter pelo menos uma letra maiúscula.");
    } else if (!/[0-9]/.test(senha)) {
        mensagensErro.push("A senha deve conter pelo menos um número.");
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(senha)) {
        mensagensErro.push("A senha deve conter pelo menos um caractere especial.");
    }

    // Validação do campo 'Mensagem' (caso tenha)
    if (mensagem.length > 100) {
        mensagensErro.push("A mensagem deve ter no máximo 100 caracteres.");
    }

    // Se houver erros, mostra as mensagens e impede o envio
    if (mensagensErro.length > 0) {
        // Exibe as mensagens de erro
        mensagensErro.forEach(function(msg) {
            const errorItem = document.createElement('p');
            errorItem.textContent = msg;
            errorContainer.appendChild(errorItem);
        });

        formularioValido = false;
        event.preventDefault(); // Impede o envio do formulário
    } else {
        formularioValido = true;
    }
}

// Evento de 'submit' para validação do formulário
document.getElementById('loginForm').addEventListener('submit', function(event) {
    validarFormulario(event);
});

// Evento para confirmar se o usuário deseja sair ou atualizar a página
window.addEventListener('beforeunload', function(event) {
    if (!formularioValido) {
        const message = "Você tem mudanças não enviadas. Deseja realmente sair?";
        event.returnValue = message; // Para navegadores antigos
        return message; // Para navegadores modernos
    }
});
