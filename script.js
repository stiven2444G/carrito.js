// traer todos los produsctos 
// hacer un siclo de cada producto en un elemento html
// colocarlo e DIV productos
// Utilizar fetch para traer los rpoductos 

async function cargarProductos(){
    //Llmar a localhost:3000/products
    var resultado = await fetch ("http://localhost:3000/products")
    if (!resultado.ok){
        throw new Error("No hay respuesta de productos");
    }
    var datos = await resultado.json()
    return datos  
    //promise, resolver (cumplirias)
    //then() await ayuda resolver 
}

async function pintarProducto(){
    let productos =await cargarProductos()
    let divProductos =document.getElementById("products")
    
    productos.forEach(Producto => {
        divProductos.innerHTML += `
            <div class="product-card" style="border: 1px solid #ccc; padding: 15px; margin: 10px; border-radius: 5px; display: inline-block; width: 200px;">
                <h3>${Producto.nombre}</h3>
                <p><strong>ID:</strong> ${Producto.id}</p>
                <p><strong>Precio:</strong> $${Producto.precio}</p>
                <p><strong>Stock:</strong> ${Producto.stock}</p>
            </div>
        `;
    });
}

pintarProducto();