import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import { useCallback, useEffect, useState } from "react";
import { HomeLayout, HomePost } from "../components/layouts/Home";
import Posts from "../components/modules/Posts";
import NewPost from "../components/NewPost";
import { Post } from "../types/Base";
import Cookies from "cookies";
import { toast } from "react-toastify";
import useRequest from "../hooks/useRequest";

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoadingGetPosts, setIsLoadingGetPost] = useState<boolean>(false);
  const request = useRequest();

  const onAddNewPost = async (data: Post, callback: (msg?: string) => void) => {
    const response = await request.createNewPost(data);
    if (response) {
      toast.success("Created Post!");
      callback();
      setPosts([]);
      getAllPosts();
      return;
    }
    //TODO: implement handle error here
  };

  const getAllPosts = useCallback(async () => {
    if(request.getAllPosts){
      setIsLoadingGetPost(true);
      const res = await request?.getAllPosts();
      setIsLoadingGetPost(false);
      setPosts(res);
    }
  
  }, [request]);

  useEffect(() => {
    getAllPosts();
  }, [getAllPosts]);

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


export const getServerSideProps: GetServerSideProps = async ({req, res}) => {
  const session = await getSession({ req });
  if (!session) {
    return {
      redirect: {
        destination: "/login",
      },
      props: {},
    };
  }

  const email = session?.user?.email;
  if (email) {
    const cookies = new Cookies(req, res);
    const users = cookies.get("users");
    const usersJson = JSON.parse(users || "[]") as string[];
    const isExisted = usersJson.find((userEmail) => userEmail === email);

    if (!isExisted) {
      const usersCaching = [...usersJson, email];
      cookies.set("users", JSON.stringify(usersCaching));
    }
  }
  return {
    props: {
      session,
    },
  };
};
