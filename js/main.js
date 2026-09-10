import showListMessage, { renderMovies, showListTitle } from "./ui.js";
import getPopularMovies, { searchMovies } from "./api.js";
import state from "./state.js";

const form = document.querySelector("form");
const inputForm = document.querySelector("#buscar-filme");

async function handleSearch(event) {
  event.preventDefault();
  const enteredValue = inputForm.value.trim();
  if (!enteredValue) {
    return showListMessage("Digite o título de um filme");
  }

  showListTitle(`Resultados para: ${enteredValue}`);
  state.movies = [];
  renderMovies(state.movies);
  showListMessage("Buscando filmes...");
  try {
    const movies = await searchMovies(enteredValue);
    state.movies = movies;
    if (state.movies.length === 0) {
      showListMessage("Nenhum Filme encontrado.");
      return;
    }
    showListMessage("");
    renderMovies(state.movies);
  } catch (error) {
    return showListMessage("Não foi possivel pesquisar os filmes.");
  }
}

async function loadPopularMovies() {
  showListTitle("Filmes Populares");
  showListMessage("Carregando filmes...");
  try {
    const movies = await getPopularMovies();

    state.movies = movies;
    if (state.movies.length === 0) {
      showListMessage("Nenhum Filme encontrado.");
      return;
    }
    showListMessage("");
    renderMovies(state.movies);
  } catch (error) {
    return showListMessage("Não foi possível carregar os filmes.");
  }
}

loadPopularMovies();
form.addEventListener("submit", handleSearch);
