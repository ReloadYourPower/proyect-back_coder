// document.addEventListener('DOMContentLoaded', () => {
//     const socket = io('http://localhost:8080/realTimeRoute');

//     // Agregar evento para enviar datos al agregar un producto
//     const addProductForm = document.getElementById('addProductForm');
//     addProductForm.addEventListener('submit', (event) => {
//         event.preventDefault();
//         const formData = new FormData(addProductForm);
//         const title = formData.get('title');
//         const description = formData.get('description');
//         const price = parseFloat(formData.get('price'));
//         const stock = parseInt(formData.get('stock'));
//         const status = formData.get('status') === 'on';
//         const thumbnail = formData.get('thumbnail');
//         const category = formData.get('category');

//         // Emitir los datos al servidor
//         socket.emit('addProduct', { title, description, price, stock, status, thumbnail, category });
//     });

//     // Agregar evento para enviar datos al actualizar un producto
//     const updateProductForm = document.getElementById('updateProductForm');
//     updateProductForm.addEventListener('submit', (event) => {
//         event.preventDefault();
//         const formData = new FormData(updateProductForm);
//         const productId = formData.get('productId');
//         const newData = {
//             title: formData.get('title'),
//             description: formData.get('description'),
//             price: parseFloat(formData.get('price')),
//             stock: parseInt(formData.get('stock')),
//             status: formData.get('status') === 'on',
//             thumbnail: formData.get('thumbnail'),
//             category: formData.get('category')
//         };

//         // Emitir los datos al servidor
//         socket.emit('updateProduct', { productId, newData });
//     });

//     // Agregar evento para enviar datos al ver un producto
//     const viewProductForm = document.getElementById('viewProductForm');
//     viewProductForm.addEventListener('submit', (event) => {
//         event.preventDefault();
//         const formData = new FormData(viewProductForm);
//         const productId = formData.get('productId');
//         socket.emit('viewProduct', productId);
//     });

//     // Agregar evento para enviar datos al eliminar un producto
//     const deleteProductForm = document.getElementById('deleteProductForm');
//     deleteProductForm.addEventListener('submit', (event) => {
//         event.preventDefault();
//         const formData = new FormData(deleteProductForm);
//         const productId = formData.get('productId');
//         socket.emit('deleteProduct', productId);
//     });

//     // Manejar eventos recibidos del servidor
//     socket.on('message', (data) => {
//         console.log('Mensaje del servidor:', data);
//     });

//     // Escuchar eventos del servidor
//     socket.on('productAdded', (message) => {
//         console.log(message);
//     });

//     socket.on('productAddError', (errorMessage) => {
//         console.error(errorMessage);
//     });

//     socket.on('productUpdated', (message) => {
//         console.log(message);
//     });

//     socket.on('productUpdateError', (errorMessage) => {
//         console.error(errorMessage);
//     });

//     socket.on('productViewed', (product) => {
//         console.log('Producto:', product);
//     });

//     socket.on('productViewError', (errorMessage) => {
//         console.error(errorMessage);
//     });

//     socket.on('productDeleted', (message) => {
//         console.log(message);
//     });

//     socket.on('productDeleteError', (errorMessage) => {
//         console.error(errorMessage);
//     });
// });


// Conectar al servidor de WebSocket
const socket = io();

// ADD 
document.addEventListener('DOMContentLoaded', () => {
    // Obtener referencia al formulario y al botón de agregar producto
    const addProductForm = document.getElementById('addProductForm');
    const addProductBtn = document.getElementById('addProductBtn');

    // Agregar evento de envío al formulario
    addProductForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Evitar que el formulario se envíe

        // Obtener los valores de los campos del formulario
        const title = addProductForm.elements['title'].value;
        const description = addProductForm.elements['description'].value;
        const price = addProductForm.elements['price'].value;
        const stock = addProductForm.elements['stock'].value;
        const status = addProductForm.elements['status'].checked;
        const thumbnail = addProductForm.elements['thumbnail'].value;
        const code = addProductForm.elements['code'].value;
        const category = addProductForm.elements['category'].value;

        // Mostrar los datos 
        const pJson = {
            title: title,
            description: description,
            price: price,
            stock: stock,
            status: status,
            thumbnail: thumbnail,
            code:code,
            category: category
        }
        socket.emit('addProduct', pJson);
    });
});
// UPDATE 
document.addEventListener('DOMContentLoaded', () => {
    const updateProductForm = document.getElementById('updateProductForm');

    updateProductForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Evita que el formulario se envíe automáticamente

        // Captura los valores de los campos del formulario
        const productId = updateProductForm.elements['updateProductId'].value;
        const productCode = updateProductForm.elements['updateProductCode'].value;
        const title = updateProductForm.elements['title'].value;
        const description = updateProductForm.elements['description'].value;
        const price = updateProductForm.elements['price'].value;
        const stock = updateProductForm.elements['stock'].value;
        const status = updateProductForm.elements['status'].checked;
        const thumbnail = updateProductForm.elements['thumbnail'].value;
        const code = updateProductForm.elements['code'].value;
        const category = updateProductForm.elements['category'].value;

        // Mostrar los datos 
        const pJson = {
            title: title,
            description: description,
            price: price,
            stock: stock,
            status: status,
            thumbnail: thumbnail,
            code:code,
            category: category
        }

        socket.emit('update', productId ,productCode, pJson);
        console.log(productId,productCode,pJson);

        // Puedes enviar los datos a través de WebSockets aquí si lo deseas
    });
});

// VIEW
document.addEventListener('DOMContentLoaded', () => {
    const viewProductForm = document.getElementById('viewProductForm');

    viewProductForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Evita que el formulario se envíe automáticamente

        // Captura el valor del campo productId
        const productId = document.getElementById('viewProductId').value;
        const productCode = document.getElementById('viewProductCode').value;

        // Muestra el productId por consola
        socket.emit('view', productId,productCode);
        console.log(productId,productCode);

        // Puedes enviar el productId a través de WebSockets aquí si lo deseas
    });
});

// DELETE 
document.addEventListener('DOMContentLoaded', () => {
    const deleteProductForm = document.getElementById('deleteProductForm');

    deleteProductForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Evita que el formulario se envíe automáticamente

        // Captura el valor del campo productId
        const productId = document.getElementById('deleteProductId').value;
        const productCode= document.getElementById('deleteProductCode').value;

        // Muestra el productId por consola
        socket.emit('delete', productId,productCode);
        console.log(productId,productCode);

        // Puedes enviar el productId a través de WebSockets aquí si lo deseas
    });
});

