import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../helpers/connection";
import { ErrorResponse } from "../../../types/Response";
import { User } from "../../../types/Base";
import { ObjectId } from "mongodb";

export const findUserById = async (userId: string) => {
  const client = await connectToDatabase();
  if (!client) {
    throw new Error("Can not connect to database");
  }

  const database = client.db();
  const userTable = database.collection("users");
  const currentUser = (await userTable.findOne({
    _id: new ObjectId(userId),
  })) as unknown as User;

  currentUser._id = currentUser._id?.toString();
  currentUser.id = currentUser._id;
  client.close();
  return currentUser;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User | ErrorResponse>
) {
  if (req.method !== "GET") {
    return res.status(400).json({
      message: "Only support GET method",
    });
  }
  const userId  = req.query.userId as string;
  if (!userId) {
    return res.status(400).json({
      message: "userId can not empty",
    });
  }
  try {
    const user = await findUserById(userId);
    if (!user) {
      return res.status(400).json({ message: "User Not Found!" });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({
      message: "can not connect to database",
    });
  }
}
