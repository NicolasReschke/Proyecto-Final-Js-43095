let productos = [];

fetch("./js/productos.json")
    .then(response => response.json())
    .then(data => {
        productos = data;
        cargarProductos(productos);
    })


    const contenedorProductos = document.querySelector("#cardBootstrap");
    const botonesCategorias = document.querySelectorAll(".boton-categoria");
    let botonesAgregar = document.querySelectorAll(".producto-agregar");
    const numerito = document.querySelector("#numerito");
    
    function cargarProductos(productosElegidos) {
    
        contenedorProductos.innerHTML = "";
    
        productosElegidos.forEach(producto => {
    
            const div = document.createElement("div");
            div.classList.add("producto");
            div.innerHTML = `
            <div class="col">
                <div class="card">
                    <img class="card-img-top" src="${producto.img}" alt="${producto.titulo}">
                    <div class="card-body">
                        <h2 class="card-title">$ ${producto.precio}</h2>
                        <p class="card-text">${producto.titulo}</p>
                        <button class="producto-agregar btnCompra" id="${producto.id}">COMPRAR</button>
                    </div>
                </div>
            </div>
            `;
    
            contenedorProductos.append(div);
        })
    
        actualizarBotonesAgregar();
    }
    
    
    botonesCategorias.forEach(boton => {
        boton.addEventListener("click", (e) => {
    
            botonesCategorias.forEach(boton => boton.classList.remove("active"));
            e.currentTarget.classList.add("active");
    
            if (e.currentTarget.id != "todos") {
                const productosBoton = productos.filter(producto => producto.categoria === e.currentTarget.id);
                cargarProductos(productosBoton);
            } else {
                cargarProductos(productos);
            }
    
        })
    });
    
    function actualizarBotonesAgregar() {
        botonesAgregar = document.querySelectorAll(".producto-agregar");
    
        botonesAgregar.forEach(boton => {
            boton.addEventListener("click", agregarAlCarrito);
        });
    }
    
    let productosEnCarrito;
    
    let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");
    
    if (productosEnCarritoLS) {
        productosEnCarrito = JSON.parse(productosEnCarritoLS);
        actualizarNumerito();
    } else {
        productosEnCarrito = [];
    }
    
    function agregarAlCarrito(e) {
    
        Toastify({
            text: "Producto agregado",
            duration: 3000,
            close: true,
            gravity: "top",
            position: "center",
            stopOnFocus: true,
            style: {
                background: "green",
                borderRadius: "2rem",
                textTransform: "uppercase",
                fontSize: ".75rem"
            },
            offset: {
                x: '1.5rem',
                y: '1.5rem'
            },
            onClick: function(){}
        }).showToast();
    
        const idBoton = e.currentTarget.id;
        const productoAgregado = productos.find(producto => producto.id === idBoton);
    
        if(productosEnCarrito.some(producto => producto.id === idBoton)) {
            const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
            productosEnCarrito[index].cantidad++;
        } else {
            productoAgregado.cantidad = 1;
            productosEnCarrito.push(productoAgregado);
        }
    
        actualizarNumerito();
    
        localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    }
    
    function actualizarNumerito() {
        let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
        numerito.innerText = nuevoNumerito;
    }

    
    document.addEventListener("keyup", e=>{

        if (e.target.matches("#buscador")){
    
            if (e.key ==="Escape")e.target.value = ""
    
            document.querySelectorAll(".producto").forEach(producto =>{
    
                producto.textContent.toLowerCase().includes(e.target.value.toLowerCase())
                ?producto.classList.remove("disabled")
                :producto.classList.add("disabled")
            })
    
        }
    
    
    })