export default async function handler(request, response) {
  const token = process.env.TMDB_TOKEN;
  const { query, id } = request.query;

  let endpoint;

  if (id) {
    endpoint = `https://api.themoviedb.org/3/movie/${id}?language=pt-BR`;
  } else if (query) {
    endpoint = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&language=pt-BR`;
  } else {
    endpoint = "https://api.themoviedb.org/3/movie/popular?language=pt-BR";
  }

  try {
    const tmdbResponse = await fetch(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
        accept: "application/json",
      },
    });

    if (!tmdbResponse.ok) {
      return response.status(500).json({
        error: "Erro ao buscar dados na TMDB",
      });
    }

    const data = await tmdbResponse.json();

    return response.status(200).json(data);
  } catch (error) {
    console.error(error);

    return response.status(500).json({
      error: "Erro interno do servidor",
    });
  }
}
