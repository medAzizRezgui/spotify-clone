"use client";
import { Song } from "@/types";
import MediaItem from "@/components/MediaItem";

interface SearchContentProps {
  songs: Song[];
}
const SearchContent: React.FC<SearchContentProps> = ({ songs }) => {
  if (songs.length === 0) {
    return (
      <div className={"flex w-full flex-col gap-y-2 px-6 text-neutral-400"}>
        No Songs Found
      </div>
    );
  }
  return (
    <div className={"flex w-full flex-col gap-y-2 px-6"}>
      {songs.map((song) => (
        <div key={song.id} className={"flex w-full items-center gap-x-4"}>
          <MediaItem data={song} onClick={() => {}} />
        </div>
      ))}
    </div>
  );
};

export default SearchContent;
