const socket = io();

//Message Form server
const chatForm = document.getElementById("chat-form");
socket.on("message", (message) => {
  console.log(message);
  outputMessage(message);
});

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const msg = e.target.elements.msg.value;

  //Emit message to the server
  socket.emit("chatMessage", msg);
});

function outputMessage(message) {
  const div = document.createElement("div");
  div.classList.add("message");
  div.innerHTML = `<p class="meta">Mary <span>9:15pm</span></p>
  <p class="text">
    ${message}
  </p>`;

  document.querySelector(".chat-messages").appendChild(div);
}
