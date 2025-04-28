
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
  const titulo = document.getElementById('titulo').value;
  const descripcion = document.getElementById('descripcion').value;
  const vencimiento = document.getElementById('vencimiento').value;
  const imagen = document.getElementById('imagen').value;

  if (!titulo || !descripcion || !vencimiento) {
    alert('Por favor completa todos los campos obligatorios');
    return;
  }

  const cuponDiv = document.createElement('div');
  cuponDiv.className = 'cupon';
  cuponDiv.innerHTML = \`
    <h3>\${titulo}</h3>
    <p>\${descripcion}</p>
    <p><strong>Válido hasta:</strong> \${vencimiento}</p>
    \${imagen ? '<img src="' + imagen + '" alt="Imagen Cupón" style="max-width:100%; border-radius:8px; margin-top:10px;">' : ''}
  \`;

  document.getElementById('lista-cupones').appendChild(cuponDiv);

  document.getElementById('titulo').value = '';
  document.getElementById('descripcion').value = '';
  document.getElementById('vencimiento').value = '';
  document.getElementById('imagen').value = '';
}
