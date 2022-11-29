import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../helpers/connection";
import { ErrorResponse } from "../../../types/Response";
import { User } from "../../../types/Base";
import { toDataTransformedIds } from "../../../helpers/transform";

// extra function for SSR
export const getUserByEmails = async (emails: string[]) => {
  const client = await connectToDatabase();

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
  if (req.method !== "POST") {
    return res.status(400).json({
      message: "Only support POST method",
    });
  }

  console.log('req.body', req.body.users)
  const  users  = req.body.users;
  if (!users || !users.length) {
    return res.status(400).json({
      message: "users array can not empty",
    });
  }

  try {
    const usersRes = await getUserByEmails(users);
    return res.status(200).json(usersRes);
  } catch (error) {
    return res.status(500).json({
      message: "Can't connect to Database",
    });
  }
}
