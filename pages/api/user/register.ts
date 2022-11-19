import { NextApiRequest, NextApiResponse } from "next";
import { hashData } from "../../../helpers/auth";
import { connectToDatabase } from "../../../helpers/connection";
import { User } from "../../../types/Base";
import { ErrorResponse } from "../../../types/Response";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User | ErrorResponse>
) {
  if (req.method !== "POST") {
    return res.status(400).json({
      message: "Only support POST method",
    });
  }

  const data = req.body;
  const { email, password, avatar, fullName } = data as User;

  if (!email || !password) {
    return res.status(400).json({
      message: "email or password can not empty",
    });
  }

  if (email && !email.includes("@")) {
    return res.status(400).json({
      message: "email is invalid",
    });
  }

  if (password && password.trim().length < 7) {
    return res.status(400).json({
      message: "password must great than 7 character",
    });
  }

  if (!fullName?.trim()?.length) {
    return res.status(400).json({
      message: "full name can not empty",
    });
  }

  const client = await connectToDatabase();
  if (!client) {
    return res.status(400).json({
      message: "can not connect to database",
    });
  }

  const database = client.db();
  const userTable = database.collection("users");

  const existedEmail = await userTable.findOne({ email });
  if (existedEmail) {
    client.close();
    return res.status(409).json({ message: "Email is existed, please use another email address" });
  }

  const passwordEncrypted = await hashData(password, 12);
  await userTable.insertOne({ email, password: passwordEncrypted, avatar, fullName });

  client.close();
  return res.status(201).json({ message: "register successfully!" });
}
