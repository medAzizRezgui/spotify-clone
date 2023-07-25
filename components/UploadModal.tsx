"use client";

import Modal from "@/components/Modal";
import useUploadModal from "@/hooks/useUploadModal";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "@/components/Input";
import { useState } from "react";
import Button from "@/components/Button";
import toast from "react-hot-toast";
import { useUser } from "@/hooks/useUser";
import uniqid from "uniqid";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
const UploadModal = () => {
  const uploadModal = useUploadModal();
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();
  const router = useRouter();
  const supabaseClient = useSupabaseClient();
  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      author: "",
      title: "",
      song: null,
      image: null,
    },
  });
  const onChange = (open: boolean) => {
    if (!open) {
      reset();
      uploadModal.onClose();
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true);
      const imageFile = values.image?.[0];
      const songFile = values.song?.[0];

      if (!imageFile || !songFile || !user) {
        toast.error("Missing fields");
        return;
      }

      const uniqueID = uniqid();
      //   Upload Song
      const { data: songData, error: songError } = await supabaseClient.storage
        .from("songs")
        .upload(`song-${values.title}-${uniqueID}`, songFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (songError) {
        setIsLoading(false);
        return toast.error("Failed Song Upload");
      }

      //   Upload Image
      const { data: imageData, error: imageError } =
        await supabaseClient.storage
          .from("images")
          .upload(`image-${values.title}-${uniqueID}`, imageFile, {
            cacheControl: "3600",
            upsert: false,
          });
      if (imageError) {
        setIsLoading(false);
        return toast.error("Failed image Upload");
      }

      const { error: supabaseError } = await supabaseClient
        .from("songs")
        .insert({
          user_id: user.id,
          title: values.title,
          author: values.author,
          image_path: imageData.path,
          song_path: songData.path,
        });

      if (supabaseError) {
        setIsLoading(false);
        return toast.error(supabaseError.message);
      }

      router.refresh();

      setIsLoading(false);
      toast.success("Song created!");
      reset();
      uploadModal.onClose();
    } catch (e) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Modal
      isOpen={uploadModal.isOpen}
      onChange={onChange}
      title={"Add a song"}
      description={"Upload an mp3 file"}
    >
      <form
        className={"flex flex-col gap-y-4"}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          id={"title"}
          disabled={isLoading}
          {...register("title", { required: true })}
          placeholder={"Song Title"}
        />
        <Input
          id={"author"}
          disabled={isLoading}
          {...register("author", { required: true })}
          placeholder={"Author Name"}
        />
        <div>
          <div className={"pb-1"}>Select a song file</div>
          <Input
            id={"song"}
            type={"file"}
            disabled={isLoading}
            accept={".mp3"}
            {...register("song", { required: true })}
          />
        </div>{" "}
        <div>
          <div className={"pb-1"}>Select an image</div>
          <Input
            id={"image"}
            type={"file"}
            disabled={isLoading}
            accept={"image/*"}
            {...register("image", { required: true })}
          />
        </div>
        <Button disabled={isLoading} type={"submit"}>
          {" "}
          Create
        </Button>
      </form>
    </Modal>
  );
};
export default UploadModal;
