// interface RecentlyPlayedResponse {
//   items: PlayHistoryObject[];
//   next: string | null;
//   cursors: {
//     after: string;
//     before: string;
//   };
//   limit: number;
//   href: string;
// }

// interface PlayHistoryObject {
//   track: SimplifiedTrackObject;
//   played_at: string; // ISO 8601 timestamp
//   context: ContextObject | null;
// }

// interface SimplifiedTrackObject {
//   album: SimplifiedAlbumObject;
//   artists: SimplifiedArtistObject[];
//   available_markets: string[];
//   disc_number: number;
//   duration_ms: number;
//   explicit: boolean;
//   external_ids: {
//     isrc: string;
//   };
//   external_urls: {
//     spotify: string;
//   };
//   href: string;
//   id: string;
//   is_local: boolean;
//   name: string;
//   popularity: number;
//   preview_url: string | null;
//   track_number: number;
//   type: string;
//   uri: string;
// }

// interface SimplifiedAlbumObject {
//   album_type: string;
//   artists: SimplifiedArtistObject[];
//   available_markets: string[];
//   external_urls: {
//     spotify: string;
//   };
//   href: string;
//   id: string;
//   images: ImageObject[];
//   name: string;
//   release_date: string;
//   release_date_precision: string;
//   total_tracks: number;
//   type: string;
//   uri: string;
// }

// interface SimplifiedArtistObject {
//   external_urls: {
//     spotify: string;
//   };
//   href: string;
//   id: string;
//   name: string;
//   type: string;
//   uri: string;
// }

// interface ImageObject {
//   height: number;
//   url: string;
//   width: number;
// }

// interface ContextObject {
//   type: string;
//   href: string;
//   external_urls: {
//     spotify: string;
//   };
//   uri: string;
// }
