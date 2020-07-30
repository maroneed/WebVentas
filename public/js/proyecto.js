    var referenciaPrecio = 0;
    var numero = parseFloat(referenciaPrecio);
    var precioFinal = numero.toFixed(2);
    var montoFloat = 0;
    const json = [];
    var data = {};
    var contenido = document.querySelector('#contenido')
    var carrito = 0.00;
    var objetivo = document.getElementById('valor');
    var precio = 0;
    var pedido = [];
    var orden = [];
    var lista = new Array();
    var listaAux = localStorage.getItem("carritoJson");
    var carritoJson = JSON.parse(listaAux);
    checkLocalStorage(lista);   //consulto el localStorage,por si tiene algo guardado al venir de la otra vista
    console.log(carritoJson);
    console.log(lista);




    fetch('https://localhost:44371/api/Producto')
    .then((respuesta) => {
        return respuesta.json();
    }).then((respuesta) => {


        tabla(respuesta);  //cargo los productos en pantalla

        //imprimo por consola
        for (let i = 0, c = respuesta.length; i < c; i++) {
          console.log("Producto: " + respuesta[i].nombre +"/codigo: "

        +respuesta[i].codigo +"/marca: "+ respuesta[i].marca+"/precio: "
        + respuesta[i].precio);

        }




    });

    function tabla(respuesta) {

        carrito = 0;
        console.log("c:"+carrito);
        for(let i of respuesta){


            let miNodo = document.createElement('div');
            miNodo.classList.add('card', 'col-sm-4');
            // Body
            let miNodoCardBody = document.createElement('div');
            miNodoCardBody.classList.add('card-body','col-sm-12');
            // Titulo
            let miNodoTitle = document.createElement('h5');
            miNodoTitle.classList.add('card-title');
            miNodoTitle.textContent = i['nombre'];
            // Imagen
            let miNodoImagen = document.createElement('img');
            miNodoImagen.classList.add('img-fluid');

            var foto = i['productoId'];

            var img = "/img/";
            var jpg = ".jpg";
            var ruta = img.concat(foto,jpg);
            console.log("prueba: "+ruta);
            miNodoImagen.setAttribute('src', ruta);
            miNodoImagen.setAttribute('height', 100);
            miNodoImagen.setAttribute('width', 100);

            // Precio
            let miNodoPrecio = document.createElement('p');
            miNodoPrecio.classList.add('card-text');
            miNodoPrecio.textContent =  '$ ' + i['precio'] ;
            // Boton
            let miNodoBoton = document.createElement('button');
            miNodoBoton.classList.add('btn', 'btn-primary');
            miNodoBoton.textContent = 'COMPRAR';
            miNodoBoton.setAttribute('marcador', i['productoId']);
            miNodoBoton.setAttribute('marcador2', i['precio']);
            miNodoBoton.setAttribute('marcador3', i['nombre']);



            miNodoBoton.addEventListener('click', agregarProducto);

            // Insertamos
            miNodoCardBody.appendChild(miNodoImagen);
            miNodoCardBody.appendChild(miNodoTitle);
            miNodoCardBody.appendChild(miNodoPrecio);
            miNodoCardBody.appendChild(miNodoBoton);
            miNodo.appendChild(miNodoCardBody);
            items.appendChild(miNodo);
            console.log("c2:"+carrito);

        }
    }



    const compra = {"clienteId" :"1",   //dejamos seteado un iD de cliente
    "ListaProductos" : pedido};

    function confirmarCompra()
    {
      if(precioFinal === 0)
      {
        var avisoCarritoVacio = alert("Tu carrito esta vacio!");

      }else{
        fetch('https://localhost:44371/api/Ventas', {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(compra),
        headers: {
            'Content-Type': 'application/json'
          },
        })
        .then(response => {
            return response.json()
        })
        .then(function(compra) {
            console.log(compra)
            var aviso = alert("Venta exitosa!");
            total.innerHTML = "";
            canasta.innerHTML = "";
        })
        .catch(err => alert("No se pudo concretar la venta. Volve a intentarlo!"));
        console.log(compra);
        pedido = [];
        carrito = 0;
        precioFinal = 0;
        document.getElementById("valor").innerHTML = carrito;
        total.innerHTML = "";
        canasta.innerHTML = "";
      }


    }





function agregarProducto(){

  var cantidad = 0;
  carrito = carrito + 1;
  console.log(carrito);
  document.getElementById("valor").innerHTML = carrito;
  c=carrito;
  var element = this.getAttribute('marcador');
  var articulo = String(element)

  var precioTomado = this.getAttribute('marcador2');
  var nombreProducto = this.getAttribute('marcador3');

  var conDecimal = parseFloat(precioTomado, 10);
  var precioProducto = conDecimal.toFixed(2);
  console.log("ahorasi: "+precioProducto)

  console.log(precio);

  console.log("id: "+element);
  console.log("cantidad de productos en carrito: "+carrito);

  console.log("////////");
  pedido.push(articulo);
  console.log(pedido);

  precioFinal = parseFloat(precioProducto) + parseFloat(precioFinal);
  //console.log("valor de la compra: "+precioFinal);
  //agrego al localStorage
  localStorage.setItem('Producto', articulo);
  var dato = localStorage.getItem('Producto');
  console.log("localstorage: " + dato);
  console.log("precioFinal: " + precioProducto);
  console.log("precioProducto: " + precioFinal);
  var detalle = {"codigo" : element,"nombre":nombreProducto,"precio":precioProducto}
  lista = lista.concat(detalle);
  localStorage.setItem('lista',JSON.stringify(lista));
  localStorage.setItem('pedido',JSON.stringify(pedido));
  console.log("ids: " +  pedido);
  localStorage.setItem('carrito',JSON.stringify(pedido));

  //agrego a la tabla de Compra
  //montoFloat = parseFloat(precioFinal);
  console.log("float: " + precioFinal);
  console.log("pedido: " + pedido);
  console.log(lista)


}

function checkLocalStorage(referencia)
{
  if(carritoJson != null)
  {
    referencia = carritoJson;

  }
}
