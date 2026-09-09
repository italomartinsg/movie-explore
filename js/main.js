import showListMessage from "./ui.js";
const form = document.querySelector("form");
const inputForm = document.querySelector("#buscar-filme");

function handleSearch(event) {
  event.preventDefault();
  const enteredValue = inputForm.value.trim();
  if (!enteredValue) {
    return showListMessage("Digite o título de um filme");
  }
  showListMessage("");
  console.log(enteredValue);
}

form.addEventListener("submit", handleSearch);
