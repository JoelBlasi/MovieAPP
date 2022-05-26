import axios from "axios";
const url = "https://628c9484a3fd714fd034e3eb.mockapi.io";

export const movieServices = {
  getAllMovies() {
    const movies = axios.get(url + "/movies").then((res) => {
      return res.data;
    });
    return movies;
  },

  deleteMovie(id) {
    const deleteMovie = axios.delete(url + "/movies/" + id).then((res) => {
      return res.data;
    });
    return deleteMovie;
  },

  postMovie(data) {
    const postMovie = axios.post(url + "/movies", data).then((res) => {
      return res.data;
    });
    return postMovie;
  },
};
