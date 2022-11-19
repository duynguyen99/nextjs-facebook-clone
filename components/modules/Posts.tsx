import React from "react";
import { PostProps } from "../../types/Props";
import Post from "../Post";
import Skeleton from "../Skeleton";

const Posts = ({ posts, isLoading }: PostProps) => {
  if (isLoading) {
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
