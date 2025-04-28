
function mostrarInicio() {
  document.getElementById('inicio').classList.remove('hidden');
  document.getElementById('cupones').classList.add('hidden');
  document.getElementById('nosotros').classList.add('hidden');
}

function mostrarCupones() {
  document.getElementById('inicio').classList.add('hidden');
  document.getElementById('cupones').classList.remove('hidden');
  document.getElementById('nosotros').classList.add('hidden');
}

function mostrarNosotros() {
  document.getElementById('inicio').classList.add('hidden');
  document.getElementById('cupones').classList.add('hidden');
  document.getElementById('nosotros').classList.remove('hidden');
}

function agregarCupon() {
  const titulo = document.getElementById('titulo').value.trim();
  const descripcion = document.getElementById('descripcion').value.trim();
  const vencimiento = document.getElementById('vencimiento').value;
  const imagen = document.getElementById('imagen').value.trim();

  if (!titulo || !descripcion || !vencimiento) {
    alert('Por favor completa todos los campos obligatorios.');
    return;
  }

  const cuponDiv = document.createElement('div');
  cuponDiv.className = 'cupon';

  cuponDiv.innerHTML = `
    <img src="${imagen || 'img/logo.png'}" alt="Imagen Cupón">
    <h3>${titulo}</h3>
    <p>${descripcion}</p>
    <p><strong>Vence:</strong> ${vencimiento}</p>
    <button onclick="editarCupon(this)">Editar</button>
    <button onclick="borrarCupon(this)">Borrar</button>
  `;

  document.getElementById('listaCupones').appendChild(cuponDiv);

  document.getElementById('titulo').value = '';
  document.getElementById('descripcion').value = '';
  document.getElementById('vencimiento').value = '';
  document.getElementById('imagen').value = '';
}

function borrarCupon(boton) {
  if (confirm('¿Seguro que deseas borrar este cupón?')) {
    boton.parentElement.remove();
  }
}

function editarCupon(boton) {
  const cupon = boton.parentElement;
  const titulo = cupon.querySelector('h3').innerText;
  const descripcion = cupon.querySelectorAll('p')[0].innerText;
  const vencimiento = cupon.querySelectorAll('p')[1].innerText.replace('Vence: ', '');
  const imagenSrc = cupon.querySelector('img').src;

  document.getElementById('titulo').value = titulo;
  document.getElementById('descripcion').value = descripcion;
  document.getElementById('vencimiento').value = vencimiento;
  document.getElementById('imagen').value = imagenSrc.includes('img/logo.png') ? '' : imagenSrc;

  cupon.remove();
}
