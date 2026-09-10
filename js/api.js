export default async function getPopularMovies() {
  try {
    const response = await fetch("/api/movies");

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
  const params = new URLSearchParams({ query });

  try {
    const response = await fetch(`/api/movies?${params}`);

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

export async function getMovieDetails(movieId) {
  const params = new URLSearchParams({ id: movieId });

  try {
    const response = await fetch(`/api/movies?${params}`);

    if (!response.ok) {
      throw new Error(`Erro! ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
