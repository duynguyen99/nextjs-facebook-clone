import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import { useEffect, useState } from "react";
import { HomeLayout, HomePost } from "../components/layouts/Home";
import Posts from "../components/modules/Posts";
import NewPost from "../components/NewPost";
import { Post } from "../types/Base";
import Cookies from "cookies";
import { toast } from "react-toastify";

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const onAddNewPost = (data: Post, callback: () => void) => {
    fetch("/api/post/create", {
      method: "POST",
      body: JSON.stringify({ ...data }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 201) {
          toast.success('Created Post!')
          callback();
          setPosts([]);
          getAllPosts();
        }
      })
      .catch(() => {
        //TODO: implement handle error here
      });
  };

  const getAllPosts = async () => {
    const res = await fetch("/api/post/list");
    const resJson = await res.json();
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
          <Posts posts={posts} />
        </HomePost>
      </HomeLayout>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });

  //cached user logged in
  const email = session?.user?.email;
  if (email) {
    const cookies = new Cookies(context.req, context.res);
    const users = cookies.get("users");
    const usersJson = JSON.parse(users || "[]") as string[];
    const isExisted = usersJson.find(userEmail => userEmail === email);

    if (!isExisted) {
      const usersCaching = [...usersJson, email];
      cookies.set("users", JSON.stringify(usersCaching));
    }
  }

  if (!session) {
    return {
      redirect: {
        destination: "/login",
      },
      props: {},
    };
  }

  return {
    props: {
      session,
    },
  };
};
