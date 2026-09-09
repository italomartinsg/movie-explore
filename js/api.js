import TMDB_TOKEN from "./config.js";

const BASE_URL = "https://api.themoviedb.org/3";

export default async function getPopularMovies() {
  try {
    const response = await fetch(`${BASE_URL}/movie/popular`, {
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
