import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../helpers/connection";
import { ErrorResponse } from "../../../types/Response";
import { User } from "../../../types/Base";
import { toDataTransformedIds } from "../../../helpers/transform";

// extra function for SSR
export const getUserByEmails = async (emails: string[]) => {
  const client = await connectToDatabase();
  if (!client) {
    throw new Error("Can not connect to database");
  }

  const database = client.db();
  const userTable = database.collection("users");
  const usersRes = await userTable.find({ email: { $in: emails } }).toArray();
  const usersTransformed = toDataTransformedIds(usersRes as any[]) as User[];
  client.close();
  return usersTransformed;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User[] | ErrorResponse>
) {
  if (req.method !== "GET") {
    return res.status(400).json({
      message: "Only support GET method",
    });
  }
  const { users } = req.cookies;
  if (!users || !users.length) {
    return res.status(400).json({
      message: "users array can not empty",
    });
  }

  try {
    const usersRes = await getUserByEmails(JSON.parse(users));
    return res.status(200).json(usersRes);
  } catch (error) {
    return res.status(500).json({
      message: "Can't connect to Database",
    });
  }
}
