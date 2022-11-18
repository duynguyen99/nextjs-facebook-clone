import React from "react";
import { PostProps } from "../../types/Props";
import Card from "../Card";
import Post from "../Post";
import Skeleton from "../Skeleton";

const Posts = ({ posts }: PostProps) => {
  if (!posts?.length) {
    return <Skeleton />;
  }

  return (
    <div className="w-full">
      {posts.map((post) => {
        return <Post key={post._id} {...post} />;
      })}
    </div>
  );
};

export default Posts;
