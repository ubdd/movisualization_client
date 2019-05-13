export interface ICrew {
  credit_id?: string;
  department?: string;
  gender?: string;
  id?: string;
  job?: string;
  name?: string;
  profile_path?: string;
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
