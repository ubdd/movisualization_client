import axios from "axios";
import {
  YoutubeSearchApiParams,
  IDailyBoxOfficeListReq,
  IWeeklyBoxOfficeListReq
} from "./shared-interfaces";

/* base kobis api axios object */
const kobisApiBase = axios.create({
  baseURL: "https://www.kobis.or.kr/kobisopenapi/webservice/rest/",
  params: { key: process.env.REACT_APP_KOBIS_API_KEY }
});

export const kobisApi = {
  dailyBoxOffice: (params: IDailyBoxOfficeListReq) =>
    kobisApiBase.get("boxoffice/searchDailyBoxOfficeList.json", { params }),
  weeklyBoxOffice: (params: IWeeklyBoxOfficeListReq) =>
    kobisApiBase.get("boxoffice/searchWeeklyBoxOfficeList.json", { params })
};

/* youtube data api variables */
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

/* tmdb api variables */
const region: "KR" | "US" = "KR"; /* ISO 3166-1 region */
const language: "ko-KR" | "en-US" = "ko-KR"; /* ISO 639-1 language */
const include_adult: boolean = true; /* include adult only content */
const append_to_response: null | "images" | "videos" | "images,videos" =
  "images,videos"; /* which media append to response */

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

/* naver search api variables */
const display = 100;
const start = 1;

/* base naver api axios object */
const naverSearchBaseApi = axios.create({
  baseURL: "https://openapi.naver.com/v1/search/",
  headers: {
    "X-Naver-Client-Id": process.env.REACT_APP_NAVER_CLIENT_ID,
    "X-Naver-Client-Secret": process.env.REACT_APP_NAVER_CLIENT_SECRET,
    "content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,OPTIONS",
    "Access-Control-Allow-Headers":
      "Content-Type, Authorization, Content-Length, X-Requested-With"
  }
});

export const naverSearchApis = {
  movie: (query: string) =>
    naverSearchBaseApi.get(`movie`, {
      params: {
        query,
        display,
        start
      }
    })
};
