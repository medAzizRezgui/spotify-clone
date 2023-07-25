"use client";
import { Song } from "@/types";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import { useEffect } from "react";
import MediaItem from "@/components/MediaItem";
import LikeButton from "@/components/LikeButton";
import useOnPlay from "@/hooks/useOnPlay";

interface LikedContentProps {
  songs: Song[];
}
const LikedContent: React.FC<LikedContentProps> = ({ songs }) => {
  const router = useRouter();
  const onPlay = useOnPlay(songs);
  const { isLoading, user } = useUser();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/");
    }
  }, [isLoading, user, router]);
  if (songs.length === 0) {
    return (
      <div
        className={
          "flex w-full flex-col gap-y-2 px-6 font-medium text-neutral-600"
        }
      >
        No Liked Songs
      </div>
    );
  }
  return (
    <div className={"flex w-full flex-col gap-y-2 p-6"}>
      {songs.map((song) => (
        <div key={song.id} className={"flex w-full items-center gap-x-4"}>
          <div className={"flex-1"}>
            <MediaItem data={song} onClick={(id: string) => onPlay(id)} />
          </div>
          <LikeButton songId={song.id} />
        </div>
      ))}
    </div>
  );
};

export default LikedContent;
