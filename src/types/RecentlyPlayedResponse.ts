export interface RecentlyPlayedResponse {
  track: {
    album: {
      images: { url: string };
    };
    artists: { name: string }[];
    name: string;
    global_id: string;
  };
}

export interface MyTopArtistsResponse {
  name: string;
  images: { url: string }[];
  genres: string[];
  followers: { total: number };
  popularity: number;
}

export interface TrackQueryResponse {
  album: {
    images: { url: string }[];
  };
  artists: { name: string }[];
  name: string;
}

export interface ArtistQueryResponse {
  genre: string[];
  images: { url: string }[];
  name: string;
}

export interface AlbumQueryResponse {
  images: { url: string }[];
  name: string;
  release_date: string;
}
