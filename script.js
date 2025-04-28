// Cargar cupones guardados
document.addEventListener('DOMContentLoaded', mostrarCupones);

// Mostrar formulario
function mostrarFormulario() {
    document.getElementById('formulario-cupon').style.display = 'block';
}

// Ocultar formulario
function ocultarFormulario() {
    document.getElementById('formulario-cupon').style.display = 'none';
}

// Agregar cupón nuevo
function agregarCupon() {
    const titulo = document.getElementById('titulo').value;
    const descripcion = document.getElementById('descripcion').value;
    const imagen = document.getElementById('imagen').value;
    const fecha = document.getElementById('fecha').value;

    if (titulo && descripcion && imagen && fecha) {
        let cupones = JSON.parse(localStorage.getItem('cupones')) || [];
        cupones.push({ titulo, descripcion, imagen, fecha });
        localStorage.setItem('cupones', JSON.stringify(cupones));
        mostrarCupones();
        ocultarFormulario();
        limpiarFormulario();
    } else {
        alert('Por favor completa todos los campos.');
    }
}

// Limpiar formulario
function limpiarFormulario() {
    document.getElementById('titulo').value = '';
    document.getElementById('descripcion').value = '';
    document.getElementById('imagen').value = '';
    document.getElementById('fecha').value = '';
}

// Mostrar los cupones
function mostrarCupones() {
    const lista = document.getElementById('lista-cupones');
    lista.innerHTML = '';
    let cupones = JSON.parse(localStorage.getItem('cupones')) || [];

    cupones.forEach((cupon, index) => {
        const cuponDiv = document.createElement('div');
        cuponDiv.className = 'cupon';
        cuponDiv.innerHTML = `
            <img src="${cupon.imagen}" alt="${cupon.titulo}">
            <h3>${cupon.titulo}</h3>
            <p>${cupon.descripcion}</p>
            <p><strong>Válido hasta:</strong> ${cupon.fecha}</p>
            <button onclick="editarCupon(${index})">Editar</button>
            <button onclick="eliminarCupon(${index})">Eliminar</button>
        `;
        lista.appendChild(cuponDiv);
    });
}

// Eliminar cupón
function eliminarCupon(index) {
    let cupones = JSON.parse(localStorage.getItem('cupones')) || [];
    cupones.splice(index, 1);
    localStorage.setItem('cupones', JSON.stringify(cupones));
    mostrarCupones();
}

// Editar cupón
function editarCupon(index) {
    let cupones = JSON.parse(localStorage.getItem('cupones')) || [];
    const cupon = cupones[index];

    document.getElementById('titulo').value = cupon.titulo;
    document.getElementById('descripcion').value = cupon.descripcion;
    document.getElementById('imagen').value = cupon.imagen;
    document.getElementById('fecha').value = cupon.fecha;

    mostrarFormulario();

    eliminarCupon(index); // Eliminamos el viejo, luego se guarda como nuevo
}
