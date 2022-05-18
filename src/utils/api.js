const request = async (url, options = {}) => {
  const res = await fetch("/.netlify/functions/workspace", {
    method: "POST",
    body: JSON.stringify({ url }),
  });

  if (!res.ok) {
    console.log("res", res);
    throw new Error(res);
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
