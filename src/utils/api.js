const request = async (url, options = {}) => {
  return await fetch("/.netlify/functions/workspace", {
    method: "POST",
    body: JSON.stringify({ url }),
  }).then(res => res.json());
};

export const getMovies = async (inputValue, page = 1) => {
  const data = await request(`&s=${inputValue}&page=${page}`);

  return data;
};

export const getMovie = async (movieId, plot = "full") => {
  const data = await request(`&i=${movieId}&plot=${plot}`);

  return data;
};
