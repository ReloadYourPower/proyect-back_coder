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
    input:'text',
    inputValidator:(value) =>{
        return !value && 'necesitas escribir un nombre de usuario para continuar'
    },
    allowOutsideClick: false
}).then(result =>{
    user = result.value
});

button.addEventListener('click', () => {
    const messageInput = document.getElementById('chatBox');
    const message = messageInput.value;

    // Emitir el mensaje al servidor a través del socket
    socket.emit('message', {user:user,message:message});

    // Mostrar el mensaje en la consola del navegador
    console.log('Mensaje enviado:', message);

    // Mostrar una alerta con SweetAlert
    Swal.fire({
        title: "Mensaje Enviado",
        text: `Has enviado el mensaje: "${message}"`,
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
socket.on('messageLogs', data =>{
    let log = document.getElementById('messageLogs')
    let messages = "";
    data.forEach(message => { 
        messages = messages + `${message.user} dice: ${message.message} </br>`
        
    });
    log.innerHTML = messages;
})