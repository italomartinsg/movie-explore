const movieModal = document.querySelector("#movie-modal");
const movieDetails = document.querySelector(".movie-details");

export default function showListMessage(texto) {
  const pMessage = document.querySelector(".list-message");
  pMessage.textContent = texto;
}

export function renderMovies(movies) {
  const movieList = document.querySelector(".movie-list");
  movieList.textContent = "";
  movies.forEach((movie) => {
    const movieItem = document.createElement("li");
    const movieTitle = document.createElement("h3");
    const movieYear = document.createElement("p");
    const movieRating = document.createElement("p");
    const detailsButton = document.createElement("button");

    if (movie.poster_path) {
      const moviePoster = document.createElement("img");
      moviePoster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
      moviePoster.alt = `Pôster de ${movie.title}`;
      movieItem.appendChild(moviePoster);
    } else {
      const posterMessage = document.createElement("p");
      posterMessage.textContent = "Pôster indisponível";
      movieItem.appendChild(posterMessage);
    }

    movieTitle.textContent = movie.title;
    movieItem.appendChild(movieTitle);

    if (movie.release_date) {
      movieYear.textContent = movie.release_date.split("-")[0];
    } else {
      movieYear.textContent = "Ano não informado";
    }
    movieItem.appendChild(movieYear);

    if (movie.vote_count > 0) {
      movieRating.textContent = `Avaliação: ${movie.vote_average.toFixed(1)}/10`;
    } else {
      movieRating.textContent = "Sem avaliações";
    }
    movieItem.appendChild(movieRating);
    detailsButton.type = "button";
    detailsButton.textContent = "Ver detalhes";
    detailsButton.classList.add("movie-details-button");
    detailsButton.dataset.id = movie.id;
    movieItem.appendChild(detailsButton);

    movieList.append(movieItem);
  });
}

export function showListTitle(text) {
  const titleList = document.querySelector(".list-title");
  titleList.textContent = text;
}

export function openMovieModal() {
  movieModal.showModal();
}

export function closeMovieModal() {
  movieModal.close();
}

export function showDetailsMessage(text) {
  const detailsMessage = document.querySelector(".details-message");
  detailsMessage.textContent = text;
}

export function renderMovieDetails(details) {
  movieDetails.textContent = "";

  const detailsTitle = document.createElement("h2");
  const movieOverview = document.createElement("p");
  const detailsReleaseDate = document.createElement("p");
  const detailsRating = document.createElement("p");

  if (details.poster_path) {
    const detailsPoster = document.createElement("img");
    detailsPoster.src = `https://image.tmdb.org/t/p/w500${details.poster_path}`;
    detailsPoster.alt = ` Pôster de ${details.title}`;
    movieDetails.appendChild(detailsPoster);
  } else {
    const posterDetailsMessage = document.createElement("p");
    posterDetailsMessage.textContent = "Pôster indisponível";
    movieDetails.appendChild(posterDetailsMessage);
  }

  detailsTitle.textContent = details.title;
  movieDetails.appendChild(detailsTitle);

  if (details.release_date) {
    detailsReleaseDate.textContent = `Lançamento: ${details.release_date
      .split("-")
      .reverse()
      .join("/")}`;
  } else {
    detailsReleaseDate.textContent = "Data de lançamento não informada";
  }
  movieDetails.appendChild(detailsReleaseDate);
  if (details.vote_count > 0) {
    detailsRating.textContent = `Avaliação: ${details.vote_average.toFixed(1)}/10`;
  } else {
    detailsRating.textContent = "Sem avaliações";
  }
  movieDetails.appendChild(detailsRating);

  if (details.overview) {
    movieOverview.textContent = details.overview;
  } else {
    movieOverview.textContent = "Sinopse não disponível";
  }
  movieDetails.appendChild(movieOverview);
}

export function clearMovieDetails() {
  movieDetails.textContent = "";
}
