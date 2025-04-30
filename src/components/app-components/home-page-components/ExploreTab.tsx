import React from "react";
import { HeroSearchBar } from "./HeroSearchBar";
import SongTile from "../Tile-components/SongTile";
import SectionWrapper from "../profile-page-components/SectionWrapper";
import ArtistTile from "../Tile-components/ArtistTile";

function ExploreTab() {
  return (
    <div className=" flex flex-col gap-4 my-3 h-fit overflow-y-scroll  scrollbar-none">
      {/* Search Bar Section */}

      <HeroSearchBar />

      {/* Favourites Section */}
      <SectionWrapper
        title="Your Favourites"
        className="bg-gray-500/25 px-5 rounded-lg py-3 "
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          <SongTile
            albumArt="https://i.scdn.co/image/ab67616d0000b273ae7abe97f7020d657e87bbec"
            name="Kasoor"
            artist="Prateek Kuhaad"
          />
          <SongTile
            albumArt="https://i.scdn.co/image/ab67616d0000b273ae7abe97f7020d657e87bbec"
            name="Kasoor"
            artist="Prateek Kuhaad"
          />
          <SongTile
            albumArt="https://i.scdn.co/image/ab67616d0000b273ae7abe97f7020d657e87bbec"
            name="Kasoor"
            artist="Prateek Kuhaad"
          />
          <SongTile
            albumArt="https://i.scdn.co/image/ab67616d0000b273ae7abe97f7020d657e87bbec"
            name="Kasoor"
            artist="Prateek Kuhaad"
          />
        </div>
      </SectionWrapper>

      {/* Top Artists Section */}
      <SectionWrapper
        title="Top Artists"
        className="bg-gray-500/25 px-5 rounded-lg py-3 "
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          <ArtistTile
            artistName="Prateeksha"
            artistImage="https://res-console.cloudinary.com/kratikesh18/media_explorer_thumbnails/83bfc47d6e116fca749fde3bc884990a/detailed"
          />
          <ArtistTile
            artistName="Prateeksha"
            artistImage="https://res-console.cloudinary.com/kratikesh18/media_explorer_thumbnails/83bfc47d6e116fca749fde3bc884990a/detailed"
          />
          <ArtistTile
            artistName="Prateeksha"
            artistImage="https://res-console.cloudinary.com/kratikesh18/media_explorer_thumbnails/83bfc47d6e116fca749fde3bc884990a/detailed"
          />
          <ArtistTile
            artistName="Prateeksha"
            artistImage="https://res-console.cloudinary.com/kratikesh18/media_explorer_thumbnails/83bfc47d6e116fca749fde3bc884990a/detailed"
          />
        </div>
      </SectionWrapper>

      {/* Trending Songs Section */}
      <SectionWrapper
        title="Trending Songs"
        className="bg-gray-500/25 px-5 rounded-lg py-3 "
      >
        <div className="flex gap-4 overflow-x-scroll scrollbar-none">
          <SongTile
            albumArt="https://i.scdn.co/image/ab67616d0000b273ae7abe97f7020d657e87bbec"
            name="Song 1"
            artist="Artist 1"
          />
          <SongTile
            albumArt="https://i.scdn.co/image/ab67616d0000b273ae7abe97f7020d657e87bbec"
            name="Song 2"
            artist="Artist 2"
          />
          <SongTile
            albumArt="https://i.scdn.co/image/ab67616d0000b273ae7abe97f7020d657e87bbec"
            name="Song 3"
            artist="Artist 3"
          />
        </div>
      </SectionWrapper>

      {/* New Releases Section */}
      <SectionWrapper
        title="New Releases"
        className="bg-gray-500/25 px-5 rounded-lg py-3 "
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          <SongTile
            albumArt="https://i.scdn.co/image/ab67616d0000b273ae7abe97f7020d657e87bbec"
            name="New Album"
            artist="Artist Name"
          />
          <SongTile
            albumArt="https://i.scdn.co/image/ab67616d0000b273ae7abe97f7020d657e87bbec"
            name="New Album"
            artist="Artist Name"
          />
        </div>
      </SectionWrapper>

      {/* Recommended for You Section */}
      <SectionWrapper
        title="Recommended for You"
        className="bg-gray-500/25 px-5 rounded-lg py-3 "
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          <SongTile
            albumArt="https://i.scdn.co/image/ab67616d0000b273ae7abe97f7020d657e87bbec"
            name="Recommended Song"
            artist="Artist Name"
          />
          <SongTile
            albumArt="https://i.scdn.co/image/ab67616d0000b273ae7abe97f7020d657e87bbec"
            name="Recommended Song"
            artist="Artist Name"
          />
        </div>
      </SectionWrapper>
    </div>
  );
}

export default ExploreTab;
