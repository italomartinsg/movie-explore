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
let latestListRequestId = 0;
let latestDetailsRequestId = 0;
async function handleSearch(event) {
  event.preventDefault();
  const enteredValue = inputForm.value.trim();
  if (!enteredValue) {
    return showListMessage("Digite o título de um filme");
  }
  latestListRequestId++;
  const requestId = latestListRequestId;
  showListTitle(`Resultados para: ${enteredValue}`);
  state.movies = [];
  renderMovies(state.movies);
  showListMessage("Buscando filmes...");
  try {
    const movies = await searchMovies(enteredValue);
    if (requestId !== latestListRequestId) {
      return;
    }
    state.movies = movies;
    if (state.movies.length === 0) {
      showListMessage("Nenhum Filme encontrado.");
      return;
    }
    showListMessage("");
    renderMovies(state.movies);
  } catch (error) {
    if (requestId !== latestListRequestId) {
      return;
    }
    return showListMessage("Não foi possivel pesquisar os filmes.");
  }
}

async function loadPopularMovies() {
  latestListRequestId++;
  const requestId = latestListRequestId;
  showListTitle("Filmes Populares");
  showListMessage("Carregando filmes...");
  try {
    const movies = await getPopularMovies();
    if (requestId !== latestListRequestId) {
      return;
    }
    state.movies = movies;
    if (state.movies.length === 0) {
      showListMessage("Nenhum Filme encontrado.");
      return;
    }
    showListMessage("");
    renderMovies(state.movies);
  } catch (error) {
    if (requestId !== latestListRequestId) {
      return;
    }
    return showListMessage("Não foi possível carregar os filmes.");
  }
}

async function handleMovieClick(event) {
  const button = event.target.closest(".movie-details-button");

  if (button) {
    latestDetailsRequestId++;
    const requestId = latestDetailsRequestId;
    const movieId = +button.dataset.id;
    state.selectedMovieId = movieId;
    clearMovieDetails();
    openMovieModal();
    showDetailsMessage("Carregando detalhes...");

    try {
      const details = await getMovieDetails(movieId);
      if (requestId !== latestDetailsRequestId) {
        return;
      }

      showDetailsMessage("");

      renderMovieDetails(details);
    } catch (error) {
      if (requestId !== latestDetailsRequestId) {
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
  latestDetailsRequestId++;
  state.selectedMovieId = null;
}

loadPopularMovies();
form.addEventListener("submit", handleSearch);
movieList.addEventListener("click", handleMovieClick);
btnCloseMovieModal.addEventListener("click", closeMovieModal);
movieModal.addEventListener("close", handleModalClose);
