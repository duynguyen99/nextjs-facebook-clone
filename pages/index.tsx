import { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/react";
import Head from "next/head";
import { useEffect, useState } from "react";
import { HomeLayout, HomePost } from "../components/layouts/Home";
import Posts from "../components/modules/Posts";
import NewPost from "../components/NewPost";
import { Post, User } from "../types/Base";
import { toast } from "react-toastify";
import { createNewPost } from "../helpers/api";

export default function HomePage() {
  const { data: session } = useSession();
  const sessionUser = session?.user as User;
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoadingGetPosts, setIsLoadingGetPost] = useState<boolean>(false);

  const onAddNewPost = async (data: Post, callback: (msg?: string) => void) => {
    const response = await createNewPost(data);
    if (response.ok) {
      toast.success("Created Post!");
      callback();
      setPosts([]);
      getAllPosts();
      return;
    }

    const error = await response.json();
    callback(error.message);
    //TODO: implement handle error here
  };

  const getAllPosts = async () => {
    setIsLoadingGetPost(true);
    const res = await fetch("/api/post/list");
    const resJson = await res.json();
    setIsLoadingGetPost(false);
    setPosts(resJson);
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <>
      <Head>
        <title>Home Page</title>
      </Head>
      <HomeLayout>
        <HomePost>
          <NewPost onAdd={onAddNewPost} />
          <Posts posts={posts} isLoading={isLoadingGetPosts} />
        </HomePost>
      </HomeLayout>
    </>
  );
}
