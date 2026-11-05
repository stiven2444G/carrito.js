// traer todos los produsctos 
// hacer un siclo de cada producto en un elemento html
// colocarlo e DIV productos
// Utilizar fetch para traer los rpoductos 

async function cargarProductos(){
    //Llmar a localhost:3000/products
    var resultado = await fetch ("http://localhost:3000/products") // cambiar url oor indentificador hcer un cliclo de la id del producto
    if (!resultado.ok){
        throw new Error("No hay respuesta de productos");
    }
    var datos = await resultado.json()
    return datos;  
    //promise, resolver (cumplirias)
    //then() await ayuda resolver 
}

async function productosPorId(id){
    let api = "http://localhost:3000/products/"+id
    let resultado = await fetch (api) 
    if (!resultado.ok){
        throw new Error("No hay respuesta de productos");
    }
    var datos = await resultado.json()
    return datos
}

async function pintarProductos(){
    let productos = await cargarProductos()
    let divProductos = document.getElementById("products")
    
    productos.forEach(Producto => {
        divProductos.innerHTML += `
            <li>
            ${Producto.nombre}
            <a href="detalle.html?id=${Producto.id}">Detalle</a>
            <button data-id=${Producto.id} class="btnEditar">Editar</button>
            </li>`
    });

let btnsEditar = document.querySelectorAll(".btnEditar")
    btnsEditar.forEach(btnEditar => {
        btnEditar.addEventListener("click",function(){
            consultaryLlenar(this.dataset.id)
        })
    })
}


async function consultaryLlenar(id) {
    let productoEditar = await productosPorId(id)

        document.getElementById("btnCrear").style.display = "none"
        let button = `<button data-id=${id} id="btnActualizar">Actualizar</button>`

    let btnActualizar = document.getElementById("btnActualizar")
    if(btnActualizar){
        btnActualizar.remove()
    }
    document.getElementById("formulario").innerHTML += button

    document.getElementById("Nombre").value = productoEditar.nombre
    document.getElementById("Stock").value = productoEditar.stock
    document.getElementById("Precio").value = productoEditar.precio

    btnActualizar = document.getElementById("btnActualizar")
    if(btnActualizar){
        btnActualizar.addEventListener("click",function(){
            alert("Hola "+id)
            actualizarProducto(id)
        })
    }
}

async function actualizarProducto(id){
    let nombre = document.getElementById("Nombre").value
    let stock = document.getElementById("Stock").value
    let precio = document.getElementById("Precio").value

    let url = "http://localhost:3000/products/"+id
    let data = {"nombre": nombre, "stock": stock, "precio": precio}

    fetch(url, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then((res) => res.json())
    .catch((error) => console.error("Error:", error))
    .then((response) => pintarProductos());

}


// Crear producto
let btnCrear = document.getElementById("btnCrear");

btnCrear.addEventListener("click",function(){

    let nombre = document.getElementById("Nombre").value
    let stock = document.getElementById("Stock").value
    let precio = document.getElementById("Precio").value

    let url = "http://localhost:3000/products"
    let data = {"nombre": nombre, "stock": stock, "precio": precio}

    fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then((res) => res.json())
    .catch((error) => console.error("Error:", error))
    .then((response) => console.log("Success:", response));

})
pintarProductos()