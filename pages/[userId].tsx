import { GetStaticProps } from "next";
import React, { useMemo, useState } from "react";
import { UserProfilePageProps } from "../types/Props";
import { findUserById } from "./api/user/info";
import { getUsers } from "./api/user/list";
import Head from "next/head";
import { HomeLayout, HomePost } from "../components/layouts/Home";
import Posts from "../components/modules/Posts";
import NewPost from "../components/NewPost";
import { toast } from "react-toastify";
import { createNewPost, getUserPosts } from "../helpers/api";
import { Post, User } from "../types/Base";
import { useSession } from "next-auth/react";
import { getUserPostsById } from "./api/post/list";

const UserProfilePage = ({ user, posts }: UserProfilePageProps) => {
  const { data: session } = useSession();
  const sessionUser = session?.user as User;
  const [isLoadingGetPosts, setIsLoadingGetPost] = useState<boolean>(false);
  const [userPosts, setUserPosts] = useState<Post[]>(posts);

  const getAllPosts = async () => {
    setIsLoadingGetPost(true);
    const res = await getUserPosts(user.id || "");
    if (res.ok) {
      const postsJson = (await res.json()) as Post[];
      setIsLoadingGetPost(false);
      setUserPosts(postsJson);
      return;
    }
    //TODO: implement handle error here
  };

  const onAddNewPost = async (data: Post, callback: () => void) => {
    const response = await createNewPost(data);
    if (response.ok) {
      toast.success("Created Post!");
      callback();
      setUserPosts([]);
      getAllPosts();
      return;
    }
    //TODO: implement handle error here
  };

  const isAuthorized = sessionUser && sessionUser.id === user.id;
  const postsRender = useMemo(() => {
    return userPosts.map((post) => ({
      ...post,
      avatar: user?.avatar,
      fullName: user?.fullName,
    }));
  }, [user?.avatar, user?.fullName, userPosts]);
  
  return (
    <>
      <Head>
        <title>{user.fullName}</title>
      </Head>
      <HomeLayout>
        <HomePost>
          {isAuthorized && <NewPost onAdd={onAddNewPost} />}
          <Posts posts={postsRender} isLoading={isLoadingGetPosts} />
        </HomePost>
      </HomeLayout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;

  const { userId } = params as { userId: string };
  const user = await findUserById(userId);
  delete user.password;

  const posts = await getUserPostsById(userId);

  return {
    props: {
      user,
      posts,
    },
    revalidate: 60, //seconds
  };
};

export async function getStaticPaths() {
  const users = await getUsers();
  const paths = users.map((user) => {
    return {
      params: {
        userId: user._id,
        anything: 'anything'
      }
    }
  });
  return {
    paths,
    fallback: "blocking",
  };
}

export default UserProfilePage;
