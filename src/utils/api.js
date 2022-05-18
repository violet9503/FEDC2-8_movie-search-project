const API_END_POINT = "https://www.omdbapi.com?apikey=7035c60c";

const request = async (url, options = {}) => {
  const res = await fetch(`${API_END_POINT}${url}`, {
    ...options,
  });

  if (!res.ok) {
    throw new Error(res.status);
  }

  return res.json();
};

export const getMovies = async (inputValue, page = 1) => {
  const data = await request(`&s=${inputValue}&page=${page}`);

  return data;
};

export const getMovie = async (movieId, plot = "full") => {
  const data = await request(`&i=${movieId}&plot=${plot}`);

  return data;
};
