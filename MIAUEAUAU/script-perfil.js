document.addEventListener("DOMContentLoaded", function() {
    var toggleSenha = document.getElementById("toggleSenha");
    var senhaInput = document.getElementById("senha");
    
    toggleSenha.addEventListener("click", function() {
        if (senhaInput.type === "password") {
            senhaInput.type = "text";
            toggleSenha.textContent = "Ocultar";
        } else {
            senhaInput.type = "password";
            toggleSenha.textContent = "Mostrar";
        }
    });

    const menuButtons = document.querySelectorAll('.sidebar-menu button');
    const contentDivs = {
        'Dados pessoais': document.getElementById('dadosPessoais'),
        'Consultas': document.getElementById('consultas'),
        'Meus PETS': document.getElementById('meusPets')
    };

    const profileForm = document.getElementById('profileForm'); // Formulário de dados pessoais
    const petPhotoContainer = document.querySelector('.pet-photo-container'); // Foto do PET

    menuButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Remove a classe 'active' de todos os botões
            menuButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Oculta todos os conteúdos
            for (const key in contentDivs) {
                contentDivs[key].style.display = 'none';
            }

            // Exibe o conteúdo da aba selecionada
            const buttonText = this.textContent;
            if (contentDivs[buttonText]) {
                contentDivs[buttonText].style.display = 'block';
            }

            // Exibe ou oculta elementos específicos
            const shouldShowProfileForm = buttonText === 'Dados pessoais';
            profileForm.style.display = shouldShowProfileForm ? 'block' : 'none';
            petPhotoContainer.style.display = shouldShowProfileForm ? 'block' : 'none'; // Oculta a foto de perfil e opções
        });
    });

    // Clique inicial na aba ativa
    const defaultActiveButton = document.querySelector('.sidebar-menu button.active');
    if (defaultActiveButton) {
        defaultActiveButton.click();
    }

    document.getElementById('cpf').addEventListener('input', function (e) {
        this.value = this.value.replace(/\D/g, '').slice(0, 11); // Remove caracteres não numéricos e limita a 11 dígitos
    });

    // Lógica para mudança da foto
    const editPhotoButton = document.querySelector('.edit-photo-button');
    const deletePhotoButton = document.querySelector('.delete-photo-button');
    const profileImage = document.querySelector('.profile-picture');
    const fileInput = document.getElementById('fileInput');

    editPhotoButton.addEventListener('click', function() {
        fileInput.click(); // Simula o clique no input file
    });

    fileInput.addEventListener('change', function() {
        if (fileInput.files && fileInput.files[0]) {
            const reader = new FileReader();

            reader.onload = function(e) {
                profileImage.src = e.target.result; 
            }

            reader.readAsDataURL(fileInput.files[0]);
        }
    });

    deletePhotoButton.addEventListener('click', function() {
        const confirmation = confirm("Tem certeza que deseja apagar a foto de perfil?");
        if (confirmation) {
            profileImage.src = 'placeholder-profile.png'; // Volta para a imagem padrão
        }
    });

    const consultasDiv = document.getElementById('consultas');
    const meusPetsDiv = document.getElementById('meusPets');

    // Simulação de dados do usuário
    const consultas = []; // Lista de consultas do usuário
    const meusPets = []; // Lista de pets do usuário

    if (consultas.length === 0) {
        consultasDiv.innerHTML = '<p>Você ainda não possui consultas cadastradas.</p>';
    } else {
        consultasDiv.innerHTML = '<ul>' + consultas.map(c => `<li>${c}</li>`).join('') + '</ul>';
    }

    if (meusPets.length === 0) {
        meusPetsDiv.innerHTML = '<p>Você ainda não cadastrou seus pets.</p>';
    } else {
        meusPetsDiv.innerHTML = '<ul>' + meusPets.map(p => `<li>${p}</li>`).join('') + '</ul>';
    }
});