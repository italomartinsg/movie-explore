import showListMessage, {
  renderMovies,
  showListTitle,
  openMovieModal,
  closeMovieModal,
  showDetailsMessage,
  renderMovieDetails,
  clearMovieDetails,
} from "./ui.js";
import getPopularMovies, { searchMovies, getMovieDetails } from "./api.js";
import state from "./state.js";

const form = document.querySelector("form");
const inputForm = document.querySelector("#buscar-filme");
const movieList = document.querySelector(".movie-list");
const movieModal = document.querySelector("#movie-modal");
const btnCloseMovieModal = document.querySelector("#close-modal");
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

async function handleMovieClick(event) {
  const button = event.target.closest(".movie-details-button");

  if (button) {
    const movieId = +button.dataset.id;
    state.selectedMovieId = movieId;
    clearMovieDetails();
    openMovieModal();
    showDetailsMessage("Carregando detalhes...");

    try {
      const details = await getMovieDetails(movieId);
      if (movieId !== state.selectedMovieId) {
        return;
      }
      showDetailsMessage("");

      renderMovieDetails(details);
    } catch (error) {
      if (movieId !== state.selectedMovieId) {
        return;
      }
      showDetailsMessage("Não foi possivel carregar os detalhes");
      console.error(error);
    }
  } else {
    return;
  }
}
function handleModalClose() {
  state.selectedMovieId = null;
}

loadPopularMovies();
form.addEventListener("submit", handleSearch);
movieList.addEventListener("click", handleMovieClick);
btnCloseMovieModal.addEventListener("click", closeMovieModal);
movieModal.addEventListener("close", handleModalClose);
