import { Song } from "@/types";
import usePlayer from "@/hooks/usePlayer";
import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import useSubscribeModal from "@/hooks/useSubscribeModal";

const useOnPlay = (songs: Song[]) => {
  const player = usePlayer();
  const subscribeModal = useSubscribeModal();
  const authModal = useAuthModal();

  const { user, subscription } = useUser();

  return (id: string) => {
    if (!user) {
      return authModal.onOpen();
    }

    if (!subscription) {
      subscribeModal.onOpen();
    }
    player.setId(id);
    player.setIds(songs.map((song) => song.id));
  };
};

export default useOnPlay;
