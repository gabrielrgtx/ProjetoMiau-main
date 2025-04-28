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

    const profileHeader = document.querySelector('.profile-header');
    const profilePictureContainer = document.querySelector('.profile-picture-container');
    const profileInfo = document.querySelector('.profile-info');
    const petPhotoContainer = document.querySelector('.pet-photo-container');

    menuButtons.forEach(button => {
        button.addEventListener('click', function() {
            menuButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            for (const key in contentDivs) {
                contentDivs[key].style.display = 'none';
            }
            
            const buttonText = this.textContent;
            if (contentDivs[buttonText]) {
                contentDivs[buttonText].style.display = 'block';
            }

            const shouldShowProfileElements = buttonText === 'Dados pessoais';
            if (profileHeader) profileHeader.style.display = shouldShowProfileElements ? 'block' : 'none';
            if (profilePictureContainer) profilePictureContainer.style.display = shouldShowProfileElements ? 'block' : 'none';
            if (profileInfo) profileInfo.style.display = shouldShowProfileElements ? 'block' : 'none';
            if (petPhotoContainer) petPhotoContainer.style.display = shouldShowProfileElements ? 'block' : 'none';
        });
    });

    const defaultActiveButton = document.querySelector('.sidebar-menu button.active');
    if (defaultActiveButton) {
        defaultActiveButton.click();
    }

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
});