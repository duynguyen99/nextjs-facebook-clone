import React, { useState } from "react";
import { NewPostProps } from "../types/Props";
import Card from "./Card";
import Image from "next/image";
import ModalAddNewPost from "./modules/ModalAddNewPost";
const NewPost = ({ onAdd }: NewPostProps) => {
  const [showModalAddNewPost, setShowModalAddNewPost] = useState(false);
  return (
    <div className="">
      <Card>
        <div className="flex flex-row items-center">
          <Image
            src={
              "https://scontent.fhan2-1.fna.fbcdn.net/v/t1.6435-1/138317164_1579505722244254_2206959289389356615_n.jpg?stp=dst-jpg_p160x160&_nc_cat=102&ccb=1-7&_nc_sid=dbb9e7&_nc_ohc=xDD6M5wYHdAAX_UWGgp&_nc_ht=scontent.fhan2-1.fna&oh=00_AfABEsat-q98f66evyS7FGGSv_4k0QO7iylocBLGQC2HvA&oe=63995A22"
            }
            width={500}
            height={500}
            alt="avatar"
            className="rounded-full w-10 h-10 cursor-pointer"
          />
          <div
            className="rounded-full bg-slate-200 w-full ml-2 p-2 pl-4 hover:bg-slate-400 cursor-pointer"
            onClick={() => setShowModalAddNewPost(true)}
          >
            Hey, what are you thinking?
          </div>
        </div>
        {showModalAddNewPost && (
          <ModalAddNewPost
            onCloseModal={() => setShowModalAddNewPost(false)}
            onSubmit={onAdd}
          />
        )}
      </Card>
    </div>
  );
};

export default NewPost;
