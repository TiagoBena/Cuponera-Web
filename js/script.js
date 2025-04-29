document.addEventListener("DOMContentLoaded", function() {
    let cupones = [
        { id: 1, nombre: "Cupón 1", descripcion: "Descuento del 10%", imagen: "img/cupon1.jpg" },
        { id: 2, nombre: "Cupón 2", descripcion: "Descuento del 20%", imagen: "img/cupon2.jpg" },
    ];
    let cuponesContainer = document.getElementById('cupones');
    cupones.forEach(cupon => {
        let cuponDiv = document.createElement('div');
        cuponDiv.classList.add('cupon');
        cuponDiv.innerHTML = `
            <img src="${cupon.imagen}" alt="${cupon.nombre}">
            <h3>${cupon.nombre}</h3>
            <p>${cupon.descripcion}</p>
        `;
        cuponesContainer.appendChild(cuponDiv);
    });
});