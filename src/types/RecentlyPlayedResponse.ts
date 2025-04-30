export interface RecentlyPlayedResponse {
  track: {
    album: {
      images: { url: string }[];
    };
    artists: { name: string }[];
    name: string;
  };
}

export interface MyTopArtistsResponse {
  name: string;
  images: { url: string }[];
  genres: string[];
  followers: { total: number };
  popularity: number;
}
