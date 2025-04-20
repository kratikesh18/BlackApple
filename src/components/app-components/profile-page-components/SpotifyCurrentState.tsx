import SpotifyStateSkeleton from "@/components/extra-components/SpotifyStateSkeleton";
import { useMySession } from "@/context/MySessionContext";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

type TrackType = {
  album: {
    name: string;
    artists: { name: string }[];
    images: { url: string }[];
  };
  artists: { name: string }[];
  name: string;
};

const tempData = {
  timestamp: 1745093834665,
  context: {
    external_urls: {
      spotify: "https://open.spotify.com/playlist/4f1gx9m4vwSU0XwyONGATZ",
    },
    href: "https://api.spotify.com/v1/playlists/4f1gx9m4vwSU0XwyONGATZ",
    type: "playlist",
    uri: "spotify:playlist:4f1gx9m4vwSU0XwyONGATZ",
  },
  progress_ms: 323987,
  item: {
    album: {
      album_type: "album",
      artists: [
        {
          external_urls: {
            spotify: "https://open.spotify.com/artist/6hpDlOvqsnIxrPegGTWVY1",
          },
          href: "https://api.spotify.com/v1/artists/6hpDlOvqsnIxrPegGTWVY1",
          id: "6hpDlOvqsnIxrPegGTWVY1",
          name: "Shantanu Moitra",
          type: "artist",
          uri: "spotify:artist:6hpDlOvqsnIxrPegGTWVY1",
        },
      ],
      available_markets: [
        "AR",
        "AU",
        "AT",
        "BE",
        "BO",
        "BR",
        "BG",
        "CA",
        "CL",
        "CO",
        "CR",
        "CY",
        "CZ",
        "DK",
        "DO",
        "DE",
        "EC",
        "EE",
        "SV",
        "FI",
        "FR",
        "GR",
        "GT",
        "HN",
        "HK",
        "HU",
        "IS",
        "IE",
        "IT",
        "LV",
        "LT",
        "LU",
        "MY",
        "MT",
        "MX",
        "NL",
        "NZ",
        "NI",
        "NO",
        "PA",
        "PY",
        "PE",
        "PH",
        "PL",
        "PT",
        "SG",
        "SK",
        "ES",
        "SE",
        "CH",
        "TW",
        "TR",
        "UY",
        "US",
        "GB",
        "AD",
        "LI",
        "MC",
        "ID",
        "JP",
        "TH",
        "VN",
        "RO",
        "IL",
        "ZA",
        "SA",
        "AE",
        "BH",
        "QA",
        "OM",
        "KW",
        "EG",
        "MA",
        "DZ",
        "TN",
        "LB",
        "JO",
        "PS",
        "IN",
        "BY",
        "KZ",
        "MD",
        "UA",
        "AL",
        "BA",
        "HR",
        "ME",
        "MK",
        "RS",
        "SI",
        "KR",
        "BD",
        "PK",
        "LK",
        "GH",
        "KE",
        "NG",
        "TZ",
        "UG",
        "AG",
        "AM",
        "BS",
        "BB",
        "BZ",
        "BT",
        "BW",
        "BF",
        "CV",
        "CW",
        "DM",
        "FJ",
        "GM",
        "GE",
        "GD",
        "GW",
        "GY",
        "HT",
        "JM",
        "KI",
        "LS",
        "LR",
        "MW",
        "MV",
        "ML",
        "MH",
        "FM",
        "NA",
        "NR",
        "NE",
        "PW",
        "PG",
        "PR",
        "WS",
        "SM",
        "ST",
        "SN",
        "SC",
        "SL",
        "SB",
        "KN",
        "LC",
        "VC",
        "SR",
        "TL",
        "TO",
        "TT",
        "TV",
        "VU",
        "AZ",
        "BN",
        "BI",
        "KH",
        "CM",
        "TD",
        "KM",
        "GQ",
        "SZ",
        "GA",
        "GN",
        "KG",
        "LA",
        "MO",
        "MR",
        "MN",
        "NP",
        "RW",
        "TG",
        "UZ",
        "ZW",
        "BJ",
        "MG",
        "MU",
        "MZ",
        "AO",
        "CI",
        "DJ",
        "ZM",
        "CD",
        "CG",
        "IQ",
        "LY",
        "TJ",
        "VE",
        "ET",
        "XK",
      ],
      external_urls: {
        spotify: "https://open.spotify.com/album/5psGxUMRQzsTjdTl8YSydx",
      },
      href: "https://api.spotify.com/v1/albums/5psGxUMRQzsTjdTl8YSydx",
      id: "5psGxUMRQzsTjdTl8YSydx",
      images: [
        {
          height: 640,
          url: "https://i.scdn.co/image/ab67616d0000b2734cda3faa22d0849fe27724f6",
          width: 640,
        },
        {
          height: 300,
          url: "https://i.scdn.co/image/ab67616d00001e024cda3faa22d0849fe27724f6",
          width: 300,
        },
        {
          height: 64,
          url: "https://i.scdn.co/image/ab67616d000048514cda3faa22d0849fe27724f6",
          width: 64,
        },
      ],
      name: "Bobby Jasoos",
      release_date: "2014-06-10",
      release_date_precision: "day",
      total_tracks: 5,
      type: "album",
      uri: "spotify:album:5psGxUMRQzsTjdTl8YSydx",
    },
    artists: [
      {
        external_urls: {
          spotify: "https://open.spotify.com/artist/0oOet2f43PA68X5RxKobEy",
        },
        href: "https://api.spotify.com/v1/artists/0oOet2f43PA68X5RxKobEy",
        id: "0oOet2f43PA68X5RxKobEy",
        name: "Shreya Ghoshal",
        type: "artist",
        uri: "spotify:artist:0oOet2f43PA68X5RxKobEy",
      },
      {
        external_urls: {
          spotify: "https://open.spotify.com/artist/2FPwX3Gh0w4Qr1v3zSTtcT",
        },
        href: "https://api.spotify.com/v1/artists/2FPwX3Gh0w4Qr1v3zSTtcT",
        id: "2FPwX3Gh0w4Qr1v3zSTtcT",
        name: "Papon",
        type: "artist",
        uri: "spotify:artist:2FPwX3Gh0w4Qr1v3zSTtcT",
      },
    ],
    available_markets: [
      "AR",
      "AU",
      "AT",
      "BE",
      "BO",
      "BR",
      "BG",
      "CA",
      "CL",
      "CO",
      "CR",
      "CY",
      "CZ",
      "DK",
      "DO",
      "DE",
      "EC",
      "EE",
      "SV",
      "FI",
      "FR",
      "GR",
      "GT",
      "HN",
      "HK",
      "HU",
      "IS",
      "IE",
      "IT",
      "LV",
      "LT",
      "LU",
      "MY",
      "MT",
      "MX",
      "NL",
      "NZ",
      "NI",
      "NO",
      "PA",
      "PY",
      "PE",
      "PH",
      "PL",
      "PT",
      "SG",
      "SK",
      "ES",
      "SE",
      "CH",
      "TW",
      "TR",
      "UY",
      "US",
      "GB",
      "AD",
      "LI",
      "MC",
      "ID",
      "JP",
      "TH",
      "VN",
      "RO",
      "IL",
      "ZA",
      "SA",
      "AE",
      "BH",
      "QA",
      "OM",
      "KW",
      "EG",
      "MA",
      "DZ",
      "TN",
      "LB",
      "JO",
      "PS",
      "IN",
      "BY",
      "KZ",
      "MD",
      "UA",
      "AL",
      "BA",
      "HR",
      "ME",
      "MK",
      "RS",
      "SI",
      "KR",
      "BD",
      "PK",
      "LK",
      "GH",
      "KE",
      "NG",
      "TZ",
      "UG",
      "AG",
      "AM",
      "BS",
      "BB",
      "BZ",
      "BT",
      "BW",
      "BF",
      "CV",
      "CW",
      "DM",
      "FJ",
      "GM",
      "GE",
      "GD",
      "GW",
      "GY",
      "HT",
      "JM",
      "KI",
      "LS",
      "LR",
      "MW",
      "MV",
      "ML",
      "MH",
      "FM",
      "NA",
      "NR",
      "NE",
      "PW",
      "PG",
      "PR",
      "WS",
      "SM",
      "ST",
      "SN",
      "SC",
      "SL",
      "SB",
      "KN",
      "LC",
      "VC",
      "SR",
      "TL",
      "TO",
      "TT",
      "TV",
      "VU",
      "AZ",
      "BN",
      "BI",
      "KH",
      "CM",
      "TD",
      "KM",
      "GQ",
      "SZ",
      "GA",
      "GN",
      "KG",
      "LA",
      "MO",
      "MR",
      "MN",
      "NP",
      "RW",
      "TG",
      "UZ",
      "ZW",
      "BJ",
      "MG",
      "MU",
      "MZ",
      "AO",
      "CI",
      "DJ",
      "ZM",
      "CD",
      "CG",
      "IQ",
      "LY",
      "TJ",
      "VE",
      "ET",
      "XK",
    ],
    disc_number: 1,
    duration_ms: 422367,
    explicit: false,
    external_ids: {
      isrc: "INS181401216",
    },
    external_urls: {
      spotify: "https://open.spotify.com/track/6fuZ8TQ5TLKjIAEH5PeEW0",
    },
    href: "https://api.spotify.com/v1/tracks/6fuZ8TQ5TLKjIAEH5PeEW0",
    id: "6fuZ8TQ5TLKjIAEH5PeEW0",
    is_local: false,
    name: "Tu",
    popularity: 39,
    preview_url: null,
    track_number: 2,
    type: "track",
    uri: "spotify:track:6fuZ8TQ5TLKjIAEH5PeEW0",
  },
  currently_playing_type: "track",
  actions: {
    disallows: {
      resuming: true,
    },
  },
  is_playing: true,
};

function SpotifyCurrentState() {
  const [isAvailable, setIsAvailable] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [track, setTrack] = useState<TrackType>({
    album: {
      name: "Shehron Ke Raaz",
      artists: [{ name: "Prateek Kuhad" }],
      images: [
        {
          url: "https://c.saavncdn.com/178/Shehron-Ke-Raaz-English-2021-20210622130715-500x500.jpg",
        },
      ],
    },
    artists: [{ name: "Prateek Kuhad" }],
    name: "Tere Hi Hum",
  });
  const { session } = useMySession();

  // useEffect(() => {
  //   // if (hasFetched.current) return; // Prevent multiple fetches
  //   // hasFetched.current = true; // Set the flag to true after the first fetch

  //   const getCurrentPlayingTrack = async () => {
  //     setLoading(true);
  //     // setTimeout(() => {
  //     //   console.log("hello");
  //     //   setLoading(false);
  //     // }, 100000);
  //     setError("");

  //     try {
  //       const response = await axios.get(
  //         "https://api.spotify.com/v1/me/player/currently-playing/",
  //         {
  //           headers: {
  //             Authorization: `Bearer ${session?.accessToken}`,
  //           },
  //         }
  //       );

  //       if (response.status === 204) {
  //         setError("No track is currently playing on Spotify.");
  //         setIsAvailable(false);
  //         return;
  //       }

  //       if (response.status === 401) {
  //         setError("Token expired. Please re-authenticate.");
  //         setIsAvailable(false);
  //         return;
  //       }

  //       if (response.status === 200 && response.data) {
  //         setTrack({
  //           album: {
  //             name: response.data.item.album.name,
  //             artists: response.data.item.album.artists.map((artist: any) => ({
  //               name: artist.name,
  //             })),
  //             images: response.data.item.album.images,
  //           },
  //           artists: response.data.item.artists.map((artist: any) => ({
  //             name: artist.name,
  //           })),
  //           name: response.data.item.name,
  //         });
  //         setIsAvailable(true);
  //       }
  //     } catch (error) {
  //       if (error instanceof AxiosError) {
  //         const { response } = error;
  //         setError(
  //           response?.data?.error?.message || "Hold on, we are working on this."
  //         );
  //       } else {
  //         setError("An unexpected error occurred.");
  //       }
  //       setIsAvailable(false);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   // getCurrentPlayingTrack();
  // }, [session]);

  if (loading) {
    return <SpotifyStateSkeleton />;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!isAvailable || !track) {
    return <p>No track is currently playing on Spotify.</p>;
  }

  return (
    <div className="flex items-center justify-between ">
      {/* Left Side - Text Info */}
      <div className="flex flex-col justify-between gap-1 max-w-[70%]">
        <h1 className="font-bold text-base md:text-xl text-white truncate">
          {track.name}
        </h1>
        <h2 className="text-sm text-gray-300 truncate">
          {track.artists.map((artist) => artist.name).join(", ")}
        </h2>
        <h2 className="text-sm text-gray-300 truncate">{track.album.name}</h2>

        <Link
          href={`/lyrics/#`}
          className="mt-2 inline-block w-fit bg-purple-700 hover:bg-purple-800 text-white text-sm md:font-medium px-4 py-2 rounded-lg transition-colors duration-200"
        >
          Show Lyrics
        </Link>
      </div>

      {/* Right Side - Album Art */}
      <div className="ml-4 shrink-0">
        <img
          src={track.album.images[0]?.url || ""}
          alt={track.name}
          className="h-24 w-24 md:h-28 md:w-28 object-cover rounded-lg border border-zinc-800"
        />
      </div>
    </div>
  );
}

export default SpotifyCurrentState;
