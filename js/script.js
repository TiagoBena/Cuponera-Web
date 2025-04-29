const app = document.getElementById('main');
const nav = document.getElementById('nav');
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
let users = JSON.parse(localStorage.getItem('users')) || [];
let cupones = JSON.parse(localStorage.getItem('cupones')) || [];

function saveData() {
  localStorage.setItem('users', JSON.stringify(users));
  localStorage.setItem('cupones', JSON.stringify(cupones));
  localStorage.setItem('currentUser', JSON.stringify(currentUser));
}

function showLogin() {
  nav.innerHTML = '';
  app.innerHTML = `
    <div class="card">
      <h2>Iniciar Sesión</h2>
      <input id="user" placeholder="Usuario"><br>
      <input id="pass" type="password" placeholder="Contraseña"><br>
      <button onclick="login()">Ingresar</button>
      <p>¿No tienes cuenta? <a href="#" onclick="showRegister()">Registrate aquí</a></p>
    </div>
  `;
}

function showRegister() {
  nav.innerHTML = '';
  app.innerHTML = `
    <div class="card">
      <h2>Registro</h2>
      <input id="newuser" placeholder="Usuario"><br>
      <input id="newemail" placeholder="Email"><br>
      <input id="newpass" type="password" placeholder="Contraseña"><br>
      <button onclick="register()">Registrarse</button>
    </div>
  `;
}

function login() {
  const user = document.getElementById('user').value;
  const pass = document.getElementById('pass').value;
  if(user === 'admin' && pass === 'pipetrolo') {
    currentUser = { user: 'admin', admin: true };
    saveData();
    loadApp();
    return;
  }
  const found = users.find(u => u.user === user && u.pass === pass);
  if(found) {
    currentUser = { user: found.user, email: found.email, admin: false, canjeados: found.canjeados || [] };
    saveData();
    loadApp();
  } else {
    alert('Usuario o contraseña incorrectos');
  }
}

function register() {
  const user = document.getElementById('newuser').value;
  const email = document.getElementById('newemail').value;
  const pass = document.getElementById('newpass').value;
  if(users.find(u => u.user === user)) {
    alert('Usuario ya existe');
    return;
  }
  users.push({ user, email, pass, canjeados: [] });
  alert('🎉 Gracias por unirte a Cuponera.Pina! 🎉');
  saveData();
  showLogin();
}

function logout() {
  currentUser = null;
  saveData();
  showLogin();
}

function loadApp() {
  nav.innerHTML = `
    <a href="#" onclick="loadCupones()">Cupones</a>
    <a href="#" onclick="loadPerfil()">Perfil</a>
    <a href="#" onclick="logout()">Cerrar Sesión</a>
  `;
  loadCupones();
}

function loadCupones() {
  if(currentUser.admin) {
    app.innerHTML = `
      <div class="card">
        <h2>Crear Cupón</h2>
        <input id="cupontitle" placeholder="Título"><br>
        <button onclick="crearCupon()">Crear</button>
      </div>
      <div id="cupones"></div>
    `;
  } else {
    app.innerHTML = `<h2>Cupones Disponibles</h2><div id="cupones"></div>`;
  }
  renderCupones();
}

function crearCupon() {
  const title = document.getElementById('cupontitle').value;
  if(title.trim()) {
    cupones.push({ id: Date.now(), title });
    saveData();
    renderCupones();
  }
}

function renderCupones() {
  const container = document.getElementById('cupones');
  container.innerHTML = '';
  cupones.forEach(c => {
    let canjeado = currentUser.canjeados && currentUser.canjeados.includes(c.id);
    container.innerHTML += `
      <div class="card">
        <h3>${c.title}</h3>
        ${currentUser.admin ? `<button onclick="borrarCupon(${c.id})">Borrar</button>` :
          canjeado ? `<button disabled>Canjeado</button>` : `<button onclick="canjearCupon(${c.id})">Canjear</button>`}
      </div>
    `;
  });
}

function borrarCupon(id) {
  cupones = cupones.filter(c => c.id !== id);
  saveData();
  renderCupones();
}

function canjearCupon(id) {
  if(!currentUser.canjeados) currentUser.canjeados = [];
  if(!currentUser.canjeados.includes(id)) {
    currentUser.canjeados.push(id);
    users = users.map(u => u.user === currentUser.user ? {...u, canjeados: currentUser.canjeados} : u);
    saveData();
    renderCupones();
  }
}

function loadPerfil() {
  app.innerHTML = `
    <div class="card">
      <h2>Mi Perfil</h2>
      <p>Usuario: ${currentUser.user}</p>
      <p>Email: ${currentUser.email || '(admin)'}</p>
      <p>Cupones disponibles: ${cupones.length - (currentUser.canjeados?.length || 0)}</p>
      <p>Cupones canjeados: ${currentUser.canjeados?.length || 0}</p>
    </div>
  `;
}

if(currentUser) loadApp();
else showLogin();
