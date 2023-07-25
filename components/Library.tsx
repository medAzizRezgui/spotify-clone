"use client";

import { TbPlaylist } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";
import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import useUploadModal from "@/hooks/useUploadModal";

const Library = () => {
  const authModal = useAuthModal();
  const { user } = useUser();
  const uploadModal = useUploadModal();
  const onClick = () => {
    if (!user) {
      return authModal.onOpen();
    }
    // TODO: check for subscription
    return uploadModal.onOpen();
  };
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-5 pt-4">
        <div className="inline-flex items-center gap-x-2">
          <TbPlaylist className="text-neutral-400" size={26} />
          <p className="text-sm font-medium text-neutral-400">Your Library</p>
        </div>
        <AiOutlinePlus
          onClick={onClick}
          size={20}
          className="
            cursor-pointer
            text-neutral-400
            transition
            hover:text-white
          "
        />
      </div>
      <div className="mt-4 flex flex-col gap-y-2 px-3">
        {/*{songs.map((item) => (*/}
        {/*  <MediaItem*/}
        {/*    onClick={(id: string) => onPlay(id)}*/}
        {/*    key={item.id}*/}
        {/*    data={item}*/}
        {/*  />*/}
        {/*))}*/}
      </div>
    </div>
  );
};

export default Library;
