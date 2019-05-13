import axios from "axios";
import { YoutubeSearchApiParams } from "./shared-interfaces";

const region: "KR" | "US" = "KR"; /* ISO 3166-1 region */
const language: "ko-KR" | "en-US" = "ko-KR"; /* ISO 639-1 language */
const include_adult: boolean = true; /* include adult only content */
const append_to_response: null | "images" | "videos" | "images,videos" =
  "images,videos"; /* which media append to response */
const videoPart =
  "id, snippet, contentDetails,liveStreamingDetails, player, recordingDetails, statistics, status, topicDetails";

/* base youtube api axios object */
const youtubeBaseApi = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3/",
  params: {
    key: process.env.REACT_APP_YOUTUBE_API_KEY
  }
});

export const youtubeApis = {
  search: (params: YoutubeSearchApiParams) =>
    youtubeBaseApi.get(`search`, {
      params
    }),
  videos: (id: string) =>
    youtubeBaseApi.get(`videos`, {
      params: {
        part: videoPart,
        id
      }
    })
};

/* base tmdb api axios object */
const tmdbBaseApi = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  params: {
    api_key: process.env.REACT_APP_TMDB_API_KEY,
    language,
    region
  }
});

export const tmdbApis = {
  nowPlaying: (page: number) =>
    tmdbBaseApi.get("movie/now_playing", { params: { page } }),
  upcoming: (page: number) =>
    tmdbBaseApi.get("movie/upcoming", { params: { page } }),
  popular: (page: number) =>
    tmdbBaseApi.get("movie/popular", { params: { page } }),
  topRated: (page: number) =>
    tmdbBaseApi.get("movie/top_rated", { params: { page } }),
  detail: (movieId: number) =>
    tmdbBaseApi.get(`movie/${movieId}`, {
      params: {
        append_to_response
      }
    }),
  credit: (movieId: number) => tmdbBaseApi.get(`movie/${movieId}/credits`),
  searchMovie: (query: string, page: number) =>
    tmdbBaseApi.get("search/movie", {
      params: {
        query,
        include_adult,
        region,
        page
      }
    }),
  searchPerson: (query: string, page: number) =>
    tmdbBaseApi.get("search/person", {
      params: {
        query,
        include_adult,
        region,
        page
      }
    }),
  person: (personId: number) =>
    tmdbBaseApi.get(`person/${personId}`, {
      params: {
        append_to_response
      }
    }),
  recommendation: (movieId: number, page: number) =>
    tmdbBaseApi.get(`movie/${movieId}/recommendations`, {
      params: {
        page
      }
    }),
  similar: (movieId: number, page: number) =>
    tmdbBaseApi.get(`movie/${movieId}/similar`, {
      params: {
        page
      }
    }),
  filmography: (personId: number) =>
    tmdbBaseApi.get(`person/${personId}/movie_credits`),
  genres: () => tmdbBaseApi.get(`genre/movie/list`)
};