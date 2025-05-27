document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('cadastro-form');
  form.addEventListener('submit', e => {
    e.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const sobrenome = document.getElementById('sobrenome').value.trim();
    const email = document.getElementById('email').value.trim();
    const cpf = document.getElementById('cpf').value.trim();
    const senha = document.getElementById('senha').value;
    const confirmar = document.getElementById('confirmar_senha').value;
    const termos = document.getElementById('termos').checked;

    if (!nome || !sobrenome || !email || !cpf || !senha || !confirmar) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    if (senha.length < 6) {
      alert('A senha deve ter ao menos 6 caracteres.');
      return;
    }
    if (senha !== confirmar) {
      alert('As senhas não coincidem.');
      return;
    }
    if (!termos) {
      alert('Você precisa aceitar os termos e condições.');
      return;
    }

    localStorage.setItem('userNome', nome);
    localStorage.setItem('userSobrenome', sobrenome);
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userCPF', cpf);
    localStorage.setItem('userSenha', senha);

    alert('Cadastro realizado com sucesso!');
    window.location.href = 'index.html';
  });
});
