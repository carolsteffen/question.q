import Modal from "./modal.js";

const modal = Modal();

const modalTitle = document.querySelector(".modal h2");
const modalDescription = document.querySelector(".modal p");
const modalButton = document.querySelector(".modal button");
//pegar todos os botões com a classe check
const checkButtons = document.querySelectorAll(".actions a.check");

checkButtons.forEach((button) => {
  button.addEventListener("click", handleClick);
});

//Pegar quando o "marcar como lido for clicado"
//Quando delete for clicado, abrir a modal

const deleteButton = document.querySelectorAll(".actions .delete");

deleteButton.forEach((button) => {
  button.addEventListener("click", (event) => handleClick(event, false));
});

function handleClick(event, check = true) {
  event.preventDefault();
  const text = check ? "Marcar como lida" : "Excluir";
  const slug = check ? "check" : "delete";

  const roomId = document.querySelector("#room-id").dataset.id;
  const questionId = event.target.dataset.id;

  //event traz o elemento que acontece o evento, target pega o elemento

  const form = document.querySelector(".modal form");
  form.setAttribute("action", `/question/${roomId}/${questionId}/${slug}`);

  modalTitle.innerHTML = `${text} esta pergunta`;
  modalDescription.innerHTML = `Tem certeza que deseja ${text.toLowerCase()} esta pergunta?`;
  modalButton.innerHTML = `Sim, ${text.toLowerCase()}`;
  if (check) {
    modalButton.classList.remove("red");
    modalButton.classList.add("yellow");
  } else {
    modalButton.classList.remove("yellow");
    modalButton.classList.add("red");
  }

  //abrir modal
  modal.open();
}
