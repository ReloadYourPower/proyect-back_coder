// Simulación de datos de usuarios en línea
const onlineUsers = [];
// const socket = io();

// Función para mostrar la lista de usuarios en línea
function renderOnlineUsers() {
    const onlineUsersList = document.getElementById('onlineUsers');
    onlineUsersList.innerHTML = '';
    onlineUsers.forEach(user => {
        const li = document.createElement('li');
        li.textContent = user;
        onlineUsersList.appendChild(li);
    });
}

// Función para agregar un nuevo mensaje al chat
function addMessage(message) {
    const messageLogs = document.getElementById('messageLogs');
    const p = document.createElement('p');
    p.textContent = message;
    messageLogs.appendChild(p);
    // Desplazar automáticamente hacia abajo para mostrar el último mensaje
    messageLogs.scrollTop = messageLogs.scrollHeight;
}

// Simulación de mensajes recibidos
const receivedMessages = [
 
];

// Función para renderizar mensajes recibidos
function renderReceivedMessages() {
    receivedMessages.forEach(message => {
        addMessage(message);
    });
}

// Mostrar la lista de usuarios en línea al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    renderOnlineUsers();
    renderReceivedMessages();
});

// Código para enviar un nuevo mensaje
const enviarBtn = document.getElementById('enviar');
enviarBtn.addEventListener('click', () => {
    const chatBox = document.getElementById('chatBox');
    const message = chatBox.value;
    if (message.trim() !== '') {
        const newMessage = `Usuario1: ${message}`; // Simulación de enviar un mensaje con el nombre de usuario
        addMessage(newMessage);
        chatBox.value = ''; // Limpiar el cuadro de entrada después de enviar el mensaje
    }
});