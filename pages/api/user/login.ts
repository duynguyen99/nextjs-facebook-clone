// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../helpers/connection";
import { ErrorResponse } from "../../../types/Response";
import { User } from "../../../types/Base";
import { compare } from "bcrypt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User | ErrorResponse>
) {
  const { email, password } = req.body;
  if (req.method !== "POST") {
    return res.status(400).json({
      message: "Only support POST method",
    });
  }
  if (!email || !password) {
    return res.status(400).json({
      message: "email or password can not empty!",
    });
  }

  const client = await connectToDatabase();
  if (!client) {
    return res.status(500).json({
      message: "can not connect to database",
    });
  }

  const database = client.db();
  const userTable = database.collection("users");
  const currentUser = await userTable.findOne({ email });

  if (!currentUser) {
    client.close();
    return res.status(400).json({
      message: "email or password is incorrect",
    });
  }
  const equal = await compare(password, currentUser?.password);
  if (!equal) {
    client.close();
    return res.status(400).json({
      message: "email or password is incorrect",
    });
  }

  return res.status(200).json({ message: "login success!" });
}
