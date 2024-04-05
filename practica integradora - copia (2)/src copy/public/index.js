// JS del lado del cliente (browser)

// const socket = io()
// const button = document.getElementById('enviar')
// const message = button.addEventListener('click',()=>{
//     const messages = 'nuevo mensaje'
    
//     socket.emit('message',messages);
//     console.log(messages);
// });


// Swal.fire({
//     title: "Hola mundo",
//     text: "Descripcion test",
//     icon: "success"
// })
// socket.emit('message',message)
// console.log(message);

// JS del lado del cliente (browser)

const socket = io();
const button = document.getElementById('enviar');
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
    socket.emit('username', username);
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
    console.log(messages,messages.username);
    

  
})