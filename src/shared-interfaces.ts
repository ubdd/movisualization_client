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
