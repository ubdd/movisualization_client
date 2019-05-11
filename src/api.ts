import axios from "axios";

const region = "KR";
const language = "ko-KR";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  params: {
    api_key: process.env.REACT_APP_API_KEY,
    // language: "en-US",
    // region: "US"
    language,
    region
  }
});

export const moviesApi = {
  nowPlaying: (page: number) =>
    api.get("movie/now_playing", { params: { page } }),
  upcoming: (page: number) => api.get("movie/upcoming", { params: { page } }),
  popular: (page: number) => api.get("movie/popular", { params: { page } }),
  topRated: (page: number) => api.get("movie/top_rated", { params: { page } }),
  detail: (movidId: number) =>
    api.get(`movie/${movidId}`, {
      params: {
        append_to_response: "image,videos"
      }
    }),
  credit: (movieId: number) => api.get(`movie/${movieId}/credits`),
  search: (query: string, page: number) =>
    api.get("search/movie", {
      params: {
        query,
        include_adult: true,
        region,
        page
      }
    }),
  person: (personId: number) =>
    api.get(`person/${personId}`, {
      params: {
        append_to_response: "image,videos"
      }
    }),
  recommendation: (movieId: number, page: number) =>
    api.get(`movie/${movieId}/recommendations`, {
      params: {
        page
      }
    }),
  similar: (movieId: number, page: number) =>
    api.get(`movie/${movieId}/similar`, {
      params: {
        page
      }
    }),
  filmography: (personId: number) => api.get(`person/${personId}/movie_credits`)
};
