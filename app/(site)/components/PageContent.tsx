"use client";

import { Song } from "@/types";
import SongItem from "@/components/SongItem";
import useOnPlay from "@/hooks/useOnPlay";
import { it } from "node:test";

interface PageContentProps {
  songs: Song[];
}
const PageContent: React.FC<PageContentProps> = ({ songs }) => {
  const onPlay = useOnPlay(songs);
  if (songs.length === 0) {
    return <div className={"mt-4 text-neutral-400"}>No Songs Available</div>;
  }
  return (
    <div
      className={
        "mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8"
      }
    >
      {songs.map((item) => (
        <SongItem key={item.id} onClick={() => onPlay(item.id)} data={item} />
      ))}
    </div>
  );
};

export default PageContent;
