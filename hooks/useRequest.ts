import { useContext, useMemo } from "react";
import { RequestContext } from "../components/layouts/Main";
import { ToggleType } from "../types/Props";
import client from "../apollo-client";
import { gql } from "@apollo/client";
import { Post } from "../types/Base";
import axios from "axios";

axios.defaults.baseURL = 'http://localhost:5000/graphql';
axios.defaults.method = 'POST';
axios.defaults.withCredentials = true
axios.defaults.headers.post['Content-Type'] = 'application/json';

const useRequest = () => {
  const { requestType } = useContext(RequestContext);
  const res = useMemo(() => {
    if (!requestType) {
      return {
        getAllPosts: async () => {
          return [];
        },
        getUserPosts: async () => {
          return [];
        },
        createNewPost: async () => {
          return {};
        },
      };
    }

    if (requestType == ToggleType.RESTFUL) {
      return {
        getAllPosts: async () => {
          const res = await fetch("/api/post/list");
          const resJson = await res.json();
          return resJson;
        },
        getUserPosts: async (userId: String) => {
          const res = await fetch(`/api/post/list/${userId}`);
          const resJson = await res.json();
          return resJson;
        },
        createNewPost: async (data: Post) => {
          const response = await fetch("/api/post/create", {
            method: "POST",
            body: JSON.stringify({ ...data }),
            headers: {
              "Content-Type": "application/json",
            },
          });
          return response;
        },
      };
    }

    return {
      getAllPosts: async () => {
        const { data } = await client.query({
          query: gql`
            query posts {
              posts {
                content
                userId
                _id
                author {
                  avatar
                  fullName
                }
              }
            }
          `,
        });
        const { posts } = data;
        //copy arrays because read-only
        const dataReverse = [...posts].reverse();
        return dataReverse;
      },
      getUserPosts: async (userId: String) => {
        const { data } = await client.query({
          query: gql`
                        query UserPosts($userId: ID!) {
                           userPosts($userId: $userId) {
                                content,
                                userId,
                                _id,
                                author {
                                    avatar,
                                    fullName,
                                },
                           }
                        }
                    `,
          variables: {
            userId,
          },
        });
        const { posts } = data;
        //copy arrays because read-only
        const dataReverse = [...posts].reverse();
        return dataReverse;
      },
      createNewPost: async (post: Post) => {
        // const body = {
        //     query:`
        //     mutation addPost($post: addPostInput!) {
        //         addPost(post: $post) {
        //           content
        //           _id,
        //         }
        //       }
        //     `,
        //     variables:{
        //         post
        //     }
        // };
        // const { data } = await axios({data:JSON.stringify(body)});
        const { data } = await client.mutate({
          mutation: gql`
            mutation addPost($post: addPostInput!) {
              addPost(post: $post) {
                content
              }
            }
          `,
          variables: {
            post,
          },
        });
        return data;
      },
    };
  }, [requestType]);
  return res;
};

export default useRequest;
