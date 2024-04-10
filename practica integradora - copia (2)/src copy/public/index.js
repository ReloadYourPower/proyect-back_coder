

// JS del lado del cliente (browser)
// Función para formatear un timestamp en un formato legible
// formatTimestamp
function formatTimestamp(timestamp) {
    const date = new Date(timestamp); // Crear un objeto Date con el timestamp

    // Obtener los componentes de la fecha y hora
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Ajustar el mes a dos dígitos
    const day = date.getDate().toString().padStart(2, '0'); // Ajustar el día a dos dígitos
    const hours = date.getHours().toString().padStart(2, '0'); // Ajustar las horas a dos dígitos
    const minutes = date.getMinutes().toString().padStart(2, '0'); // Ajustar los minutos a dos dígitos
    const seconds = date.getSeconds().toString().padStart(2, '0'); // Ajustar los segundos a dos dígitos

    // Crear una cadena de texto con el formato deseado (por ejemplo, 'YYYY-MM-DD HH:MM:SS')
    const formattedTimestamp = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    return formattedTimestamp; // Devolver la cadena formateada
}


const socket = io();
const button = document.getElementById('enviar');
const functionTime= 
Swal.fire({
    title: "identificate",
    text: `Coloca tu usuario para identificarte en el chat`,
    input: 'text',
    inputValidator: (value) => {
        return !value && 'necesitas escribir un nombre de usuario para continuar'
    },
    allowOutsideClick: false
}).then(result => {
    const username = result.value;
    // Emitir el nombre de usuario al servidor a través del socket
    socket.emit('username',username);
    console.log(username);
});


button.addEventListener('click', () => {
    const messageInput = document.getElementById('chatBox');
    const messageContent = messageInput.value;
    const timestamp = new Date();

    // Emitir el mensaje al servidor a través del socket en el formato deseado
    socket.emit('message', {content: messageContent, timestamp: timestamp });

    // Mostrar el mensaje en la consola del navegador
    console.log('Mensaje enviado:', messageContent);
    


    // Mostrar una alerta con SweetAlert
    Swal.fire({
        title: "Mensaje Enviado",
        text: `Has enviado el mensaje: "${messageContent}"`,
        icon: "success"
    });

    // Limpiar el campo de entrada después de enviar el mensaje
    messageInput.value = '';
});

// Escuchar mensajes del servidor
// Escuchar mensajes del servidor
socket.on('message', (message) => {
    console.log('Mensaje recibido desde el servidor:', message);

    // Mostrar una alerta con SweetAlert cuando se recibe un mensaje del servidor
    Swal.fire({
        title: "Nuevo Mensaje del Servidor",
        text: "Se mostrara por consola",
        icon: "info"
    });
});
socket.on('messageLogs',  (messages) => {
 // Verificar si message es un objeto válido
 if (typeof messages === 'object' && messages !== null) {
    // Extraer las propiedades que deseas mostrar en la alerta
    const stringProperty = messages.username; // Nombre de la propiedad que contiene un string
    const arrayProperty = messages.messages; // Nombre de la propiedad que contiene un array

     // Construir el texto para la alerta
     let alertText = `String Property: ${stringProperty}\n`;
     
        // Construir el texto para la alerta y para la pantalla
        let displayText = `<p>Usuario: ${stringProperty}</p>`;


     // Verificar si la propiedad del array está presente y es un array
     if (Array.isArray(arrayProperty) && arrayProperty.length > 0) {
         alertText += "Array Property:\n";
         displayText += "<ul>";

         // Iterar sobre cada objeto dentro del array y mostrar su contenido
         arrayProperty.forEach((message, index) => {
            const content = message.content;
                const timestamp = formatTimestamp(message.timestamp);

             // Construir el texto para cada elemento del array
             const itemText = `   Element ${index + 1} - Content: ${content}, Timestamp: ${formatTimestamp(timestamp)}\n`;
             alertText += itemText;
             displayText += `<li>${content}, Timestamp: ${timestamp}</li>`;
         });
         displayText += "</ul>";

          // Agregar el contenido al elemento HTML con id "messageLogs"
 const messageDisplay = document.getElementById("messageLogs");
 if (messageDisplay) {
     messageDisplay.innerHTML = displayText;
 } else {
     console.error("Elemento HTML 'messageDisplay' no encontrado.");
 }
         
     } else {
         alertText += "Array Property: []"; // Mostrar que el array está vacío si no hay elementos
         displayText += "<p>Sin mensajes</p>";
        }
        

    // Mostrar el mensaje en una alerta
    Swal.fire({
        title: "Respuesta",
        text: `Has recibido los siguientes datos:\n\n${alertText}`,
        icon: "success"
    });
} else {
    console.error("El valor de message no es un objeto válido.");
}

})
