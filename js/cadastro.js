document.addEventListener('DOMContentLoaded', function() {
    const iconeMenu = document.querySelector('.icone-menu');
    const barraLateral = document.querySelector('.menu-lateral');

    iconeMenu.addEventListener('click', function() {
        barraLateral.classList.toggle ('show');
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


    // ----------------------- Validação do formulário -----------------------

    // Função para validar o formulário
function validarFormulario() {
    // Obtendo os valores dos campos
    const email = document.getElementById("email").value;
    const nome = document.getElementById("nome").value;
    const telefone = document.getElementById("telefone").value;
    const genero = document.getElementById("genero").value;
    const dataNascimento = document.getElementById("data_nascimento").value;
    const nacionalidade = document.getElementById("nacionalidade").value;
    const estado = document.getElementById("estado").value;
    const cidade = document.getElementById("cidade").value;

    // Verificando se algum campo obrigatório está vazio
    if (!email || !nome || !telefone || !genero || !dataNascimento || !nacionalidade || !estado || !cidade) {
        alert("Por favor, preencha todos os campos obrigatórios.");
        return false;
    }

    // Verificando se o email está no formato correto
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
        alert("Por favor, insira um email válido.");
        return false;
    }

    // Verificando se o telefone segue o formato correto
    const telefoneRegex = /\(\d{2}\) \d{5}-\d{4}/;
    if (!telefoneRegex.test(telefone)) {
        alert("Por favor, insira o telefone no formato (xx) xxxxx-xxxx.");
        return false;
    }

    // Verificando se a data de nascimento é válida (não permitir datas futuras)
    const dataAtual = new Date();
    const nascimento = new Date(dataNascimento);
    if (nascimento > dataAtual) {
        alert("A data de nascimento não pode ser no futuro.");
        return false;
    }

    // Validação de gênero (opcional, mas melhor incluir)
    if (!genero) {
        alert("Por favor, selecione o seu gênero.");
        return false;
    }

    // Validação de nacionalidade (opcional)
    if (!nacionalidade) {
        alert("Por favor, selecione a sua nacionalidade.");
        return false;
    }

    // Validação de estado (opcional)
    if (!estado) {
        alert("Por favor, selecione o seu estado.");
        return false;
    }

    // Validação de cidade (opcional)
    if (!cidade) {
        alert("Por favor, selecione a sua cidade.");
        return false;
    }

    // Se todos os campos estiverem válidos, exibe um alerta de sucesso
    alert("Cadastro realizado com sucesso!");
    return true; // Envia o formulário
}

// Função para atualizar as cidades com base no estado selecionado
function atualizarCidades() {
    const estado = document.getElementById("estado").value;
    const cidadeSelect = document.getElementById("cidade");

    // Limpar as opções de cidade
    cidadeSelect.innerHTML = '<option value="">Selecione</option>';

    // Definindo as cidades para cada estado
    const cidades = {
        "SP": ["São Paulo", "Campinas", "Santos"],
        "RJ": ["Rio de Janeiro", "Niterói", "Petrópolis"],
        "MG": ["Belo Horizonte", "Ouro Preto", "Uberlândia"],
        "RS": ["Porto Alegre", "Caxias do Sul", "Pelotas"],
        "BA": ["Salvador", "Feira de Santana", "Vitória da Conquista"],
        "SC": ["Florianópolis", "Joinville", "Blumenau"],
        "PR": ["Curitiba", "Londrina", "Maringá"],
        "DF": ["Brasília"],
        "PE": ["Recife", "Olinda", "Jaboatão dos Guararapes"],
        "CE": ["Fortaleza", "Sobral", "Juazeiro do Norte"],
        "GO": ["Goiânia", "Anápolis", "Aparecida de Goiânia"],
        "MA": ["São Luís", "Imperatriz", "Caxias"],
        "PA": ["Belém", "Ananindeua", "Marabá"],
        "PB": ["João Pessoa", "Campina Grande", "Patos"],
        "RN": ["Natal", "Mossoró", "Parnamirim"],
        "SE": ["Aracaju", "Lagarto", "Itabaiana"],
        "ES": ["Vitória", "Vila Velha", "Serra"],
        "MT": ["Cuiabá", "Várzea Grande", "Rondonópolis"],
        "MS": ["Campo Grande", "Dourados", "Três Lagoas"],
        "RO": ["Porto Velho", "Ji-Paraná", "Ariquemes"],
        "TO": ["Palmas", "Araguaína", "Gurupi"]
    };

    // Adicionando as opções de cidades baseadas no estado
    if (estado in cidades) {
        cidades[estado].forEach(cidade => {
            const option = document.createElement("option");
            option.value = cidade;
            option.textContent = cidade;
            cidadeSelect.appendChild(option);
        });
    }
}

// Evento para atualizar as cidades ao mudar o estado
document.getElementById("estado").addEventListener("change", atualizarCidades);
