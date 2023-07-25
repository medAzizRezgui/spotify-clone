"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaPlay } from "react-icons/fa";

interface ListItemProps {
  image: string;
  name: string;
  href: string;
}

const ListItem: React.FC<ListItemProps> = ({ name, image, href }) => {
  const router = useRouter();
  const onClick = () => {
    // Add auth first
    router.push(href);
  };
  return (
    <button
      onClick={onClick}
      className={
        "group relative flex items-center gap-x-4 overflow-hidden rounded-md bg-neutral-100/10 pr-4 transition hover:bg-neutral-100/20"
      }
    >
      <div className={"relative min-h-[64px] min-w-[64px]"}>
        <Image src={image} alt={"image"} className={"object-cover"} fill />
      </div>
      <p className={"truncate py-5 font-medium"}>{name}</p>
      <div
        className={
          "absolute right-5 flex items-center justify-center rounded-full bg-green-400 p-3 opacity-0 drop-shadow-md transition hover:scale-110 group-hover:opacity-100"
        }
      >
        <FaPlay className={"text-black"} size={16} />
      </div>
    </button>
  );
};

export default ListItem;
