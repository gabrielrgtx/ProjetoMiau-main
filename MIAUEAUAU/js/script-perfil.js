document.addEventListener("DOMContentLoaded", () => {
  const toggleSenha = document.getElementById("toggleSenha");
  const senhaInput   = document.getElementById("senha");

  // Mostrar / ocultar senha
  toggleSenha.addEventListener("click", () => {
    const isPwd = senhaInput.type === "password";
    senhaInput.type = isPwd ? "text" : "password";
    toggleSenha.textContent = isPwd ? "Ocultar" : "Mostrar";
  });

  // Tabs do menu
  const menuButtons  = document.querySelectorAll('.sidebar-menu button');
  const sections     = document.querySelectorAll('.section');

  menuButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // ativa só um botão
      menuButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // esconde todas as seções
      sections.forEach(sec => sec.classList.add('hidden'));

      // mostra só a desejada
      const target = btn.dataset.target;
      document.getElementById(target).classList.remove('hidden');

      // ajusta a classe do body para estilos condicionais
      document.body.className = '';
      document.body.classList.add(target + '-ativa');
    });
  });

  // dispara primeira aba
  document.querySelector('.sidebar-menu button.active').click();

  // Formatação de CPF
  document.getElementById('cpf').addEventListener('input', e => {
    let v = e.target.value.replace(/\D/g, '').slice(0,11);
    v = v
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    e.target.value = v;
  });

  // Photo Upload/Profile Pic
  const profileImage       = document.querySelector('.profile-picture');
  const fileInput          = document.getElementById('fileInput');
  document.querySelector('.edit-photo-button').addEventListener('click', () => fileInput.click());
  fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
      profileImage.src = e.target.result;
      localStorage.setItem('profilePhoto', e.target.result);
    };
    reader.readAsDataURL(file);
  });
  document.querySelector('.delete-photo-button').addEventListener('click', () => {
    if (confirm("Tem certeza que deseja apagar a foto de perfil?")) {
      profileImage.src = 'placeholder-profile.png';
      localStorage.removeItem('profilePhoto');
    }
  });

  // Photo Upload/Pet Pic
  const petPhoto  = document.querySelector('.pet-photo');
  const petInput  = document.getElementById('petFileInput');
  document.querySelector('.edit-pet-photo-button').addEventListener('click', () => petInput.click());
  petInput.addEventListener('change', () => {
    const file = petInput.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
      petPhoto.src = e.target.result;
      localStorage.setItem('petPhoto', e.target.result);
    };
    reader.readAsDataURL(file);
  });

  // Dados vindos do localStorage
  const loadField = id => {
    const v = localStorage.getItem(id);
    if (v) document.getElementById(id).value = v;
  };
  ['nome','sobrenome','email','senha','cpf'].forEach(loadField);
  const savedPhoto = localStorage.getItem('profilePhoto');
  if (savedPhoto) profileImage.src = savedPhoto;
  const savedPet = localStorage.getItem('petPhoto');
  if (savedPet) petPhoto.src = savedPet;

  // Inicializa arrays de consultas e pets
  const consultas = JSON.parse(localStorage.getItem('consultas') || '[]');
  const meusPets   = JSON.parse(localStorage.getItem('meusPets')   || '[]');
  const contConsultas = document.getElementById('consultas');
  const contPets      = document.getElementById('meusPets');

  contConsultas.innerHTML = consultas.length
    ? `<ul>${consultas.map(c => `<li>${c}</li>`).join('')}</ul>`
    : '<p>Você ainda não possui consultas cadastradas.</p>';

  contPets.innerHTML = meusPets.length
    ? `<ul>${meusPets.map(p => `<li>${p}</li>`).join('')}</ul>`
    : '<p>Você ainda não cadastrou seus pets.</p>';

  // Validação de formulário
  const form = document.getElementById('profileForm');
  form.addEventListener('submit', e => {
    e.preventDefault();

    const nome      = form.nome.value.trim();
    const sobrenome = form.sobrenome.value.trim();
    const email     = form.email.value.trim();
    const senha     = form.senha.value.trim();
    const cpf       = form.cpf.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nome || !sobrenome || !email || !senha || !cpf) {
      return alert('Por favor, preencha todos os campos.');
    }
    if (!emailRegex.test(email)) {
      return alert('Por favor, insira um e-mail válido.');
    }
    if (senha.length < 4) {
      return alert('A senha deve ter pelo menos 4 caracteres.');
    }

    ['nome','sobrenome','email','senha','cpf'].forEach(id =>
      localStorage.setItem(id, form[id].value.trim())
    );
    alert('Dados salvos com sucesso!');
  });
});
