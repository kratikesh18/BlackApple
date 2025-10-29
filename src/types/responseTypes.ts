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

export interface ApiResponseType<T = {}> {
  success: boolean;
  message: string;
  data?: T;
  error?: {
    code?: string;
    details?: {};
  };
}

export interface GlobalErrorType {
  message: string;
}
