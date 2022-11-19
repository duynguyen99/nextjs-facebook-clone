import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Post, User } from "../../types/Base";
import { ModalAddNewPostProps } from "../../types/Props";
import Button from "../Button";
import Modal from "../Modal";

function ModalAddNewPost({ onSubmit, onCloseModal }: ModalAddNewPostProps) {
  const { data: session } = useSession();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const { avatar, fullName } = session?.user as User;
  const { register, handleSubmit, watch } = useForm<Post>();
  const watchAll = watch();
  const onSubmitForm = (data: Post) => {
    setLoading(true);
    onSubmit(data, (msgError?: string) => {
      if (!msgError) {
        onCloseModal();
      }
      setLoading(false);
      setError(msgError || "");
    });
  };
  return (
    <Modal
      onClose={onCloseModal}
      title={"Create new Post"}
      titleClassName={"lg:text-2xl text-lg pt-2 lg:pt-0"}
    >
      <div className="flex flex-col lg:w-96 w-64">
        <div className="flex-row flex items-center">
          <div>
            <Image
              src={avatar || ""}
              width={500}
              height={500}
              alt="avatar"
              className="rounded-full w-10 h-10 border"
            />
          </div>
          <div className="font-semibold ml-4">
            <div className="">{fullName}</div>
            <div>(Friend)</div>
          </div>
        </div>
        <textarea
          id="message"
          rows={4}
          className="mt-4 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Write your thoughts here..."
          {...register("content")}
        />
        {error && <div className="text-red-600 mt-2">{error}</div>}
        <div className="w-full flex mt-6">
          <Button
            title={loading ? "Creating" : "Create"}
            className="w-fit ml-auto"
            loading={loading}
            disabled={loading || !watchAll.content}
            onClick={handleSubmit(onSubmitForm)}
          />
        </div>
      </div>
    </Modal>
  );
}

export default ModalAddNewPost;
