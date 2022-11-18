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
  const { avatar } = session?.user as User;
  const { register, handleSubmit, watch, formState } = useForm<Post>();

  const onSubmitForm = (data: Post) => {
    setLoading(true);
    onSubmit(data, () => {
      onCloseModal();
      setLoading(false);
    });
  };
  return (
    <Modal
      onClose={onCloseModal}
      title={"Create new Post"}
      titleClassName={"text-2xl"}
    >
      <div className="flex flex-col w-96">
        <div className="flex-row flex items-center">
          <div>
            <Image
              src={
                "https://scontent.fhan2-1.fna.fbcdn.net/v/t1.6435-1/138317164_1579505722244254_2206959289389356615_n.jpg?stp=dst-jpg_p160x160&_nc_cat=102&ccb=1-7&_nc_sid=dbb9e7&_nc_ohc=xDD6M5wYHdAAX_UWGgp&_nc_ht=scontent.fhan2-1.fna&oh=00_AfABEsat-q98f66evyS7FGGSv_4k0QO7iylocBLGQC2HvA&oe=63995A22"
              }
              width={500}
              height={500}
              alt="avatar"
              className="rounded-full w-10 h-10"
            />
          </div>
          <div className="font-semibold ml-4">
            <div className="">Văn Nguyễn Duy</div>
            <div>(Friend)</div>
          </div>
        </div>
        <textarea
          id="message"
          rows={4}
          className="mt-4 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Write your thoughts here..."
          {...register("content")}
        ></textarea>
        <div className="w-full flex mt-6">
          <Button
            title={loading ? "Creating" : "Create"}
            className="w-fit ml-auto"
            loading={loading}
            disabled={loading}
            onClick={handleSubmit(onSubmitForm)}
          />
        </div>
      </div>
    </Modal>
  );
}

export default ModalAddNewPost;
