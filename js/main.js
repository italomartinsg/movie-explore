import showListMessage from "./ui.js";
import getPopularMovies from "./api.js";
import state from "./state.js";

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

async function loadPopularMovies() {
  showListMessage("Carregando filmes...");
  try {
    const movies = await getPopularMovies();
    state.movies = movies;
    if (state.movies.length === 0) {
      showListMessage("Nenhum Filme encontrado.");
      return;
    }
    showListMessage("");
    console.log(state.movies);
  } catch (error) {
    return showListMessage("Não foi possível carregar os filmes.");
  }
}

loadPopularMovies();
form.addEventListener("submit", handleSearch);
