
document.addEventListener('DOMContentLoaded', () => {
  if (!localStorage.getItem('user')) {
    showLoginForm();
  } else {
    loadApp();
  }
});

function showLoginForm() {
  document.getElementById('mainContent').innerHTML = \`
    <h2>Iniciar sesión / Registrarse</h2>
    <form onsubmit="handleAuth(event)">
      <input type="text" id="username" placeholder="Usuario" required><br>
      <input type="email" id="email" placeholder="Email" required><br>
      <input type="password" id="password" placeholder="Contraseña" required><br>
      <button type="submit">Ingresar</button>
    </form>
  \`;
}

function handleAuth(e) {
  e.preventDefault();
  const user = document.getElementById('username').value;
  const pass = document.getElementById('password').value;
  const email = document.getElementById('email').value;
  if (user === 'admin' && pass === 'pipetrolo') {
    localStorage.setItem('user', JSON.stringify({ user, admin: true }));
  } else {
    localStorage.setItem('user', JSON.stringify({ user, email, admin: false, canjeados: [] }));
  }
  loadApp();
}

function loadApp() {
  document.getElementById('mainContent').innerHTML = '<h2>Catálogo de Cupones</h2><div id="cupones"></div>';
  renderCupones();
}

function renderCupones() {
  let cupones = JSON.parse(localStorage.getItem('cupones')) || [];
  let html = '';
  cupones.forEach((c, i) => {
    html += \`<div><img src="\${c.img}" width="100"><h3>\${c.titulo}</h3><p>\${c.desc}</p>\`;
    if (isAdmin()) {
      html += \`<button onclick="deleteCupon(\${i})">Eliminar</button>\`;
    } else {
      html += \`<button onclick="canjear(\${i})">Canjear</button>\`;
    }
    html += '</div><hr>';
  });
  document.getElementById('cupones').innerHTML = html;
}

function canjear(i) {
  let user = JSON.parse(localStorage.getItem('user'));
  if (!user.canjeados.includes(i)) {
    user.canjeados.push(i);
    alert('¡Cupón canjeado!');
  } else {
    alert('Ya canjeaste este cupón.');
  }
  localStorage.setItem('user', JSON.stringify(user));
}

function isAdmin() {
  let user = JSON.parse(localStorage.getItem('user'));
  return user && user.admin;
}

function logout() {
  localStorage.removeItem('user');
  location.reload();
}

function navigate(section) {
  const content = document.getElementById('mainContent');
  if (section === 'perfil') {
    let user = JSON.parse(localStorage.getItem('user'));
    content.innerHTML = \`<h2>Mi Perfil</h2><p>Canjeados: \${user.canjeados.length}</p>\`;
  } else if (section === 'quienes') {
    content.innerHTML = '<h2>¿Quiénes somos?</h2><p>Somos un grupo dedicado a conectar descuentos con personas.</p>';
  } else {
    loadApp();
  }
}
