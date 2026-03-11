import { ISongData } from "@/app/api/(lyrics-routes)/getDetailsById/route";
import Image from "next/image";

const ContributingSongTile = ({songData}:{songData:ISongData})=>{
  return (
    <div className="flex items-center justify-between gap-3 ">
      {/* Text Info */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-3 sm:p-4 flex-1 min-w-0 h-full flex  flex-col justify-center">
        <h2 className="text-lg sm:text-lg md:text-2xl font-semibold text-green-400 truncate">
          {songData.name}
        </h2>

        <div className="flex flex-wrap gap-1 text-sm sm:text-base">
          {songData.artists.map((artist, idx) => (
            <span className="text-white" key={idx}>
              {artist}
              {idx !== songData.artists.length - 1 && ","}
            </span>
          ))}
        </div>

        <p className="text-zinc-400 text-sm sm:text-base truncate">
          {songData.album.name}
        </p>
      </div>

      {/* Artwork */}
      <div className="flex-shrink-0">
        <Image
          src={songData.album.image}
          alt={songData.name}
          height={150}
          width={150}
          className="rounded-xl w-16 h-16 sm:w-24 sm:h-24 md:w-[140px] md:h-[140px] object-cover"
        />
      </div>
    </div>
  );
}

export {ContributingSongTile}
