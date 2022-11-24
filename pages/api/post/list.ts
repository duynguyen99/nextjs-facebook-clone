import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { connectToDatabase } from "../../../helpers/connection";
import { toDataTransformedIds } from "../../../helpers/transform";
import { Post, User } from "../../../types/Base";
import { ErrorResponse } from "../../../types/Response";

export const getUserPostsById = async (userId: string) => {
  const client = await connectToDatabase();
  if (!client) {
    throw new Error("Can not connect to database");
  }

  const database = client.db();
  const postTable = database.collection("posts");
  const posts = await postTable.find({ userId }).toArray();
  const postsTransformed = toDataTransformedIds(
    posts as any
  ) as unknown as Post[];
  client.close();
  return postsTransformed;
};

export const getAllPosts = async () => {
  const client = await connectToDatabase();
  if (!client) {
    throw new Error("Can not connect to database");
  }

  const database = client.db();
  const postTable = database.collection("posts");
  const posts = await postTable.find({}).toArray();
  const postsTransformed = toDataTransformedIds(
    posts as any
  ) as unknown as Post[];
  client.close();
  return postsTransformed;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Post[] | ErrorResponse>
) {
  if (req.method !== "GET") {
    return res.status(400).json({
      message: "Only support GET method",
    });
  }

  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({
      message: "Unauthorized!",
    });
  }

  const client = await connectToDatabase();
  if (!client) {
    return res.status(500).json({
      message: "can not connect to database",
    });
  }

  const database = client.db();
  const postTable = database.collection("posts");

  const posts = await postTable.find({}).toArray();
  const userIds = posts.map((post) => new ObjectId(post.userId));

  const userTable = database.collection("users");
  const users = await userTable.find({ _id: { $in: userIds } }).toArray();

  const usersTransformed = toDataTransformedIds(users as any) as User[];
  const postsResult = posts.map((post) => {
    const user = usersTransformed.find((user) => user._id === post.userId);

    delete user?.password;
    return {
      ...post,
      ...user,
    };
  });

  const postsTransformed = toDataTransformedIds(
    postsResult as any[]
  ) as unknown as Post[];

  if (!posts) {
    client.close();
    return res.status(500).json({
      message: "No Database found",
    });
  }

  client.close();
  return res.status(200).json(postsTransformed.reverse());
}
