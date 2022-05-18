const axios = require("axios");
require("dotenv").config;
const { API_END_POINT, API_KEY } = process.env;

exports.handler = async function (event) {
  const options = JSON.parse(event.body);
  const { url } = options;
  const res = await axios({
    url: `${API_END_POINT}?apikey=${API_KEY}${url}`,
    method: "GET",
  });

  if (res.statusText !== "OK") {
    return {
      statusCode: res.status,
      body: "API ERROR!",
    };
  } else {
    return {
      statusCode: 200,
      body: JSON.stringify(res.data),
    };
  }
};
