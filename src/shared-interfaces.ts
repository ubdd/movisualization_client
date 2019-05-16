export interface ICrew {
  credit_id?: string;
  department?: string;
  gender?: string;
  id?: string;
  job?: string;
  name?: string;
  profile_path?: string;
}

export interface Movie {
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection: null | object;
  budget: number;
  genres: Genre[];
  homepage: string | null;
  id: number;
  imdb_id: string | null;
  original_language: string;
  original_title: string;
  overview: string | null;
  popularity: number;
  poster_path: string | null;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: string;
  revenus: number;
  runtime: number | null;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface ProductionCompany {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguage {
  iso_639_1: string;
  name: string;
}

export interface DailyRandAudiCnt {
  movieNm: string;
  data: {
    date: string[];
    rank: number[];
    audiCnt: number[];
  };
}

export interface TMDbMovieVideo {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  site: "Youtube" | any;
  size: number;
  type: "Teaser" | "Trailer" | "Featurette";
}

export interface YoutubeVideosParams {
  part: string;
  id: string;
}

export interface Genre {
  id: number;
  name:
    | "액션"
    | "판타지"
    | "SF"
    | "모험"
    | "공포"
    | "애니메이션"
    | "가족"
    | "코미디"
    | "드라마"
    | "미스터리"
    | "스릴러"
    | "범죄"
    | "로맨스"
    | "음악"
    | "역사"
    | "전쟁"
    | "다큐멘터리"
    | "서부"
    | "TV 영화";
}

export interface YoutubeSearchApiParams {
  part: "id" | "snippet";
  channelId?: string;
  channelType?: "any" | "show";
  eventType?: "completed" | "live" | "upcoming";
  maxResults?: number;
  onBehalfOfContentOwner?: string;
  order?:
    | "date"
    | "rating"
    | "relevance"
    | "title"
    | "videoCount"
    | "viewCount";
  pageToken?: string;
  publishedAfter?: string;
  q?: string;
  regionCode?: string;
  safeSearch?: "moderate" | "none" | "strict";
  topicId?: string;
  type?: "channel" | "playlist" | "video";
  videoCaption?: "any" | "closedCaption" | "none";
  videoCategoryId?: string;
  videoDefinition?: "any" | "high" | "standard";
  videoDimension?: "2d" | "3d" | "any";
  videoDuration?: "any" | "long" | "medium" | "short";
  videoEmbeddable?: "any" | "true";
  videoLicense?: "any" | "creativeCommon" | "youtube";
  videoSyndicated?: "any" | "true";
  videoType?: "any" | "episode" | "movie";
}

export interface IDailyBoxOfficeListReq {
  targetDt: string;
  itemPerPage?: string;
  multiMovieYn?: "Y" | "N";
  repNationCd?: "K" | "F";
  wideAreaCd?: string;
}

export interface IWeeklyBoxOfficeListReq {
  targetDt: string;
  weekGb?: "0" | "1" | "2";
  itemPerPage?: string;
  multiMovieYn?: "Y" | "N";
  repNationCd?: "K" | "F";
  wideAreaCd?: string;
}

export interface MovieDetail {
  /* movie detail result */
  movie_id: string;
  title: string;
  backdrop_path: string;
  poster_path: string;
  revenue: string;
  budget: string;
  popularity: number /* float */;
  vote_average: number /* float */;
  homepage: string;
  imdb_id: string;
  videos: {
    site: string;
    key: string;
    name: string;
  }[];
  release_date: string;
  genres: {
    id: number;
    name: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  runtime: number;
  tagline: string;
  overview: string;
  production_companies: {
    logo_path: string;
    name: string;
    origin_country: string;
  }[];
  spoken_languages: {
    iso_639_1: string;
    name: string;
  }[];

  /* movie credit result */
  people: {
    id: string;
    department: string;
    job: string;
    name: string;
    profile_path: string;
  }[];

  /* movie box office with other api */
  date: string[];
  rank: number[];
  totalRank: number[];
  audi_cnt: number[];
  audi_acc: number[];
  multi: string;
  nation: string;

  /* if only movie box office */
  // movie_name: string;
  // date: string[];
  // rank: number[];
  // totalRank: number[];
  // audi_cnt: number[];
  // audi_acc: number[];
  // multi: string;
  // nation: string;
}
