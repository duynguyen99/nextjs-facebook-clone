import React from "react";
import { Post } from "../types/Base";
import Card from "./Card";
import Image from "next/image";
import { useRouter } from "next/router";

const Post = ({ content, avatar, fullName, userId }: Post) => {
  const router = useRouter();
  const isAuthorized = router.query.userId === userId;
  const onRedirect = () => {
    if (isAuthorized) {
      return;
    }
    router.push(`/${userId}`);
  };

  return (
    <Card className="mt-4 flex flex-col  border-b border">
      <div className={!isAuthorized ? "cursor-pointer" : ""} onClick={onRedirect}>
        <div className="flex flex-row items-center">
          <Image
            src={avatar || ""}
            width={500}
            height={500}
            alt="avatar"
            className="rounded-full w-10 h-10 cursor-pointer border-2"
          />
          <p className="pl-2 font-semibold">{fullName}</p>
        </div>
      </div>
      <div className={`bg-slate-200 h-80 text-center flex items-center mt-4 rounded-md bg-gradient-to-r from-purple-500 to-pink-500`}>
        <div className="w-full font-bold h-20 lg:text-3xl text-xl">{content}</div>
      </div>
    </Card>
  );
};

export default Post;
