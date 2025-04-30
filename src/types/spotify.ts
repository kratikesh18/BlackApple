interface SpotifyCurrentlyPlaying {
  timestamp: number;
  context: SpotifyContext;
  progress_ms: number;
  item: SpotifyTrack;
  currently_playing_type: "track" | "episode" | "ad" | string;
  actions: SpotifyActions;
  is_playing: boolean;
}

interface SpotifyContext {
  external_urls: { spotify: string };
  href: string;
  type: "playlist" | "album" | "artist" | string;
  uri: string;
}

interface SpotifyTrack {
  album: SpotifyAlbum;
  artists: SpotifyArtist[];
  available_markets: string[]; // ISO country codes
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: { isrc: string };
  external_urls: { spotify: string };
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  popularity: number;
  preview_url: string | null;
  track_number: number;
  type: "track";
  uri: string;
}

interface SpotifyAlbum {
  album_type: "album" | "single" | "compilation" | string;
  artists: SpotifyArtist[];
  available_markets: string[];
  external_urls: { spotify: string };
  href: string;
  id: string;
  images: SpotifyImage[];
  name: string;
  release_date: string;
  release_date_precision: "year" | "month" | "day";
  total_tracks: number;
  type: "album";
  uri: string;
}

interface SpotifyArtist {
  external_urls: { spotify: string };
  href: string;
  id: string;
  name: string;
  type: "artist";
  uri: string;
}

interface SpotifyImage {
  height: number;
  width: number;
  url: string;
}

interface SpotifyActions {
  disallows: {
    resuming?: boolean;
    [key: string]: boolean | undefined;
  };
}
