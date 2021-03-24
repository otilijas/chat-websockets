const connection = new WebSocket("ws://localhost:5500");
const button = document.querySelector("#send");

let history = [];

connection.onopen = () => {
    console.log("WebSocket is open now.");
};

connection.onclose = () => {
    console.log("WebSocket is closed now.");
};

connection.onerror = (event) => {
    console.error("WebSocket error observed:", event);
};

connection.onmessage = (event) => {
  let addLine = document.createElement('p');
  addLine.innerText = event.data;
  document.querySelector('#chat').append(addLine);
  history.push(event.data);
  history = history.slice(-100);
};

button.addEventListener("click", () => {
  const name = document.querySelector("#name");
  const message = document.querySelector("#message");
  const minutes = new Date().getMinutes();
  const hour = new Date().getHours();
  const data = `${hour}:${minutes}   ${name.value}: ${message.value}`;
  connection.send(data);
  name.value = "";
  message.value = "";
});
