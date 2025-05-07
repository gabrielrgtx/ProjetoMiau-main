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

    const profileForm = document.getElementById('profileForm');
    const petPhotoContainer = document.querySelector('.pet-photo-container');

    menuButtons.forEach(button => {
        button.addEventListener('click', function () {
            menuButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            for (const key in contentDivs) {
                contentDivs[key].style.display = 'none';
            }

            const buttonText = this.textContent;
            if (contentDivs[buttonText]) {
                contentDivs[buttonText].style.display = 'block';
            }

            document.body.className = '';
            if (buttonText === 'Dados pessoais') {
                document.body.classList.add('dados-pessoais-ativa');
            } else if (buttonText === 'Consultas') {
                document.body.classList.add('consultas-ativa');
            } else if (buttonText === 'Meus PETS') {
                document.body.classList.add('meus-pets-ativa');
            }
        });
    });

    const defaultActiveButton = document.querySelector('.sidebar-menu button.active');
    if (defaultActiveButton) {
        defaultActiveButton.click();
    }

    document.getElementById('cpf').addEventListener('input', function (e) {
        let value = this.value.replace(/\D/g, '').slice(0, 11);
        value = value.replace(/(\d{3})(\d)/, '$1.$2')
                     .replace(/(\d{3})(\d)/, '$1.$2')
                     .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        this.value = value;
    });

    const editPhotoButton = document.querySelector('.edit-photo-button');
    const deletePhotoButton = document.querySelector('.delete-photo-button');
    const profileImage = document.querySelector('.profile-picture');
    const fileInput = document.getElementById('fileInput');

    editPhotoButton.addEventListener('click', function() {
        fileInput.click();
    });

    fileInput.addEventListener('change', function() {
        if (fileInput.files && fileInput.files[0]) {
            const reader = new FileReader();
            reader.onload = function(e) {
                profileImage.src = e.target.result;
                localStorage.setItem('profilePhoto', e.target.result);
            }
            reader.readAsDataURL(fileInput.files[0]);
        }
    });

    deletePhotoButton.addEventListener('click', function() {
        const confirmation = confirm("Tem certeza que deseja apagar a foto de perfil?");
        if (confirmation) {
            profileImage.src = 'placeholder-profile.png';
            localStorage.removeItem('profilePhoto');
        }
    });

    const consultasDiv = document.getElementById('consultas');
    const meusPetsDiv = document.getElementById('meusPets');

    const consultas = [];
    const meusPets = [];

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

    // Carregar dados do localStorage
    ['nome', 'sobrenome', 'email', 'senha', 'cpf'].forEach(id => {
        const input = document.getElementById(id);
        const savedValue = localStorage.getItem(id);
        if (savedValue) input.value = savedValue;
    });

    const savedPhoto = localStorage.getItem('profilePhoto');
    if (savedPhoto) {
        profileImage.src = savedPhoto;
    }

    // Validação e salvamento
    profileForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const nome = document.getElementById('nome').value.trim();
        const sobrenome = document.getElementById('sobrenome').value.trim();
        const email = document.getElementById('email').value.trim();
        const senha = document.getElementById('senha').value.trim();
        const cpf = document.getElementById('cpf').value.trim();

        if (!nome || !sobrenome || !email || !senha || !cpf) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        if (!email.includes('@') || !email.includes('.')) {
            alert('Por favor, insira um e-mail válido.');
            return;
        }

        if (senha.length < 4) {
            alert('A senha deve ter pelo menos 4 caracteres.');
            return;
        }

        // Salvar no localStorage
        localStorage.setItem('nome', nome);
        localStorage.setItem('sobrenome', sobrenome);
        localStorage.setItem('email', email);
        localStorage.setItem('senha', senha);
        localStorage.setItem('cpf', cpf);

        alert('Dados salvos com sucesso!');
    });
});
