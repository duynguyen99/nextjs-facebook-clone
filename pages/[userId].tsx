import { GetStaticProps } from "next";
import React, { useEffect, useMemo, useState } from "react";
import { UserProfilePageProps } from "../types/Props";
import { findUserById } from "./api/user/[userId]";
import { getUsers } from "./api/user/list";
import Head from "next/head";
import { HomeLayout, HomePost } from "../components/layouts/Home";
import Posts from "../components/modules/Posts";
import NewPost from "../components/NewPost";
import { toast } from "react-toastify";
import { createNewPost, getUserById, getUserPosts } from "../helpers/api";
import { Post, User } from "../types/Base";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const UserProfilePage = () => {
  const router = useRouter();
  const userId = router.query.userId as string|| '';
  const { data: session } = useSession();
  const sessionUser = session?.user as User;
  const [isLoadingGetPosts, setIsLoadingGetPost] = useState<boolean>(false);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [currentUser, setCurrentUser] = useState<User>();

  const getAllPosts = async () => {
    setIsLoadingGetPost(true);
    const res = await getUserPosts(userId);
    if (res.ok) {
      const postsJson = (await res.json()) as Post[];
      setIsLoadingGetPost(false);
      setUserPosts(postsJson.reverse());
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

  const getUserInfo =async () => {
    const response = await getUserById(userId);
    if(!response.ok){
      //TODO: handle error here
      return;
    }

    const userInfo = await response.json();
    setCurrentUser(userInfo);
  }

  useEffect(() => {
    if(userId){
      getUserInfo();
      getAllPosts();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId])

  const isAuthorized = sessionUser?.id === router.query.userId;
  const postsRender = useMemo(() => {
    return userPosts.map((post) => ({
      ...post,
      avatar: currentUser?.avatar,
      fullName: currentUser?.fullName,
    }));
  }, [currentUser?.avatar, currentUser?.fullName, userPosts]);
  
  return (
    <>
      <Head>
        <title>{currentUser?.fullName}</title>
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

export default UserProfilePage;
