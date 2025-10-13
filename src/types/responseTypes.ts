export type TrackType = {
  album: {
    name: string;
    artists: { name: string }[];
    images: { url: string }[];
  };
  artists: { name: string }[];
  name: string;
  global_id: string;
  progress: string;
};
