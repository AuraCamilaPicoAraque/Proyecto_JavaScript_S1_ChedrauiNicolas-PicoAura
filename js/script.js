  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');
  const loginButton = document.getElementById('loginButton');

  // Función para validar los campos
  function validateInputs() {
    if (usernameInput.value.trim() !== '' && passwordInput.value.trim() !== '') {
      loginButton.disabled = false;
    } else {
      loginButton.disabled = true;
    }
  }

  // Escuchar cambios en los inputs
  usernameInput.addEventListener('input', validateInputs);
  passwordInput.addEventListener('input', validateInputs);

  // Manejar el clic del botón
  loginButton.addEventListener('click', function() {
    if (usernameInput.value.trim() !== '' && passwordInput.value.trim() !== '') {
      window.location.href = './index/menu.html';
    }
  });