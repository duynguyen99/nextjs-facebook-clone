import React, { useState } from "react";
import { NewPostProps } from "../types/Props";
import Card from "./Card";
import Image from "next/image";
import ModalAddNewPost from "./modules/ModalAddNewPost";
import { useSession } from "next-auth/react";
import { User } from "../types/Base";
const NewPost = ({ onAdd }: NewPostProps) => {
  const [showModalAddNewPost, setShowModalAddNewPost] = useState(false);
  const { data: session } = useSession();
  const user = session?.user as User;
  return (
    <div className="">
      <Card>
        <div className="flex flex-row items-center">
          <Image
            src={user?.avatar || ''}
            width={500}
            height={500}
            alt="avatar"
            className="rounded-full w-10 h-10 cursor-pointer"
          />
          <div
            className="rounded-full bg-slate-200 w-full ml-2 p-2 pl-4 hover:bg-slate-400 cursor-pointer border-2"
            onClick={() => setShowModalAddNewPost(true)}
          >
            Hey {user?.fullName}, what are you thinking?
          </div>
        </div>
        {showModalAddNewPost && (
          <ModalAddNewPost
            onCloseModal={() => setShowModalAddNewPost(false)}
            onSubmit={onAdd}
            userData={user}
          />
        )}
      </Card>
    </div>
  );
};

export default NewPost;
