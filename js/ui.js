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
    movieList.append(movieItem);
  });
}
