document.addEventListener('DOMContentLoaded', function() {
    const senhaInput = document.getElementById('senha');
    const toggleSenhaButton = document.getElementById('toggleSenha');

    toggleSenhaButton.addEventListener('click', function() {
        const type = senhaInput.getAttribute('type') === 'password' ? 'text' : 'password';
        senhaInput.setAttribute('type', type);
        toggleSenhaButton.textContent = type === 'password' ? 'Mostrar' : 'Ocultar';
    });
});

document.addEventListener('DOMContentLoaded', function() {

    const menuButtons = document.querySelectorAll('.sidebar-menu button');
    const contentDivs = {
        'Dados pessoais': document.getElementById('dadosPessoais'),
        'Consultas': document.getElementById('consultas'),
        'Meus PETS': document.getElementById('meusPets')
    };

    menuButtons.forEach(button => {
        button.addEventListener('click', function() {

            menuButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            for (const key in contentDivs) {
                if (contentDivs.hasOwnProperty(key)) {
                    contentDivs[key].style.display = 'none';
                }
            }

            const buttonText = this.textContent;
            if (contentDivs[buttonText]) {
                contentDivs[buttonText].style.display = 'block';
            }

            if (buttonText === 'Dados pessoais') {
                const profileHeader = document.querySelector('.profile-header');
                const profilePictureContainer = document.querySelector('.profile-picture-container');
                const profileInfo = document.querySelector('.profile-info');
                const petPhotoContainer = document.querySelector('.pet-photo-container');

                if (profileHeader) profileHeader.style.display = 'block';
                if (profilePictureContainer) profilePictureContainer.style.display = 'block';
                if (profileInfo) profileInfo.style.display = 'block';
                if (petPhotoContainer) petPhotoContainer.style.display = 'block';
            } else {
                const profileHeader = document.querySelector('.profile-header');
                const profilePictureContainer = document.querySelector('.profile-picture-container');
                const profileInfo = document.querySelector('.profile-info');
                const petPhotoContainer = document.querySelector('.pet-photo-container');

                if (profileHeader) profileHeader.style.display = 'none';
                if (profilePictureContainer) profilePictureContainer.style.display = 'none';
                if (profileInfo) profileInfo.style.display = 'none';
                if (petPhotoContainer) petPhotoContainer.style.display = 'none';
            }
        });
    });

    const defaultActiveButton = document.querySelector('.sidebar-menu button.active');
    if (defaultActiveButton) {
        defaultActiveButton.click();
    }
});