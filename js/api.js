import TMDB_TOKEN from "./config.js";

const BASE_URL = "https://api.themoviedb.org/3";

export default async function getPopularMovies() {
  const params = new URLSearchParams({ language: "pt-BR" });
  try {
    const response = await fetch(`${BASE_URL}/movie/popular?${params}`, {
      headers: {
        Authorization: `Bearer ${TMDB_TOKEN}`,
      },
    });
    if (!response.ok) {
      throw new Error(`Erro! ${response.status}`);
    }
    const data = await response.json();

    return data.results;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function searchMovies(query) {
  const params = new URLSearchParams({ query, language: "pt-BR" });
  try {
    const response = await fetch(`${BASE_URL}/search/movie?${params}`, {
      headers: {
        Authorization: `Bearer ${TMDB_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Erro! ${response.status}`);
    }

    const data = await response.json();

    return data.results;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function getMovieDetails(movieId) {
  const params = new URLSearchParams({ language: "pt-BR" });
  try {
    const response = await fetch(`${BASE_URL}/movie/${movieId}?${params}`, {
      headers: {
        Authorization: `Bearer ${TMDB_TOKEN}`,
      },
    });
    if (!response.ok) {
      throw new Error(`Erro! ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
