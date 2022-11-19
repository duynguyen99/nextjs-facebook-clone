import { Post } from "../types/Base";

export const getUserById = async (id: string): Promise<Response> => {
  const response = await fetch("/api/user/info", {
    body: JSON.stringify({ id }),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });
  return response;
};

export const createNewPost = async (data: Post) => {
  const response = await fetch("/api/post/create", {
    method: "POST",
    body: JSON.stringify({ ...data }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};

export const getPosts = async () => {
  return fetch("/api/post/list");
};

export const getUserPosts = async (userId: string) => {
  return fetch(`/api/post/list/${userId}`);
};
