const socket = io();
const buttonAdd = document.getElementById('addCarts');




buttonAdd.addEventListener('click', () => {
    const product = document.getElementById('product');

    // Obtener los datos del producto del elemento <div>
   
// Obtener el nombre del producto del elemento <h2>
const productNameElement = product.querySelector('h2');

// Verificar si se encontró el elemento <h2> con el nombre del producto
if (productNameElement) {
    // Extraer el texto del elemento <h2> para obtener el nombre del producto
    const productName = productNameElement.textContent.trim();

    // Obtener el precio del producto del elemento <p> con el texto "Precio: $XX.XX"
    const priceElement = productDiv.querySelector('p');

    if (priceElement) {
        const priceText = priceElement.textContent.trim();
        // Extraer el precio numérico del texto que contiene el precio
        const productPrice = parseFloat(priceText.replace('Precio: $', '').trim());

        // Obtener la descripción del producto del siguiente elemento <p>
        const descriptionElement = priceElement.nextElementSibling;

        if (descriptionElement) {
            const productDescription = descriptionElement.textContent.trim().replace('Descripción: ', '');

            // Crear un objeto `product` con los datos extraídos
            const product = {
                name: productName,
                price: productPrice,
                description: productDescription
            };

            // Mostrar los datos del producto en la consola
            console.log(product);
        } else {
            console.error("No se encontró el elemento de descripción del producto.");
        }
    } else {
        console.error("No se encontró el elemento de precio del producto.");
    }
} else {
    console.error("No se encontró el elemento de nombre del producto.");
}
    // Amaclenar los datos del producto en la variable `cartContent`
    const cartContent  = {
        name: productName,
        price: priceString,
        description: productDescription
    };

    // Emitir el mensaje al servidor a través del socket en el formato deseado
    socket.emit('cartData', {content:cartContent});

    // Mostrar el mensaje en la consola del navegador
    console.log('Mensaje enviado:', cartContent);
    
});