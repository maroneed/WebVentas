var orden = localStorage.getItem("lista");
var carritoJson = JSON.parse(orden);
console.log(carritoJson);

var precioFinal = 0;
var idsProductos = localStorage.getItem("pedido");
var arrayIds = JSON.parse(idsProductos);
var chango = localStorage.getItem("carrito");
var carrito = JSON.parse(chango);
const compra = {"clienteId" :"1",   //dejamos seteado un iD de cliente
"ListaProductos" : arrayIds};

document.getElementById("valor").innerHTML = carrito.length;  //actualizo el carrito
volcarProductosAlCarrito();
console.log("arrays de ids: " + arrayIds);
console.log("arrays de ids: " + arrayIds);
console.log(orden);
console.log(arrayIds);



function volcarProductosAlCarrito()
{
  for (var i in carritoJson)
  {
    const element = carritoJson[i];

    canasta.innerHTML += `

              <tr>
                  <th id="Id">${ element.codigo}</th>
                  <th id="nombre">${element.nombre }</td>
                  <th id="plata">${element.precio}</td>



                  <th id=""><button type="button" id="boton2" class="btn btn-danger" onclick="eliminarProducto(${element.codigo},${element.precio })"<img
                  src="/img/carrito.png" position="relative" right= 300px/>X</button></td>
              </tr>

              `
              var precio = parseFloat(element.precio,10);
              precioFinal = parseFloat(precioFinal,10) + precio;
  }
  console.log('precioFinal: ' + precioFinal)
  document.getElementById("total").innerHTML = "$ " + precioFinal;  //actualizo el carrito
  localStorage.setItem('carritoJson',JSON.stringify(carritoJson));
  localStorage.setItem('arrayIds',JSON.stringify(arrayIds));


}


function eliminarProducto(element,precioProducto)
{
  var x = document.getElementById("boton2").getAttribute("marcador");
  var articulo = String(element); //convierto el id en string
  var index = arrayIds.indexOf(articulo); //busco el indice que coincide con lo que busco


  if (index > -1) {
     arrayIds.splice(index, 1);  //lo elimino si el indice existe. el 1 es la cantidad de ele que eliminara desde el indice que le marque

     console.log("hola");
  }
  console.log("arrays de ids: " + arrayIds);

  console.log("a eliminar(id): "+articulo);
  console.log("pedido modificado: "+pedido);
  var numero = parseFloat(precioProducto);
  var numeroLimitado = numero.toFixed(2);
  carrito = carrito.length -1;
  if (carrito.length <0)
  {
    carrito = 0;
  }
  document.getElementById("valor").innerHTML = carrito.length;  //actualizo el carrito
  precioFinal = parseFloat(precioFinal) - parseFloat(precioProducto);
  var precioFinalDecimal = precioFinal.toFixed(2);

  if(precioFinalDecimal <= 0)
  {
    total.innerHTML = " ";
  }else{
    total.innerHTML = "$ " + precioFinalDecimal;
    console.log("valor producto eliminado: "+precioProducto);
  }



  $(document).on('click','#boton2',function(event){
    event.preventDefault();
    $(this).closest('tr').remove();

  })

  console.log(articulo)
  var respaldoStorage = localStorage.getItem('lista');
  var respaldoJson = JSON.parse(respaldoStorage);

  var respaldoStorageIds = localStorage.getItem('pedido');
  var respaldoIdsJson = JSON.parse(respaldoStorageIds);

  var index2 = respaldoJson.indexOf(articulo); //busco el indice que coincide con lo que busco
  var i = respaldoIdsJson.indexOf( articulo );  //borro el producto del array de ids que pasare como pedido al concretar la compra
    if ( i !== -1 ) {
        respaldoIdsJson.splice( articulo, 1 );
        console.log(articulo)

    }
    console.log(arrayIds)

    localStorage.removeItem("pedido");
    localStorage.removeItem("arrayIds");
    localStorage.setItem('pedido',JSON.stringify(arrayIds));
    localStorage.setItem('arrayIds',JSON.stringify(arrayIds));
  for (var i in respaldoJson)
  {
    const element = respaldoJson[i];
    if( element.codigo == articulo)
    {

         let indice = respaldoJson.findIndex(i => i.codigo === element.codigo);
         console.log('indice a borrar: ' + indice);
         console.log(element.codigo)


         respaldoJson.splice(indice, 1);
         console.log(respaldoJson);
         localStorage.removeItem("lista");
         localStorage.removeItem("carritoJson");

         localStorage.setItem('lista',JSON.stringify(respaldoJson));
         localStorage.setItem('carritoJson',JSON.stringify(respaldoJson));
         //console.log(respaldoJson);
         //console.log(carritoJson);



    }

  }


}

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
        //compraOk();
        localStorage.clear();
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

function cancelarCompra()
{
    pedido = [];
    carrito = 0;
    precioFinal = "";
    document.getElementById("valor").innerHTML = carrito; //actualizo el carrito
    console.log(pedido);
    canasta.innerHTML = "";
    PromptDemo();
    total.innerHTML = "";
    localStorage.clear();


}

function PromptDemo() {
  //Ingresamos un mensaje a mostrar
  var aviso = alert("Venta cancelada!");

}
function compraOk()
{
  $('#myModal').modal('show');

}
