const socket = io('http://localhost:3000');
const msgContainer = document.getElementById('message-container');
const msgForm = document.getElementById('send-container');
const msgInput = document.getElementById('message-input');

const name = prompt(' What is your name?');
appendMessage('You Joined');
socket.emit('new-user', name);

socket.on('chat-message', data => {
    appendMessage(`${data.name}: ${data.message}`);
});
socket.on('user-connected', name => {
    appendMessage(`${name} connected`);
});
socket.on('user-disconnected', name => {
    appendMessage(`${name} disconnected`);
});
msgForm.addEventListener('submit', e => {
    e.preventDefault();

    const message = msgInput.value;
    appendMessage(`You: ${message}`);
    socket.emit('send-chat-message', message);
    msgInput.value = '';
});

function appendMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    msgContainer.append(messageElement);
}